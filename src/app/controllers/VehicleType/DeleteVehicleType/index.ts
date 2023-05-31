
import { Request, Response } from 'express';
import { Clients,VehicleType } from '../../../models';

async function DeleteVehicleType(req: Request, res: Response) {
  const { id } = req.params;
  // #swagger.tags = ['Tasks']
  // #swagger.description = 'Endpoint para deletar'

  /* #swagger.responses[401] = {
               schema: { $ref: "#/definitions/ErrorTokenInvalid" },
               description: 'Quando o token de authenticação não for valido ou quando o token de authenticação não for encontrado'
        } */

  try {
    await VehicleType.destroy({
      where: {
        id
      }
    });

    await Clients.update({
      VehicleTypeId:null,
    },{
      where: {
        VehicleTypeId:id,
      },
    });

    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/MessageDeleteVehicle" },
               description: 'Veiculo deletado'
        } */
    return res.json({
      message: 'Veiculo deletado com sucesso',
    });
  } catch (err) {
    /* #swagger.responses[400] = {
               schema: { $ref: "#/definitions/Error400" },
               description: 'Quando houver um erro na requisição'
        } */
    return res.status(400).json({ message: err.message });
  }
}

export default DeleteVehicleType;
