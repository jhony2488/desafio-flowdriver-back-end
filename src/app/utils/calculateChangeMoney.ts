export function calculateChangeMoney(valorCompra:number, valorPago:number) {
  const changeValue:number = valorPago - valorCompra;
  const message:string = valorPago < valorCompra ? 'Falta dinheiro' : 'Não falta dinheiro';

  return {
    changeValue,
    message
  };
}
