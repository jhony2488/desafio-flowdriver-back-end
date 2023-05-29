import { Request, Response } from 'express'
import {Clients,LogsClients, VehicleType,UserVehicleType} from '../../../models';


async function SetClient(req: Request, res: Response) {
  const {
    plate,
    VehicleTypeId,
    LogClients,
  }: {
    plate:string;
    VehicleTypeId: number
    LogClients:[]
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
    await Clients.create({
      plate,
      VehicleTypeId,
      LogClients,
    },{
      include:
      [
        {
          model: LogsClients, // Modelo da primeira associação
          as: 'logClients' // Alias da primeira associação definido no modelo User
        },
        {
          model: VehicleType, // Modelo da primeira associação
          as: 'vehicleType' // Alias da primeira associação definido no modelo User
        },
      ]
    });

    const user: any = await Clients.findOne({
      where: { plate },
    });

    const userId= user?.id;
    const vehicleTypeId= VehicleTypeId;

    await UserVehicleType.create({userId, vehicleTypeId });

    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/SendMailResponse" },
               description: 'Enviar email'
        } */
    return res.json({
      message: 'Client criado com sucesso',
      plate,
      VehicleTypeId,
      LogClients,
      VehicleType,
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
