import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initComments = (sequelize, Types) => {
  class Comments extends Model {
    static associate(models) {}
  }
  Comments.init(
    {
      id: {
        type: Types.UUID,
        defaultValue: Types.UUIDV4,
        primaryKey: true,
      },
      course_id: DataTypes.STRING,
      user_id: DataTypes.STRING,
      text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comments",
      tableName: "comments",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Comments;
};

export default initComments(connection, DataTypes);
