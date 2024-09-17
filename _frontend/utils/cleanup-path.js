export function cleanupPath(path) {
  return path
    .split("/")
    .filter((segment) => segment && segment.trim() !== "")
    .join("/");
}
