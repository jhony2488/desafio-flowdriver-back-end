export function calculateDifferentHours(start: string, end: string) {
  // Data de início
  const startDate = new Date(start);

  // Data de término
  const endDate = new Date(end);

  // Calcula a diferença de tempo em milissegundos
  const timeDiff = endDate.getTime() - startDate.getTime();

  // Converte a diferença de tempo em horas
  const hoursDiff = timeDiff / (1000 * 60 * 60);

  return hoursDiff;
}
