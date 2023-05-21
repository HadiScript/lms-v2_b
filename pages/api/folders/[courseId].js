import Folders from "@/database/models/folders";

export default async function handler(req, res) {
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
    const folders = await Folders.findAll({
      where: { course_id: req.query.courseId },
    });

    res.status(200).json({ folders });
  } catch (e) {
    res.status(400).json({
      error_code: "get_folders",
      message: e.message,
    });
  }
};
