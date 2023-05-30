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
  // #swagger.tags = ['setTasks']
  // #swagger.description = 'Endpoint para criar uma nova task'
  /*    #swagger.parameters['body'] = {
                in: 'body',
                description: "Dado necessario para envio de email de contato",
                required: true,
                schema: { $ref: "#/definitions/SendMail" }
        } */

  /* #swagger.responses[401] = {
               schema: { $ref: "#/definitions/ErrorTokenInvalid" },
               description: 'Quando o token de authenticação não for valido ou quando o token de authenticação não for encontrado'
        } */

  try {
    if (amountsWithdrawn != null && amountsWithdrawn) {
      await amountsWithdrawn.map(async (item) => {
        await NotesAndCoins.create({
          amount: item.amount,
          value: item.value,
        });
      });
      return res.json({
        message: 'Moedas/dinheiro criada com sucesso',
        amountsWithdrawn,
      });
    }
    await NotesAndCoins.create({
      amount,
      value,
    });
    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/SendMailResponse" },
               description: 'Enviar email'
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
