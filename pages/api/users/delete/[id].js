import { User } from "@/database/models";
import drop_students from "@/database/models/drop_students";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "POST":
      await handleDrop(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handleDrop = async (req, res) => {
  const { id } = req.query;

  // console.log(req.body);
  const { joining_date, stu_name, stu_email, cord_id, course } = req.body;

  try {
    const user = await User.findOne({
      where: { id: id },
    });

    const DropStudent = await drop_students.create({
      joining_date,
      stu_name,
      stu_email,
      stu_cord: cord_id,
      course,
    });

    if (DropStudent) {
      user.destroy();
      return res.status(200).json({ message: "User has been deleted " });
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({
      error_code: "delete_user",
      message: e.message,
    });
  }
};
