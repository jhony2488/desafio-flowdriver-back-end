import { DataTypes } from 'sequelize';
import db from '../../../config/database.cjs';
import UserClient from '../Clients';
import UserVehicleType from '../UserVehicleType';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const VehicleType = db.define('VehicleType', {
  name: DataTypes.STRING,
  value: DataTypes.FLOAT,
});

VehicleType.belongsToMany(UserClient, { through: UserVehicleType });

export default VehicleType;
