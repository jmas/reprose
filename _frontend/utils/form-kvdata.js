export function getKvData(form, name = "kv") {
  const data = new FormData(form);
  const keys = data.getAll(`${name}[key][]`);
  const values = data.getAll(`${name}[value][]`);

  return keys.reduce((keyValues, key, index) => {
    keyValues[key] = values[index];

    return keyValues;
  }, {});
}
