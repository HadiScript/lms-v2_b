import Courses_teachers from "database/models/courses_teachers";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "POST":
      await handlePost(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handlePost = async (req, res) => {
  const { teacherId, courseId } = req.body;

  try {
    const exist = await Courses_teachers.findOne({
      where: { checkId: teacherId + courseId },
    });

    if (exist) {
      res.status(400).json({
        message: "this teacher already added to this course",
      });
    } else {
      const newcourse = await Courses_teachers.create({
        userId: teacherId,
        courseId: courseId,
        checkId: teacherId + courseId,
      });

      res.status(200).json({
        message: "Teacher has been added to this course",
        added: newcourse,
      });
    }
  } catch (e) {
    res.status(400).json({
      error_code: "add_teacher",
      message: e.message,
    });
  }
};


