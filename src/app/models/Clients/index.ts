import { DataTypes } from 'sequelize';
import db from '../../../config/database.cjs';
import LogClients from '../LogClients';
import VehicleType from '../VehicleType';
import UserVehicleType from '../UserVehicleType'

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const Clients = db.define('Clients', {
  plate: DataTypes.STRING,
  VehicleTypeId: DataTypes.INTEGER
});

Clients.hasMany(LogClients);
Clients.belongsToMany(VehicleType, { through: UserVehicleType });

export default Clients;
