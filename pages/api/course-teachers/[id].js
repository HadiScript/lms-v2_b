// import { Course, User } from "@/database/models";
// import courses_teachers from "@/database/models/courses_teachers";
import { Course, Courses_teachers, User } from "database/models";

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
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handleGet = async (req, res) => {
  console.log(req.query.id, "here is the id");
  try {
    const teachers = await Courses_teachers.findAll({
      where: { courseId: req.query.id },
      include: [
        {
          model: User,
          as: "users",
          attributes: ["first_name", "last_name", "profile_photo"],
        },
      ],
    });

    // console.log()

    res.status(200).json({
      message: "Teacher has been added to this course",
      teachers,
    });
  } catch (e) {
    res.status(400).json({
      error_code: "add_teacher",
      message: e.message,
    });
  }
};

const handlePut = async (req, res) => {
  try {
    const courses = await Courses_teachers.findAll({
      where: { userId: req.query.id },
      include: [
        {
          model: Course,
          as: "course",
        },
      ],
    });

    // console.log()

    res.status(200).json({
      message: "Teacher has been added to this course",
      courses,
    });
  } catch (e) {
    res.status(400).json({
      error_code: "add_teacher",
      message: e.message,
    });
  }
};
