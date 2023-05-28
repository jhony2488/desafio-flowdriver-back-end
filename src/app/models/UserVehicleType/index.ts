import db from '../../../config/database.cjs';
import { DataTypes } from 'sequelize';

const UserVehicleType = db.define('UserVehicleType', {
  userId: DataTypes.INTEGER,
  vehicleType: DataTypes.INTEGER,
});

export default UserVehicleType;
