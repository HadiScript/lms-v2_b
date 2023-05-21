// import { Course, User } from "@/database/models";
// import courses_teachers from "@/database/models/courses_teachers";
import { Course, Courses_teachers, Enrolment, User } from "database/models";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "GET":
      await handleGet(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handleGet = async (req, res) => {
  try {
    const courses = await Courses_teachers.findAll({
      where: { userId: req.query.id },
      include: [
        {
          model: Course,
          as: "course",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["first_name", "last_name", "profile_photo"],
            },
            {
              model: Enrolment,
              as: "enrolments",
              attributes: ["id"],
            },
          ],
        },
      ],
    });

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
