import { User } from "@/database/models";
import studentsApplication from "@/database/models/studentsApplication";
import axios from "axios";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await createApplications(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const createApplications = async (req, res) => {
  try {
    const data = {
      ...req.body,
      rejected: true,
      remarks: req.body.remarks,
    };

    // console.log(data, "from rejecttions");
    // return;
    const newStuApp = await studentsApplication.create(data);

    res.status(200).json({
      message: "this application has been rejected",
      newStuApp,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error_code: "student_applicationsD",
      message: e.message,
    });
  }
};
