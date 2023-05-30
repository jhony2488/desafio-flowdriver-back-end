import { DataTypes, Model } from 'sequelize';
import db from '../../../config/database';

class Clients extends Model {};

Clients.init(
  {
    plate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    VehicleTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'Clients',
  },
);

export default Clients;
