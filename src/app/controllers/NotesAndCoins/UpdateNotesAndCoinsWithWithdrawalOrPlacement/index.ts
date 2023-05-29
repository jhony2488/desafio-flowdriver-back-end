import { Request, Response } from 'express';
import { NotesAndCoins } from '../../../models';

async function UpdateNotesAndCoinsWithWithdrawalOrPlacement(req: Request, res: Response) {
  const {
    amountsWithdrawn,
  }: {
    amountsWithdrawn: [];
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
    await amountsWithdrawn.map(async (item: { amount: number; value: string }, index: number) => {
     const getItem: any= await NotesAndCoins.findOne(
        {
          where: {
            value: item.value,
          },
        },
      );
      if(getItem.value){
        await NotesAndCoins.update(
          {
            amount: item.amount + getItem.value,
            value: item.value,
          },
          {
            where: {
              value: item.value,
            },
          },
        );
      }
      else{
        return res.json({
          message: 'Nota não existeno estoque de dinheiro',
        });
      }
    });

    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/SendMailResponse" },
               description: 'Enviar email'
        } */
    return res.json({
      message: 'Notas atualizadas com sucesso',
    });
  } catch (err) {
    /* #swagger.responses[400] = {
               schema: { $ref: "#/definitions/Error400" },
               description: 'Quando houver um erro na requisição'
        } */
    return res.status(400).json({ message: err.message });
  }
}

export default UpdateNotesAndCoinsWithWithdrawalOrPlacement;
