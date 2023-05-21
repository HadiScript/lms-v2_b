import batch from "@/database/models/batch";
import { slugify } from "@/utils/auth";

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

const handlePost = async (req, res) => {
  const { batchName, startingFrom, _to, course, startingDate, endingDate } =
    req.body;
  try {
    if (!batchName) {
      return res.status(400).json({ message: "Batch name is require" });
    } else if (!startingFrom) {
      return res
        .status(400)
        .json({ message: "Session starting timing is required" });
    } else if (!_to) {
      return res
        .status(400)
        .json({ message: "Session ending timing is required" });
    } else if (!course) {
      return res.status(400).json({ message: "course is required" });
    } else if (!startingDate) {
      return res.status(400).json({ message: "Starting Data is required" });
    } else if (!endingDate) {
      return res.status(400).json({ message: "Ending Data is required" });
    }

    const batchExist = await batch.findOne({
      where: { batchName },
    });

    let slug = slugify(batchName);

    if (batchExist) {
      return res.status(400).json({ message: `${batchName} is already exist` });
    }

    const data = { ...req.body, slug };
    const newBatch = await batch.create(data);

    res.status(200).json({
      message: "Batch has been created.",
      course: newBatch,
    });
  } catch (e) {
    res.status(400).json({
      error_code: "create_batch",
      message: e.message,
    });
  }
};

const handleGet = async (req, res) => {
  try {
    const batches = await batch.findAll({});
    res.status(200).json({ batches });
  } catch (error) {
    res.status(400).json({
      error_code: "handle_get",
      message: e.message,
    });
  }
};
