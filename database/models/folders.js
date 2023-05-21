import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initFolder = (sequelize, Types) => {
  class Folder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    // 	// define association here
    // }
  }
  Folder.init(
    {
      id: {
        type: Types.UUID,
        defaultValue: Types.UUIDV4,
        primaryKey: true,
      },
      folder_name: Types.STRING, 
      creator_name: Types.STRING,
      creator_id: Types.STRING,
      course_id: Types.STRING,
    },
    {
      sequelize,
      modelName: "Folder",
      tableName: "folders",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Folder;
};

export default initFolder(connection, DataTypes);
