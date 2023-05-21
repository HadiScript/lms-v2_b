// import User from "database/models/user";
import { Course } from "@/database/models";
import StudentBatches from "@/database/models/studentBatches";
import { Course_detail, User } from "database/models";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "GET":
      await getMyCourse(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const getMyCourse = async (req, res) => {
  const { id } = req.query;
  let mycourses = [];
  try {
    const user = await StudentBatches.findAll({
      where: { userId: id },
    });
    console.log(user[0], "user 0");
    console.log(user[1], "user 1");
    let course2;
    let course1;
    if (user[1]?.batchId) {
      course1 = await Course.findOne({
        include: [
          {
            model: Course_detail,
            as: "details",
          },
          {
            model: User,
            as: "user",
            attributes: ["first_name", "last_name", "profile_photo"],
          },
        ],
        where: { id: user[1].batchId },
      });
      if (course1) {
        mycourses.push(course1);
      }
    }
    if (user[0]?.batchId) {
      course2 = await Course.findOne({
        include: [
          {
            model: Course_detail,
            as: "details",
          },
          {
            model: User,
            as: "user",
            attributes: ["first_name", "last_name", "profile_photo"],
          },
        ],
        where: { id: user[0].batchId },
      });
      if (course2) {
        mycourses.push(course2);
      }
    }

    res.status(200).json({ user, mycourses });
  } catch (e) {
    res.status(400).json({
      error_code: "user",
      message: e.message,
    });
  }
};
