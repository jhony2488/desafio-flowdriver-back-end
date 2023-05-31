import { Request, Response } from 'express';
import { VehicleType } from '../../../models';

async function UpdatedVehicleType(req: Request, res: Response) {
  const { id } = req.params;
  const {
    name,
    value,
  }: {
    name: string;
    value: number;
  } = req.body;
  // #swagger.tags = ['Vehicles']
  // #swagger.description = 'Endpoint para atualizar um unico tipo de veiculo '
  /*    #swagger.parameters['body'] = {
                in: 'body',
                description: "Dado necessario alterar veiculo",
                required: true,
                schema: { $ref: "#/definitions/setVehicles" }
        } */

  /* #swagger.responses[401] = {
               schema: { $ref: "#/definitions/ErrorTokenInvalid" },
               description: 'Quando o token de authenticação não for valido ou quando o token de authenticação não for encontrado'
        } */

  try {
    await VehicleType.update({
      name,
      value,
    },{
      where: {
        id,
      },
    });
    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/MessageUpdateVehicle" },
               description: 'Atualizado veiculo'
        } */
    return res.json({
      message: 'Veiculo atualizado com sucesso',
      name,
      value,
    });
  } catch (err) {
    /* #swagger.responses[400] = {
               schema: { $ref: "#/definitions/Error400" },
               description: 'Quando houver um erro na requisição'
        } */
    return res.status(400).json({ message: err.message });
  }
}

export default UpdatedVehicleType;
