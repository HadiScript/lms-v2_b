import jwt from "jsonwebtoken";
import Lesson from "database/models/lesson";

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
  // console.log("click form handle post from new lesson");
  const { group_name, title, link, short_id, courseId } = req.body;
  try {
    // login user id
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    await Lesson.create({
      group_name,
      title,
      link,
      short_id,
      courseId,
      userId,
    });

    res.status(200).json({ message: "Lesson Uploaded Successfully." });
  } catch (e) {
    res.status(400).json({
      error_code: "upload_lesson",
      message: e.message,
    });
  }
};
