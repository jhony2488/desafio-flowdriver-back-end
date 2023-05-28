import { Request, Response } from 'express';
import UserClients from '../../../models/Clients';
import LogsClients from '../../../models/LogClients';
import { calculateChangeMoney } from '../../../utils/calculateChangeMoney';

async function SetClient(req: Request, res: Response) {
  const {
    prohibitedHours,
    exitHours,
    price,
    paidOut,
    changeValue,
    paidOutPrice,
    idUser,
  }: {
    prohibitedHours: string;
    exitHours: string | null;
    idUser: number;
    price: number;
    paidOut: boolean;
    changeValue: number | null;
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

    await LogsClients.create(
      {
        prohibitedHours,
        exitHours,
        price,
        paidOut,
        changeValue,
        paidOutPrice,
        idUser,
      },
      {
        include: [
          {
            model: UserClients, // Modelo da primeira associação
            as: 'userClients', // Alias da primeira associação definido no modelo User
          },
        ],
      },
    );

    const user:any = await UserClients.findByPk(idUser);

    user.addLogsClients(      {
      prohibitedHours,
      exitHours,
      price,
      paidOut,
      changeValue,
      paidOutPrice,
      idUser,
    },);

    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/SendMailResponse" },
               description: 'Enviar email'
        } */
    return res.json({
      message: 'Log de Cliente criado com sucesso',
      prohibitedHours,
      exitHours,
      price,
      paidOut,
      changeValue,
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
