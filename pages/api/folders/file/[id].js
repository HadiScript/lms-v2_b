import Assignments from "@/database/models/assignments";
import User from "@/database/models/user";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
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
  //   console.log(id, "handleDeleteFolder");
  //   return;

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const user = await User.findOne({ where: { id: userId } });

    const assignmentsFileExists = await Assignments.findOne({
      // where: { folder_id: },
      where: { id },
    });

    if (!assignmentsFileExists) {
      return res.status(400).json({ message: "File is not exists" });
    }

    if (userId === assignmentsFileExists.stu_id || user.role === "instructor") {
      await assignmentsFileExists.destroy();
      return res.status(200).json({ message: "deleted" });
    } else {
      return res.status(400).json({ message: "Restricted" });
    }
  } catch (e) {
    res.status(400).json({
      error_code: "delete file",
      message: e.message,
    });
  }
};
