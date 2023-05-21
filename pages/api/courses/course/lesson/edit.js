import Lesson from "database/models/lesson";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "PUT":
      await handlePUT(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handlePUT = async (req, res) => {
  try {
    const lessons = await Lesson.update(
      {
        completed: true,
      },
      { where: { id: req.body.id } }
    );

    res.status(200).json({ lessons });
  } catch (e) {
    res.status(400).json({
      error_code: "update_lesson",
      message: e.message,
    });
  }
};
