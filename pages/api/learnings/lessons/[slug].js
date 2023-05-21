// import { Course } from "@/database/models";
import Course from "@/database/models/course";
import Lesson from "@/database/models/lesson";
import { Course_detail, User } from "@/database/models";

export default async function handler(req, res) {
  const { slug } = req.query;
  console.log(slug, "from here");
  try {
    const course = await Course.findOne({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["first_name", "last_name", "profile_photo"],
        },
        {
          model: Course_detail,
          as: "details",
        },
      ],
      where: { title: slug },
    });
    console.log(course, "from lessons");
    if (course) {
      const lessons = await Lesson.findAll({
        order: [["short_id", "ASC"]],
        where: { courseId: course.id },
      });

      res.status(200).json({
        course,
        lessons,
      });
    } else {
      res.status(200).json({
        lessons: [],
      });
    }
  } catch (e) {
    res.status(400).json({
      error_code: "get_lessons",
      message: e.message,
    });
  }
}
