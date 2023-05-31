import { Request, Response } from 'express';
import { Clients,LogsClients } from '../../../models';
import { calculateChangeMoney } from '../../../utils/calculateChangeMoney';

async function SetClient(req: Request, res: Response) {
  const {
    prohibited,
    exit,
    price,
    paidOut,
    changeValue,
    paidOutPrice,
    idUser,
  }: {
    prohibited: string;
    exit: string | null;
    idUser: number;
    price: number | null;
    paidOut: boolean;
    changeValue: number | null;
    paidOutPrice: number | null;
  } = req.body;
  // #swagger.tags = ['ClientsLogs']
  // #swagger.description = 'Endpoint para criar um novo registro para um usuario'
  /*    #swagger.parameters['body'] = {
                in: 'body',
                description: "Dado necessario para envio de email de contato",
                required: true,
                schema: { $ref: "#/definitions/setLogs" }
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
        prohibited,
        exit,
        price,
        paidOut,
        changeValue,
        paidOutPrice,
        idUser,
      },
      {
        include: [
          {
            model: Clients,
            as: 'client',
          },
        ],
      },
    );

    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/MessageSetLog" },
               description: 'Criar um novo registro'
        } */
    return res.json({
      message: 'Log de Cliente criado com sucesso',
      prohibited,
      exit,
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
