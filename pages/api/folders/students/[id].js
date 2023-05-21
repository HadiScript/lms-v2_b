import Assignments from "@/database/models/assignments";
import user from "@/database/models/user";

export default async function handler(req, res) {
  switch (req.method) {
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
  try {
    const assignments = await Assignments.findAll({
      // where: { folder_id: },
      where: { folder_id: req.query.id },
    });

    res.status(200).json({ assignments });
  } catch (e) {
    res.status(400).json({
      error_code: "get_categories",
      message: e.message,
    });
  }
};
