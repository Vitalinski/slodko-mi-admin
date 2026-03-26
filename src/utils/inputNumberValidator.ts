export function handleNumberInput(
  event: Event,
  setter: (value: number) => void,
  transform?: (value: number) => number,
) {
  const input = event.target as HTMLInputElement;

  const normalized = normalizeNumberInput(input.value);
  input.value = normalized;

  let num = parseFloat(normalized);
  if (isNaN(num)) num = 0;

  if (transform) {
    num = transform(num);
  }

  setter(num);
}

export function normalizeNumberInput(value: string) {
  value = value.replace(",", ".");
  value = value.replace(/[^0-9.]/g, "");
  value = value.replace(/(\..*)\./g, "$1");
  value = value.replace(/^(\d+)(\.\d{0,2})?.*$/, "$1$2");
  return value;
}
