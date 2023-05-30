import { PropsCoins } from '../interfaces/coins';
import { isIntegerOrFloat } from './isIntegirOrFloat';

export function returnCoinsChangeYesOrNoCoins(coins: PropsCoins[], troco:number) {
  const notasTroco = {};
  let message='';
  console.log(troco);
  coins.map((nota) => {
    const quantidadeNotas = Math.floor(isIntegerOrFloat(nota.value.replace(/,/g, '.')) ? troco / parseFloat(nota.value.replace(/,/g, '.')) : troco / parseInt(nota.value.replace(/,/g, '.')) );
    console.log(troco, nota);
    if (quantidadeNotas > 0 && nota.amount > 0) {
      const quantidadeUtilizada = Math.min(quantidadeNotas, nota.amount);
      notasTroco[nota.value] = quantidadeUtilizada;
      troco -= parseFloat(nota.value) * quantidadeUtilizada;
    }
  });



  const notas = Object.entries(notasTroco).map(([key, value]) => ({
    value: parseInt(key),
    amount: value,
  }));
  if (notas.length> 0) {
    message= "Há notas suficientes para o troco." ;
  } else {
    message="Não há notas suficientes para o troco.";
  }

  return {
    notas,
    message
  }
}
