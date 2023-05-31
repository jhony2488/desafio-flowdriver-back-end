import { Request, Response } from 'express';
import { Clients,VehicleType } from '../../../models';

async function GetVehicleType(req: Request, res: Response) {
  const { id, clients } = req.query;
  // #swagger.tags = ['Vehicles']
  // #swagger.description = 'Endpoint para obter dados de tipos de veiculos'

  /* #swagger.responses[401] = {
             schema: { $ref: "#/definitions/ErrorTokenInvalid" },
             description: 'Quando o token de authenticação não for valido ou quando o token de authenticação não for encontrado'
      } */

  try {
    const result = id ? await VehicleType.findOne({
          where: { id },
          include: clients
            ? [
                {
                  model: Clients,
                  as:"clients"
                },
              ]
            : undefined,
        })
      : await VehicleType.findAll({
          include: clients
            ? [
                {
                  model: Clients,
                  as:"clients"
                },
              ]
            : undefined,
        });
    /* #swagger.responses[200] = {
             schema: { $ref: "#/definitions/GetVehicles" },
             description: 'Obtido os tipos de veiculos'
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
