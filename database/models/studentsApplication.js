import { Model, DataTypes, BOOLEAN } from "sequelize";
import connection from "../connection";

const Students_Applications = (sequelize, Types) => {
  class Students_Applications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Students_Applications.init(
    {
      id: {
        type: Types.UUID,
        defaultValue: Types.UUIDV4,
        primaryKey: true,
      },

      firstName: { type: String },
      lastName: { type: String },
      email: { type: String },
      phoneNumber: { type: String },
      idCard: { type: String },
      address: { type: String },
      city: { type: String },
      dateOfBirth: { type: Date },

      parentName: { type: String },
      parentOccupations: { type: String },
      parentPhoneNumber: { type: String },

      interest: { type: String },
      wantToAchieve: { type: String },

      course: { type: String },
      education: { type: String },
      gender: { type: String },
      isPaid: { type: Boolean, defaultValue: false },
      approved: { type: Boolean, defaultValue: false },
      rejected: { type: Boolean, defaultValue: false },
      registered: { type: Boolean, defaultValue: false },
      remarks: { type: String },
      enrollTo: { type: String },
    },
    {
      sequelize,
      modelName: "Students_Applications",
      tableName: "Students_Applications",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Students_Applications;
};

export default Students_Applications(connection, DataTypes);
