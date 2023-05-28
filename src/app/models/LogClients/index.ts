
import { DataTypes } from 'sequelize';
import db from '../../../config/database.cjs';
import User from '../Clients';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const LogsClients = db.define('LogsClients', {
  prohibitedHours: DataTypes.STRING,
  exitHours: DataTypes.FLOAT,
  idUser: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
  paidOut: DataTypes.BOOLEAN,
  paidOutPrice: DataTypes.STRING,
  changeValue: DataTypes.FLOAT
});

LogsClients.belongsTo(User);

export default LogsClients;
