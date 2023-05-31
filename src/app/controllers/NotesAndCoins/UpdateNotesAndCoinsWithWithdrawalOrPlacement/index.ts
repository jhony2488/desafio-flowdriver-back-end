import { Request, Response } from 'express';
import { NotesAndCoins } from '../../../models';
import { PropsCoins } from '../../../interfaces/coins';

async function UpdateNotesAndCoinsWithWithdrawalOrPlacement(req: Request, res: Response) {
  const {
    amountsWithdrawn,
  }: {
    amountsWithdrawn: PropsCoins[];
  } = req.body;
  // #swagger.tags = ['NotesAndCoins']
  // #swagger.description = 'Endpoint para atualizar varias moedas/notas'
  /*    #swagger.parameters['body'] = {
                in: 'body',
                description: "Dado necessario para atualizar varias moedas/notas",
                required: true,
                schema: { $ref: "#/definitions/UpdateCoins" }
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
            amount: item.amount + getItem.amount,
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
          message: 'Nota não existem no estoque de dinheiro',
          nota: item.value
        });
      }
    });

    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/MessageUpdateCoins" },
               description: 'Notas atualizadas com sucesso'
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
