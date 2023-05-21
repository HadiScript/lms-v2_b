import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initCourse_Notice = (sequelize, Types) => {
  class Course_Notice extends Model {
    static associate(models) {}
  }
  Course_Notice.init(
    {
      id: {
        type: Types.UUID,
        defaultValue: Types.UUIDV4,
        primaryKey: true,
      },
      course_id: DataTypes.STRING,
      user_id: DataTypes.STRING,
      heading: DataTypes.STRING,
      text: DataTypes.STRING,
      variant: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Course_Notice",
      tableName: "course_notice",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Course_Notice;
};

export default initCourse_Notice(connection, DataTypes);
