import { DataTypes } from 'sequelize';
import db from '../../../config/database';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const NotesAndCoins = db.define('NotesAndCoins', {
  value: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  amount: DataTypes.INTEGER,
});

export default NotesAndCoins;
