import { DataTypes,Model } from 'sequelize';
import db from '../../../config/database';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

class VehicleType extends Model {};

VehicleType.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    value: DataTypes.FLOAT,
  },
  {
    sequelize: db,
    modelName: 'VehicleType',
  },
);

export default VehicleType;
