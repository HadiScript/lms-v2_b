import Lesson from "database/models/lesson";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "PUT":
      await handlePUT(req, res);
      break;
    case "GET":
      await handleGet(req, res);
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
    const lessons = await Lesson.findAll({
      // group: "group_name",
      order: [["short_id", "ASC"]],
      where: { courseId: id },
    });

    res.status(200).json({ lessons });
  } catch (e) {
    res.status(400).json({
      error_code: "get_course_lessons",
      message: e.message,
    });
  }
};

const handleDelete = async (req, res) => {
  const { id } = req.query;
  try {
    const lesson = await Lesson.findOne({
      where: { id: id },
    });

    lesson.destroy();

    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (e) {
    res.status(400).json({
      error_code: "delete_lesson",
      message: e.message,
    });
  }
};

const handlePUT = async (req, res) => {
  const { id } = req.query;
  try {
    const lessons = await Lesson.update(
      {
        completed: true,
      },
      { where: { courseId: id } }
    );

    res.status(200).json({ lessons });
  } catch (e) {
    res.status(400).json({
      error_code: "update_lesson",
      message: e.message,
    });
  }
};
