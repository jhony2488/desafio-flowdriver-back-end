import { DataTypes } from 'sequelize';
import db from '../../../config/database.cjs';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const NotesAndCoins = db.define('NotesAndCoins', {
  value: DataTypes.STRING,
  amount: DataTypes.FLOAT,
});

export default NotesAndCoins;
