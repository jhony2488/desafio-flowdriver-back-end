
import { Request, Response } from 'express';
import { Clients,LogsClients } from '../../../models';

async function getLogs(req: Request, res: Response) {
  const { idUser } = req.query;
  // #swagger.tags = ['Tasks']
  // #swagger.description = 'Endpoint para obter dados de tasks'

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
          model: Clients, // Modelo da primeira associação
          as: 'client' // Alias da primeira associação definido no modelo
        },
      ]
    });
    /* #swagger.responses[200] = {
             schema: { $ref: "#/definitions/SendMailResponse" },
             description: 'Obtido as tasks'
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
