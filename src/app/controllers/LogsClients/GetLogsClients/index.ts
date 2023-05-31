
import { Request, Response } from 'express';
import { Clients,LogsClients } from '../../../models';

async function getLogs(req: Request, res: Response) {
  const { idUser } = req.query;
  // #swagger.tags = ['ClientsLogs']
  // #swagger.description = 'Endpoint para obter registros de usuarios'

  /* #swagger.responses[401] = {
             schema: { $ref: "#/definitions/ErrorTokenInvalid" },
             description: 'Quando o token de authenticação não for valido ou quando o token de authenticação não for encontrado'
      } */

  try {
    const result = idUser ?  await LogsClients.findAll({
      where: { idUser },
    }) : await LogsClients.findAll({
      include: [
        {
          model: Clients,
          as: 'client'
        },
      ]
    });
    /* #swagger.responses[200] = {
             schema: { $ref: "#/definitions/GetLogs" },
             description: 'Obtido os logs'
      } */
    return res.json({
      result
    });
  } catch (err) {
    /* #swagger.responses[400] = {
             schema: { $ref: "#/definitions/Error400" },
             description: 'Quando houver um erro na requisição'
      } */
    return res.status(400).json({ message: err.message });
  }
}

export default getLogs;
