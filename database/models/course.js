import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initCourse = (sequelize, Types) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   this.belongsToMany(models.User, { through: models.course_teachers });
    }
  }
  Course.init(
    {
      id: {
        type: Types.UUID,
        defaultValue: Types.UUIDV4,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      // slug: DataTypes.STRING,
      live_link: DataTypes.STRING,

      cdId: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "course_details",
          key: "id",
          as: "cdId",
        },
      },

      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
          as: "userId",
        },
      },

      monday: { type: Boolean },
      tuesday: { type: Boolean },
      wednesday: { type: Boolean },
      thursday: { type: Boolean },
      friday: { type: Boolean },
      slug: DataTypes.STRING,

      startingFrom: { type: String },
      _to: { type: String },
      startingDate: { type: Date },
      endingDate: { type: Date },
      deactive: { type: Boolean, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Course",
      tableName: "courses",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Course;
};
export default initCourse(connection, DataTypes);
