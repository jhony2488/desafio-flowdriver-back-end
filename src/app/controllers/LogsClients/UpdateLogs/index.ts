import { Request, Response } from 'express';
import { LogsClients, NotesAndCoins } from '../../../models';
import { calculateChangeMoney } from '../../../utils/calculateChangeMoney';
import { calculateDifferentHours } from '../../../utils/calculateDifferentHours';
import { returnCoinsChangeYesOrNoCoins } from '../../../utils/returnCoinsChangeYesOrNoCoins';

async function UpdateLogs(req: Request, res: Response) {
  const { id } = req.params;
  const {
    prohibited,
    exit,
    price,
    paidOut,
    changeValue,
    paidOutPrice,
    priceVehicle,
    idUser,
  }: {
    prohibited: string;
    exit: string | null;
    idUser: number;
    price: number;
    paidOut: boolean;
    changeValue: number | null;
    priceVehicle: number;
    paidOutPrice: number | null;
  } = req.body;
  // #swagger.tags = ['ClientsLogs']
  // #swagger.description = 'Endpoint para alterar um registro'
  /*    #swagger.parameters['body'] = {
                in: 'body',
                description: "Dado necessario para alterar registro",
                required: true,
                schema: { $ref: "#/definitions/UpdateLogs" }
        } */

  /* #swagger.responses[401] = {
               schema: { $ref: "#/definitions/ErrorTokenInvalid" },
               description: 'Quando o token de authenticação não for valido ou quando o token de authenticação não for encontrado'
        } */

  try {
    const calculationChangePrice = calculateChangeMoney(price, paidOutPrice || 0);
    let notas=[]

    if (calculationChangePrice.message === 'Falta dinheiro' && paidOut) {
      return res.json({
        message: 'Pagamento insuficiente',
      });
    }
    const calPrice = exit != null && exit ? priceVehicle * calculateDifferentHours(prohibited, exit) : price;
    const calChangeValue: { changeValue: number; message: string } | null | any =
      paidOutPrice != null && paidOutPrice ? calculateChangeMoney(calPrice, paidOutPrice || 0) : changeValue;

      if (paidOut) {
        const coins:any= await NotesAndCoins.findAll();
        const coinsFormatted:any=Object.entries(coins).map(([key, value]:any) => (value?.dataValues));
        const changePayment = await returnCoinsChangeYesOrNoCoins(coinsFormatted, calChangeValue.changeValue);

        notas=changePayment.notas;

        if(changePayment.message==="Não há notas suficientes para o troco."){
          return res.json({
            message: changePayment.message,
            notas
          });
        }

        await changePayment.notas.map(async (item: { amount: number; value: number }, index: number) => {
             await NotesAndCoins.update(
               {
                 amount: item.amount - item.amount,
                 value: item.value.toString(),
               },
               {
                 where: {
                   value: item.value.toString(),
                 },
               },
             );
         });

      }

    await LogsClients.update(
      {
        prohibited,
        exit,
        price: calPrice,
        paidOut,
        priceVehicle,
        changeValue: calChangeValue.changeValue != null && calChangeValue.changeValue ? calChangeValue?.changeValue : calChangeValue,
        paidOutPrice,
        idUser,
        changeValueNotas: notas
      },
      {
        where: {
          id,
        },
      },
    );

    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/MessageUpdateLog" },
               description: 'Registro alterado'
        } */
    return res.json({
      message: 'Log de Cliente atualizado com sucesso',
      messageChange: calChangeValue != null && calChangeValue ? calChangeValue?.message : calChangeValue,
      prohibited,
      exit,
      price: calPrice,
      paidOut,
      changeValue: calChangeValue,
      paidOutPrice,
      idUser,
      changeValueNotas: notas
    });
  } catch (err) {
    /* #swagger.responses[400] = {
               schema: { $ref: "#/definitions/Error400" },
               description: 'Quando houver um erro na requisição'
        } */
    return res.status(400).json({ message: err.message });
  }
}

export default UpdateLogs;
