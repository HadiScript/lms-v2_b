import Course from "database/models/course";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
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

const handleGet = async (req, res) => {
  const { id } = req.query;
  try {
    const course = await Course.findOne({
      where: { id: id },
    });

    res.status(200).json({ course });
  } catch (e) {
    res.status(400).json({
      error_code: "update_course",
      message: e.message,
    });
  }
};

const handlePut = async (req, res) => {
  console.log("touched ");
  const { id } = req.query;
  const { liveLink, catId } = req.body;
  //   console.log(liveLink, "touched 2");
  console.log(id, "touched 2");
  try {
    const course = await Course.update(
      {
        live_link: liveLink,
      },
      {
        where: { id: id },
      }
    );

    // console.log(course, "touched 3");
    res.status(200).json({ message: "Link has been added", course });
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
    const course = await Course.update(
      {
        live_link: "",
        id,
      },
      {
        where: { id: id },
      }
    );

    res.status(200).json({ message: "Link has been removed" });
  } catch (e) {
    res.status(400).json({
      error_code: "update_course",
      message: e.message,
    });
  }
};
