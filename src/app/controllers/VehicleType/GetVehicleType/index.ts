import { Request, Response } from 'express';
import UserClient from '../../../models/Clients';
import VehicleType from '../../../models/VehicleType';

async function GetVehicleType(req: Request, res: Response) {
  const { id, clients } = req.query;
  // #swagger.tags = ['Tasks']
  // #swagger.description = 'Endpoint para obter dados de tasks'

  /* #swagger.responses[401] = {
             schema: { $ref: "#/definitions/ErrorTokenInvalid" },
             description: 'Quando o token de authenticação não for valido ou quando o token de authenticação não for encontrado'
      } */

  try {
    const result = await id? VehicleType.findOne({
          where: { id },
          include: clients
            ? [
                {
                  model: VehicleType, // Modelo da primeira associação
                  as: 'userClients', // Alias da primeira associação definido no modelo User
                },
              ]
            : undefined,
        })
      : VehicleType.findAll({
          include: clients
            ? [
                {
                  model: UserClient, // Modelo da primeira associação
                  as: 'userClients', // Alias da primeira associação definido no modelo User
                },
              ]
            : undefined,
        });
    /* #swagger.responses[200] = {
             schema: { $ref: "#/definitions/SendMailResponse" },
             description: 'Obtido as tasks'
      } */
    return res.json({
      result,
    });
  } catch (err) {
    /* #swagger.responses[400] = {
             schema: { $ref: "#/definitions/Error400" },
             description: 'Quando houver um erro na requisição'
      } */
    return res.status(400).json({ message: err.message });
  }
}

export default GetVehicleType;
