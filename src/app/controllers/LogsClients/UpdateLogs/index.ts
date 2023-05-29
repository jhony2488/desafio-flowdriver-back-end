import { Request, Response } from 'express';
import { LogsClients } from '../../../models';
import { calculateChangeMoney } from '../../../utils/calculateChangeMoney';
import { calculateDifferentHours } from '../../../utils/calculateDifferentHours'

async function SetClient(req: Request, res: Response) {
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
   const calculationChangePrice= calculateChangeMoney(price, paidOutPrice || 0);

   if(calculationChangePrice.message==='Falta dinheiro' && paidOut){
    return res.json({
      message: 'Pagamento insuficiente',
    });
   }

  const calChangeValue=paidOutPrice!=null || paidOutPrice ?  calculateChangeMoney(price, paidOutPrice || 0): changeValue;
  const calPrice= exit!=null && exit? priceVehicle * calculateDifferentHours(prohibited, exit) : price;

    await LogsClients.update(
      {
        prohibited,
        exit,
        price: calPrice,
        paidOut,
        priceVehicle,
        changeValue: calChangeValue,
        paidOutPrice,
        idUser,
      },
      {
        where: {
          id,
        },
      },
    );

    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/SendMailResponse" },
               description: 'Enviar email'
        } */
    return res.json({
      message: 'Log de Cliente atualizado com sucesso',
      prohibited,
      exit,
      price: calPrice,
      paidOut,
      changeValue: calChangeValue,
      paidOutPrice,
      idUser,
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
