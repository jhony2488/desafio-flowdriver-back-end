
import { Request, Response } from 'express';
import {Clients,LogsClients} from '../../../models';

async function DeleteClients(req: Request, res: Response) {
  const { id } = req.params;
  // #swagger.tags = ['Clients']
  // #swagger.description = 'Endpoint para deletar um cliente'

  /* #swagger.responses[401] = {
               schema: { $ref: "#/definitions/ErrorTokenInvalid" },
               description: 'Quando o token de authenticação não for valido ou quando o token de authenticação não for encontrado'
        } */

  try {
    await Clients.destroy({
      where: {
        id
      }
    });

    await LogsClients.destroy({ where: { idUser: id } });

    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/MessageDeleteClient" },
               description: 'Cliente deletado'
        } */
    return res.json({
      message: 'Cliente deletado com sucesso',
    });
  } catch (err) {
    /* #swagger.responses[400] = {
               schema: { $ref: "#/definitions/Error400" },
               description: 'Quando houver um erro na requisição'
        } */
    return res.status(400).json({ message: err.message });
  }
}

export default DeleteClients;
