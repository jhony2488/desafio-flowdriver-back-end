import { Request, Response } from 'express';
import { NotesAndCoins } from '../../../models';

async function SetClient(req: Request, res: Response) {
  const { id } = req.params;
  // #swagger.tags = ['NotesAndCoins']
  // #swagger.description = 'Endpoint para criar uma moeda/nota'

  /* #swagger.responses[401] = {
               schema: { $ref: "#/definitions/ErrorTokenInvalid" },
               description: 'Quando o token de authenticação não for valido ou quando o token de authenticação não for encontrado'
        } */

  try {

    await NotesAndCoins.destroy(
      {
        where: {
          id,
        },
      },
    );

    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/MessageDeleteCoins" },
               description: 'Deleteado dinheiro'
        } */
    return res.json({
      message: 'Moeda deletado com sucesso',
    });
  } catch (err) {
    /* #swagger.responses[400] = {
               schema: { $ref: "#/definitions/Error400" },
               description: 'Quando houver um erro na requisição'
        } */
    return res.status(400).json({ message: err.message });
  }
}

export default SetClient;
