export function numberFormatter(value: number, precision = 2) {
  return Number(value * 100).toLocaleString("pt-br", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
}
