import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initAssignments = (sequelize, Types) => {
  class Assignments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    // 	// define association here
    // }
  }
  Assignments.init(
    {
      id: {
        type: Types.UUID,
        defaultValue: Types.UUIDV4,
        primaryKey: true,
      },
      folder_id: Types.STRING, 
      stu_name: Types.STRING,
      stu_id: Types.STRING,
      file : DataTypes.STRING,
      file_name : Types.STRING
    },
    {
      sequelize,
      modelName: "Assignment",
      tableName: "assignment_files",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Assignments;
};

export default initAssignments(connection, DataTypes);
