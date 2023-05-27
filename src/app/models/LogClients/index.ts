
import { DataTypes } from 'sequelize';
import db from '../../../config/database.cjs';
import User from '../Clients';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const LogClients = db.define('LogClients', {
  prohibited: DataTypes.STRING,
  exit: DataTypes.FLOAT,
  idUser: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
  paidOut: DataTypes.BOOLEAN,
  changeValue: DataTypes.FLOAT
});

LogClients.belongsTo(User);

export default LogClients;
