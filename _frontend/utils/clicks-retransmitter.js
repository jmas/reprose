export function init(config = {}) {
  const protocols = config.protocols ?? [];

  if (protocols.length === 0) {
    throw new Error("Missing required config option: protocol");
  }

  const listener = (event) => {
    const target = event.target.closest("a");
    const href = target?.getAttribute("href");

    if (target && protocols.some((protocol) => href.startsWith(protocol))) {
      event.preventDefault();

      parent.postMessage(href, "*");
    }
  };

  document.body.addEventListener("click", listener);

  return () => {
    window.removeEventListener("click", listener);
  };
}
