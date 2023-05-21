import User from "./user";
import Category from "./category";
import Course from "./course";
import Video from "./video";
import Favourite from "./favourite";
import Enrolment from "./enrolment";
import Instructor_Earning from "./instructor_earning";
import Course_Progress from "./course_progress";
import Course_Asset from "./course_asset";
import Courses_teachers from "./courses_teachers";
import Comments from "./comments";
import Course_detail from "./course_details";

User.hasMany(Course, { foreignKey: "userId", as: "courses" });
Course.belongsTo(User, { foreignKey: "userId", as: "user" });

Course_detail.hasMany(Course, { foreignKey: "cdId", as: "courses" });
Course.belongsTo(Course_detail, { foreignKey: "cdId", as: "details" });



// change -> created course details -> that can have many batches
User.hasMany(Course_detail, { foreignKey: "userId", as: "course_details" });
Course_detail.belongsTo(User, {
  foreignKey: "userId",
  as: "user_from_course_details",
});

Category.hasMany(Course_detail, { foreignKey: "catId", as: "course_details" });
Course_detail.belongsTo(Category, {
  foreignKey: "catId",
  as: "category_from_course_details",
});

// ends

User.hasMany(Video, { foreignKey: "userId", as: "videos" });
Video.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Favourite, { foreignKey: "userId", as: "favourites" });
Favourite.belongsTo(User, { foreignKey: "userId", as: "user" });

Course.hasMany(Favourite, { foreignKey: "courseId", as: "favourites" });
Favourite.belongsTo(Course, { foreignKey: "courseId", as: "course" });

User.hasMany(Enrolment, { foreignKey: "userId", as: "enrolments" });
Enrolment.belongsTo(User, { foreignKey: "userId", as: "user" });

Course.hasMany(Enrolment, { foreignKey: "courseId", as: "enrolments" });
Enrolment.belongsTo(Course, { foreignKey: "courseId", as: "course" });

User.hasMany(Instructor_Earning, {
  foreignKey: "userId",
  as: "instructor_earnings",
});
Instructor_Earning.belongsTo(User, { foreignKey: "userId", as: "user" });

Course.hasMany(Instructor_Earning, {
  foreignKey: "courseId",
  as: "instructor_earnings",
});
Instructor_Earning.belongsTo(Course, { foreignKey: "courseId", as: "course" });

User.hasMany(Course_Progress, {
  foreignKey: "userId",
  as: "course_progresses",
});
Course_Progress.belongsTo(User, { foreignKey: "userId", as: "user" });

Course.hasMany(Course_Progress, {
  foreignKey: "courseId",
  as: "course_progresses",
});
Course_Progress.belongsTo(Course, { foreignKey: "courseId", as: "course" });

Video.hasMany(Course_Progress, {
  foreignKey: "videoId",
  as: "course_progresses",
});
Course_Progress.belongsTo(Video, { foreignKey: "videoId", as: "video" });

Courses_teachers.belongsTo(User, { foreignKey: "userId", as: "users" });
Courses_teachers.belongsTo(Course, { foreignKey: "courseId", as: "course" });
// Courses_teachers.hasMany(User, {
//   foreignKey: "id",
//   as: "user",
// });

// User.hasMany(Courses_teachers, {
//   foreignKey: "userId",
//   as: "user",
// });

// Define the associations
Comments.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Comments, { foreignKey: "user_id" });

export {
  User,
  Comments,
  Course,
  Category,
  Video,
  Favourite,
  Enrolment,
  Instructor_Earning,
  Course_Progress,
  Course_Asset,
  Courses_teachers,
  Course_detail,
};
