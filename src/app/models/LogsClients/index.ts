// LogsClients.ts
import { DataTypes, Model } from 'sequelize';
import db from '../../../config/database';

class LogsClients extends Model {};

LogsClients.init(
  {
    prohibited: {
      type: DataTypes.STRING || DataTypes.DATE,
      allowNull: true,
    },
    exit: {
      type: DataTypes.STRING || DataTypes.DATE,
      allowNull: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    paidOut: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    paidOutPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    changeValue: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    priceVehicle: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'LogsClients',
  },
);

export default LogsClients;
