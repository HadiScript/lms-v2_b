import { Comments, User } from "database/models";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "DELETE":
      await handleDelete(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handleDelete = async (req, res) => {
  const { id } = req.query;

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const comment = await Comments.findOne({ where: { id } });
    if (comment.user_id === userId) {
      await comment.destroy();
      res.status(200).json({ message: "deleted" });
    }
  } catch (e) {
    res.status(400).json({
      error_code: "post_comment",
      message: e.message,
    });
  }
};
