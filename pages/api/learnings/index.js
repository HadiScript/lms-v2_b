import jwt from "jsonwebtoken";
import { Course, User, Enrolment } from "database/models";
import user from "@/database/models/user";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const handleGetRequest = async (req, res) => {
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const student = await user.findOne({ where: { id: userId } });

    if (batchCourse1){
		
	}
      // const enrolments = await Enrolment.findAll({
      // 	order: [["created_at", "DESC"]],
      // 	include: [
      // 		{
      // 			model: Course,
      // 			as: "course",
      // 			attributes: ["id", "title", "slug", "image", "is_class"],
      // 			include: [
      // 				{
      // 					model: User,
      // 					as: "user",
      // 					attributes: [
      // 						"first_name",
      // 						"last_name",
      // 						"profile_photo",
      // 					],
      // 				},
      // 			],
      // 		},
      // 	],
      // 	where: { userId: userId },
      // });

      res.status(200).json({
        student,
      });
  } catch (e) {
    res.status(400).json({
      error_code: "enrolments",
      message: e.message,
    });
  }
};
