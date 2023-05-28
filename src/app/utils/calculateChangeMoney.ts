export function calculateChangeMoney(valorCompra:number, valorPago:number) {
  const changeValue = valorPago - valorCompra;
  const message = valorPago < valorCompra ? 'Falta dinheiro' : 'Não falta dinheiro';

  return {
    changeValue,
    message
  };
}
