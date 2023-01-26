export function currencyNumberFormatter(value: number) {
  if (value === null || value === undefined) return undefined;

  return Number(value).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}
