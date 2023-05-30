import db from '../../config/database';
import UserVehicleType from './UserVehicleType';
import LogsClients from './LogsClients';
import VehicleType from './VehicleType';
import Clients from './Clients';
import NotesAndCoins from './NotesAndCoins';

db.models.Clients.hasMany(db.models.LogsClients,{
  foreignKey: 'idUser',
  as: 'logs',
  constraints: false,
});

db.models.Clients.belongsToMany(db.models.VehicleType,{ through: db.models.UserVehicleType,constraints: false, as: 'vehicleType'});

db.models.LogsClients.belongsTo(db.models.Clients,{
  foreignKey: {
    name: 'idUser',
    allowNull: false,
  },
  as: 'client',
  constraints: false,
});

db.models.VehicleType.belongsToMany(db.models.Clients,{ through: db.models.UserVehicleType,constraints: false,as:"clients" });

export { UserVehicleType,LogsClients,VehicleType ,NotesAndCoins,Clients };
