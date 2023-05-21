import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initDropStudents = (sequelize, Types) => {
  class Drop_students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    // 	// define association here
    // }
  }

  Drop_students.init(
    {
      id: {
        type: Types.UUID,
        defaultValue: Types.UUIDV4,
        primaryKey: true,
      },
      stu_cord: Types.STRING,
      stu_name: Types.STRING,
      stu_email: Types.STRING,
      joining_date: Types.DATE,
      course: Types.STRING,
    },
    {
      sequelize,
      modelName: "Drop_students",
      tableName: "drop_students",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Drop_students;
};

export default initDropStudents(connection, DataTypes);
