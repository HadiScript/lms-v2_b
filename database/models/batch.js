import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const Course_Batch = (sequelize, Types) => {
  class CourseBatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    // 	// define association here
    // }
  }
  CourseBatch.init(
    {
      id: {
        type: Types.UUID,
        defaultValue: Types.UUIDV4,
        primaryKey: true,
      },
      batchName: { type: String },

      monday: { type: Boolean },
      tuesday: { type: Boolean },
      wednesday: { type: Boolean },
      thursday: { type: Boolean },
      friday: { type: Boolean },
      slug: DataTypes.STRING,

      startingFrom: { type: String },
      _to: { type: String },
      course: { type: String },
      startingDate: { type: Date },
      endingDate: { type: Date },
      deactive: { type: Boolean, defaultValue: false },
    },
    {
      sequelize,
      modelName: "CourseBatch",
      tableName: "course_batch",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return CourseBatch;
};

export default Course_Batch(connection, DataTypes);
