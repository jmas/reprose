import { parseUri } from "parseuri";

export function init(config = {}) {
  const protocol = config.protocol ?? null;
  const commands = new Map(Object.entries(config.commands ?? {}));

  if (!protocol) {
    throw new Error("Missing required config option: protocol");
  }

  const listener = (event) => {
    if (typeof event.data === "string" && event.data.startsWith(protocol)) {
      const uri = parseUri(event.data);

      if (commands.has(uri.pathname)) {
        const command = commands.get(uri.pathname);

        command(uri.queryParams);
      }
    }
  };

  addEventListener("message", listener);

  return () => {
    removeEventListener("message", listener);
  };
}
