import express from 'express';

import authentication from './app/middlewares/auth';

import DefaultControllersUsers from './app/controllers/DefaultControllers';
import { GetClients, SetClients, UpdateClients, DeleteClients } from './app/controllers/Clients';

import { GetLogsClients, SetLogsClients, UpdateLogsClients, DeleteLogsClients } from './app/controllers/LogsClients';

import {
  GetNotesAndCoins,
  SetNotesAndCoins,
  UpdateNotesAndCoins,
  UpdateAmountCoins,
  UpdateNotesAndCoinsWithWithdrawalOrPlacement,
  DeleteNotesAndCoins,
} from './app/controllers/NotesAndCoins';

import { GetVehicleType, SetVehicleType, UpdateVehicleType, DeleteVehicleType } from './app/controllers/VehicleType';

const router = express.Router();

//default
router.get('/', authentication, DefaultControllersUsers);

//clients
router.get('/clients', authentication, GetClients);
router.post('/clients', authentication, SetClients);
router.put('/clients/:id', authentication,  UpdateClients);
router.delete('/clients/:id', authentication, DeleteClients);

//NotesAndCoins
router.get('/notesAndCoins', authentication, GetNotesAndCoins);
router.post('/notesAndCoins', authentication, SetNotesAndCoins);
router.put('/notesAndCoins', authentication,UpdateNotesAndCoinsWithWithdrawalOrPlacement);
router.put('/notesAndCoins/:id', authentication,UpdateNotesAndCoins);
router.patch('/notesAndCoins/:id', authentication,UpdateAmountCoins);
router.delete('/notesAndCoins/:id', authentication, DeleteNotesAndCoins);

//LogsClients
router.get('/notesAndCoins', authentication, GetLogsClients);
router.post('/notesAndCoins', authentication, SetLogsClients);
router.put('/notesAndCoins', authentication, UpdateLogsClients);
router.delete('/notesAndCoins/:id', authentication, DeleteLogsClients);

//VehicleType
router.get('/vehicleType', authentication, GetVehicleType);
router.post('/vehicleType', authentication, SetVehicleType);
router.put('/vehicleType/:id', authentication, UpdateVehicleType);
router.delete('/vehicleType/:id', authentication, DeleteVehicleType);

export default router;
