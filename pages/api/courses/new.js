import jwt from "jsonwebtoken";
import { slugify } from "@/utils/auth";
import Course from "database/models/course";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handlePostRequest = async (req, res) => {
  const {
    title,
    catId,
    userID,
    cdId,
    startingFrom,
    _to,
    startingDate,
    endingDate,
  } = req.body;

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    if (!title) {
      return res.status(400).json({ message: "Batch name is require" });
    } else if (!startingFrom) {
      return res
        .status(400)
        .json({ message: "Session starting timing is required" });
    } else if (!_to) {
      return res
        .status(400)
        .json({ message: "Session ending timing is required" });
    } else if (!startingDate) {
      return res.status(400).json({ message: "Starting Data is required" });
    } else if (!endingDate) {
      return res.status(400).json({ message: "Ending Data is required" });
    }

    const batchExist = await Course.findOne({
      where: { title },
    });

    let slug = slugify(title);

    if (batchExist) {
      return res.status(400).json({ message: `${title} is already exist` });
    }

    // console.log("here is batch data", {
    //   title,
    //   userId: userID,
    //   cdId,
    //   live_link: "",
    //   slug,
    //   ...req.body,
    // });

    // return;

    const newcourse = await Course.create({
      title,
      userId: userID,
      cdId,
      live_link: "",
      slug,
      ...req.body,
    });

    res.status(200).json({
      message: "Batch created successfully. ",
      course: newcourse,
    });
  } catch (e) {
    res.status(400).json({
      error_code: "create_course",
      message: e.message,
    });
  }
};
