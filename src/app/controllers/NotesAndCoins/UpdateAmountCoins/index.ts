import { Request, Response } from 'express';
import { NotesAndCoins } from '../../../models';

async function UpdateAmountCoins(req: Request, res: Response) {
  const { id } = req.params;
  const {
    amount
  }: {
    amount: number;
  } = req.body;
  // #swagger.tags = ['NotesAndCoins']
  // #swagger.description = 'Endpoint para criar atualizar a quantidade de uma nota ou moeda'
  /*    #swagger.parameters['body'] = {
                in: 'body',
                description: "Dado necessario para atualizar moedas/notas",
                required: true,
                schema: { $ref: "#/definitions/UpdateAmountCoin" }
        } */

  /* #swagger.responses[401] = {
               schema: { $ref: "#/definitions/ErrorTokenInvalid" },
               description: 'Quando o token de authenticação não for valido ou quando o token de authenticação não for encontrado'
        } */

  try {
      await NotesAndCoins.update(
        {
          amount,
        },
        {
          where: {
            id
          },
        },
      );

    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/ MessageUpdateAmountCoins" },
               description: 'Atualizado quantidade de moeda'
        } */
    return res.json({
      message: 'Nota/Moeda atualizadas com sucesso',
      amount,
    });
  } catch (err) {
    /* #swagger.responses[400] = {
               schema: { $ref: "#/definitions/Error400" },
               description: 'Quando houver um erro na requisição'
        } */
    return res.status(400).json({ message: err.message });
  }
}

export default UpdateAmountCoins;
