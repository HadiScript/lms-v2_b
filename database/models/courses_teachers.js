import { Model, DataTypes } from "sequelize";
import connection from "../connection";
import user from "./user";

const initCourseTeacher = (sequelize, Types) => {
  class CourseTeacher extends Model {
    static associate(models) {}
  }
  CourseTeacher.init(
    {
      id: {
        type: Types.UUID,
        defaultValue: Types.UUIDV4,
        primaryKey: true,
      },
      userId: DataTypes.STRING,
      courseId: DataTypes.STRING,
      checkId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "course_teachers",
      tableName: "courses_teachers",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return CourseTeacher;
};
export default initCourseTeacher(connection, DataTypes);
