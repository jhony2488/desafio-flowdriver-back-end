import db from '../../../config/database';
import { DataTypes } from 'sequelize';

const UserVehicleType = db.define('UserVehicleType', {
  userId: DataTypes.INTEGER,
  vehicleTypeId: DataTypes.INTEGER,
});

export default UserVehicleType;
