import { Course_detail, User, Category } from "database/models";

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
    const courses = await Course_detail.findAll({
      order: [["created_at", "DESC"]],
      attributes: ["id", "title"],
      where: {
        approved: true,
      },
    });

    res.status(200).json({ courses });
  } catch (e) {
    res.status(400).json({
      error_code: "get_courses",
      message: e.message,
    });
  }
};
