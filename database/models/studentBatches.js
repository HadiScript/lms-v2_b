import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initStudentBatches = (sequelize, Types) => {
  class StudentBatches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudentBatches.init(
    {
      id: {
        type: Types.UUID,
        defaultValue: Types.UUIDV4,
        primaryKey: true,
      },
      userId: DataTypes.STRING,

      batchId: DataTypes.STRING,
      checkId: DataTypes.STRING,
      studentName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StudentBatches",
      tableName: "studentBatches",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return StudentBatches;
};

export default initStudentBatches(connection, DataTypes);
