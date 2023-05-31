import { Request, Response } from 'express'
import {Clients,LogsClients, VehicleType,UserVehicleType} from '../../../models';


async function SetClient(req: Request, res: Response) {
  const {
    plate,
    VehicleTypeId,
    LogClients,
  }: {
    plate:string;
    VehicleTypeId: number;
    LogClients:[];
  } = req.body;
  // #swagger.tags = ['Clients']
  // #swagger.description = 'Endpoint para criar um novo usuario'
  /*    #swagger.parameters['body'] = {
                in: 'body',
                description: "Dado necessario para criar cliente",
                required: true,
                schema: { $ref: "#/definitions/SetClient" }
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
          as: 'logs' // Alias da primeira associação definido no modelo
        },
        {
          model: VehicleType, // Modelo da primeira associação
          as: 'vehicleType' // Alias da primeira associação definido no modelo
        },
      ]
    });

    const user: any = await Clients.findOne({
      where: { plate },
    });



    const userId= user?.id;

        if(LogClients.length> 0){
     await LogClients.map(async ( {
        prohibited,
        exit,
        price,
        paidOut,
        changeValue,
        paidOutPrice,
      })=>{
        await LogsClients.create(
          {
            prohibited,
            exit,
            price,
            paidOut,
            changeValue,
            paidOutPrice,
            idUser:userId,
          },
          {
            include: [
              {
                model: Clients, // Modelo da primeira associação
                as: 'client', // Alias da primeira associação definido no modelo
              },
            ],
          },
        );
      })
    }

    await UserVehicleType.create({ userId,VehicleTypeId, ClientId:userId });

    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/MessageSetClient" },
               description: 'Cliente criado'
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
