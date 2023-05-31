import { Request, Response } from 'express';
import { NotesAndCoins } from '../../../models';
import { PropsCoins } from '../../../interfaces/coins';

async function SetNotesAndCoins(req: Request, res: Response) {
  const {
    value,
    amount,
    amountsWithdrawn,
  }: {
    value?: string;
    amount?: number;
    amountsWithdrawn: PropsCoins[] | null;
  } = req.body;
  // #swagger.tags = ['NotesAndCoins']
  // #swagger.description = 'Endpoint para criar uma nova moeda ou nota(cedula)'
  /*    #swagger.parameters['body'] = {
                in: 'body',
                description: "Dado necessario para criar moeda e nota(cedula)",
                required: true,
                schema: { $ref: "#/definitions/setMoney" }
        } */

  /* #swagger.responses[401] = {
               schema: { $ref: "#/definitions/ErrorTokenInvalid" },
               description: 'Quando o token de authenticação não for valido ou quando o token de authenticação não for encontrado'
        } */

  try {
    if (amountsWithdrawn != null && amountsWithdrawn) {
      await amountsWithdrawn.map(async (item) => {
        await NotesAndCoins.upsert({
          amount: item.amount,
          value: item.value,
        });
      });
      return res.json({
        message: 'Moedas/dinheiro criada com sucesso',
        amountsWithdrawn,
      });
    }
    await NotesAndCoins.upsert({
      amount,
      value,
    });
    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/MessageSetMoney" },
               description: 'Moeda/nota criada'
        } */
    return res.json({
      message: 'Moedas/dinheiro criada com sucesso',
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

export default SetNotesAndCoins;
