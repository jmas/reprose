export function get(key, defaultValue = null) {
  return JSON.parse(localStorage[key] || "null") ?? defaultValue;
}

export function put(key, path) {
  localStorage[key] = JSON.stringify(path);
}

export function del(key) {
  delete localStorage[key];
}
