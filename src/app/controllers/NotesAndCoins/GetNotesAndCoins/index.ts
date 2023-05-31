
import { Request, Response } from 'express';
import { NotesAndCoins } from '../../../models';

async function GetNotesAndCoins(req: Request, res: Response) {
  const { id } = req.query;
  // #swagger.tags = ['NotesAndCoins']
  // #swagger.description = 'Endpoint para obter dados de notas e moedas'

  /* #swagger.responses[401] = {
             schema: { $ref: "#/definitions/ErrorTokenInvalid" },
             description: 'Quando o token de authenticação não for valido ou quando o token de authenticação não for encontrado'
      } */

  try {
    const result = id ? await NotesAndCoins.findOne({
      where: { id }
    }) : await NotesAndCoins.findAll();
    /* #swagger.responses[200] = {
             schema: { $ref: "#/definitions/GetMoney" },
             description: 'Obtido os dados'
      } */
    return res.json({
      result
    });
  } catch (err) {
    /* #swagger.responses[400] = {
             schema: { $ref: "#/definitions/Error400" },
             description: 'Quando houver um erro na requisição'
      } */
    return res.status(400).json({ message: err.message });
  }
}

export default GetNotesAndCoins;
