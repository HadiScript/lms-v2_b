import { Comments, User } from "database/models";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "GET":
      await handleGet(req, res);
      break;
    case "POST":
      await handlePost(req, res);
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
    const allComments = await Comments.findAll({
      order: [["created_at", "ASC"]],
      include: [
        {
          model: User,
          as: "User",
          attributes: ["first_name", "last_name", "role"],
        },
      ],
      where: {
        course_id: id,
      },
    });

    res.status(200).json({ msgs: allComments });
  } catch (e) {
    res.status(400).json({
      error_code: "get_courses",
      message: e.message,
    });
  }
};

const handlePost = async (req, res) => {
  const { id } = req.query;
  const { text } = req.body;
  //   console.log(id, text, userId, "from comments posts");
  //   return;
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const newComment = await Comments.create({
      user_id: userId,
      course_id: id,
      text,
    });

    res.status(200).json({
      message: "New category added",
      msg: newComment,
    });

    res.status(200).json({ message: "This course unset to homepage" });
  } catch (e) {
    res.status(400).json({
      error_code: "post_comment",
      message: e.message,
    });
  }
};
