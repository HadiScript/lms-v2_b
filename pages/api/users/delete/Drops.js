import { User } from "@/database/models";
import drop_students from "@/database/models/drop_students";

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
    const DropStudent = await drop_students.findAll({});
    return res.status(200).json({ DropStudent });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      error_code: "DropStudent",
      message: e.message,
    });
  }
};
