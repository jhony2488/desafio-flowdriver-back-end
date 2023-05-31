import { Request, Response } from 'express';
import { LogsClients } from '../../../models';

async function DeleteLogs(req: Request, res: Response) {
  const { id } = req.params;
  // #swagger.tags = ['ClientsLogs']
  // #swagger.description = 'Endpoint para criar um log'

  /* #swagger.responses[401] = {
               schema: { $ref: "#/definitions/ErrorTokenInvalid" },
               description: 'Quando o token de authenticação não for valido ou quando o token de authenticação não for encontrado'
        } */

  try {

    await LogsClients.destroy(
      {
        where: {
          id,
        },
      },
    );

    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/ DeleteLogMessage" },
               description: 'Log de Cliente deletado com sucesso'
        } */
    return res.json({
      message: 'Log de Cliente deletado com sucesso',
    });
  } catch (err) {
    /* #swagger.responses[400] = {
               schema: { $ref: "#/definitions/Error400" },
               description: 'Quando houver um erro na requisição'
        } */
    return res.status(400).json({ message: err.message });
  }
}

export default DeleteLogs;
