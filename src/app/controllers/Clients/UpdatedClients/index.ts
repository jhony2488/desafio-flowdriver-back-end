import { Request, Response } from 'express'
import {Clients} from '../../../models';

async function UpdateUserClient(req: Request, res: Response) {
  const { id } = req.params;
  const {
    plate,
    VehicleTypeId,
  }: {
    plate:string;
    VehicleTypeId: number;
  } = req.body;
  // #swagger.tags = ['Clients']
  // #swagger.description = 'Endpoint para criar atualizar o cliente'
  /*    #swagger.parameters['body'] = {
                in: 'body',
                description: "Dado necessario para atualizar dados de cliente",
                required: true,
                schema: { $ref: "#/definitions/UpdateClient" }
        } */

  /* #swagger.responses[401] = {
               schema: { $ref: "#/definitions/ErrorTokenInvalid" },
               description: 'Quando o token de authenticação não for valido ou quando o token de authenticação não for encontrado'
        } */

  try {
    await Clients.update({
      plate,
      VehicleTypeId,
    },{
      where: {
        id,
      },
    });
    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/MessageUpdateClient" },
               description: 'Resposta da atualizacao de cliente'
        } */
    return res.json({
      message: 'Client atualizado com sucesso',
      plate,
      VehicleTypeId,
    });
  } catch (err) {
    /* #swagger.responses[400] = {
               schema: { $ref: "#/definitions/Error400" },
               description: 'Quando houver um erro na requisição'
        } */
    return res.status(400).json({ message: err.message });
  }
}

export default UpdateUserClient;
