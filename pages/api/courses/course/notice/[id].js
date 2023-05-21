// [id] = course_id
import CourseNotice from "database/models/course_notice";
import jwt from "jsonwebtoken";
export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "PUT":
      await handlePost(req, res);
      break;
    case "GET":
      await handleGet(req, res);
      break;
    case "PUT":
      await handlePut(req, res);
      break;
    case "DELETE":
      await handleDelete(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handlePost = async (req, res) => {
  const { id } = req.query;
  try {
    console.log("runngin");

    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    // const findNoticed = await CourseNotice.update({})

    const courseNoticed = await CourseNotice.update(
      // {}
      {
        course_id: id,
        user_id: userId,
        text: req.body.text,
        heading: req.body.heading,
        variant: req.body.variant,
      },
      { where: { course_id: id } }
    );

    // if (courseNoticed.lenght >= 1) {
    //   return res.status(400).json({ message: "Restricted" });
    // }

    // const addNotice = await CourseNotice.create({
    //   course_id: id,
    //   user_id: userId,
    //   text: req.body.text,
    //   heading: req.body.heading,
    //   variant: req.body.variant,
    // });

    res.status(200).json({ addNotice: courseNoticed });
    // res.status(200).json({ addNotice });
  } catch (e) {
    res.status(400).json({
      error_code: "update_course",
      message: e.message,
    });
  }
};

const handleGet = async (req, res) => {
  const { id } = req.query;
  console.log(id, "noticed id");
  try {
    const courseNoticed = await CourseNotice.findAll({
      where: { course_id: id },
    });
    console.log(courseNoticed, "noticed data");

    res.status(200).json({ courseNoticed });
  } catch (e) {
    res.status(400).json({
      error_code: "update_course",
      message: e.message,
    });
  }
};

const handlePut = async (req, res) => {
  const { id } = req.query;
  const { text, heading } = req.body;
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const course = await CourseNotice.update(
      {
        text,
        heading,
        variant,
      },
      {
        where: { course_id: id },
      }
    );
    if (course !== userId) {
      return res.status(400).json({ message: "Restricted" });
    }

    res.status(200).json({ message: "Added", newNotice: course });
  } catch (e) {
    res.status(400).json({
      error_code: "update_course",
      message: e.message,
    });
  }
};

const handleDelete = async (req, res) => {
  const { id } = req.query;
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const course = await CourseNotice.findOne({
      where: { id: id },
    });

    if (course !== userId) {
      return res.status(400).json({ message: "Restricted" });
    }

    await course.destroy();

    res.status(200).json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({
      error_code: "update_course",
      message: e.message,
    });
  }
};
