import { init as initCommandHandler } from "./commands-handler";

export const defaultProtocol = "modal";

// Handle URI: modal:open?url=https://...

export function init(config = {}) {
  const protocol = config.protocol ?? defaultProtocol;
  const className = config.className ?? "modal";

  const dialog = document.createElement("dialog");
  const frame = document.createElement("iframe");

  dialog.className = className;

  dialog.appendChild(frame);
  document.body.appendChild(dialog);

  return initCommandHandler({
    protocol,
    commands: {
      open: (params) => {
        const url = params.get("url");

        if (!url) {
          throw new Error("Missing required parameter: url");
        }

        dialog.showModal();
        frame.setAttribute("src", url);
      },

      close: () => {
        dialog.close(null);
        frame.removeAttribute("src");
      },
    },
  });
}
