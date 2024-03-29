import { Request, Response } from 'express';
import { NotesAndCoins } from '../../../models';

async function UpdateNotesAndCoins(req: Request, res: Response) {
  const { id } = req.params;
  const {
    value,
    amount
  }: {
    value: string;
    amount: number;
  } = req.body;
  // #swagger.tags = ['NotesAndCoins']
  // #swagger.description = 'Endpoint para atualizar uma nota'
  /*    #swagger.parameters['body'] = {
                in: 'body',
                description: "Dado necessario para atualizar nota/moeda",
                required: true,
                schema: { $ref: "#/definitions/UpdateMoney" }
        } */

  /* #swagger.responses[401] = {
               schema: { $ref: "#/definitions/ErrorTokenInvalid" },
               description: 'Quando o token de authenticação não for valido ou quando o token de authenticação não for encontrado'
        } */

  try {
      await NotesAndCoins.update(
        {
          amount,
          value,
        },
        {
          where: {
            id
          },
        },
      );

    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/MessageUpdateCoin" },
               description: 'Nota atualizada'
        } */
    return res.json({
      message: 'Nota/Moeda atualizadas com sucesso',
      amount,
      value,
    });
  } catch (err) {
    /* #swagger.responses[400] = {
               schema: { $ref: "#/definitions/Error400" },
               description: 'Quando houver um erro na requisição'
        } */
    return res.status(400).json({ message: err.message });
  }
}

export default UpdateNotesAndCoins;
