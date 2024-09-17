import auth from "../../utils/auth";
import { decode, encode } from "js-base64";
import fm from "front-matter";
import { stringify } from "yaml";
import { Alpine } from "alpinejs";
import { init as initCommandHandler } from "../../utils/commands-handler";
import protocol from "../../protocol";
import { get, put } from "../../utils/localstorage";
import { getKvData } from "../../utils/form-kvdata";

window.editor = () => ({
  editor: null,
  owner: null,
  path: null,
  sha: null,
  settingsDisplaying: get("settingsDisplaying", false),
  saving: false,
  loading: false,
  attributes: {
    title: "",
    description: "",
  },
  body: "",

  async init() {
    const EasyMDE = (await import("easymde")).default;

    this.owner = await auth.username();

    this.path = this.getPathFromLocation();

    if (this.path) {
      await this.load();
    }

    this.editor = new EasyMDE({
      element: this.$refs.input,
      spellChecker: false,
      initialValue: Alpine.raw(this.body),
      placeholder: "Start writing…",
    });

    this.editor.codemirror.on("change", () => {
      this.body = this.editor.value();
    });

    initCommandHandler({
      protocol,
      commands: {
        browse: () => {
          parent.postMessage(
            `modal:open?${new URLSearchParams({ url: "/finder" })}`,
            "*",
          );
        },

        open: (params) => {
          location.href = `/editor?${new URLSearchParams({
            path: params.get("path"),
          })}`;
        },
      },
    });
  },

  destroy() {
    this.editor.toTextArea();
  },

  getPathFromLocation() {
    return new URL(window.location.href).searchParams.get("path");
  },

  getRepo() {
    const _path = this.path.split("/");
    return _path[0] ?? null;
  },

  getPathWithoutRepo() {
    const _path = this.path.split("/");
    return _path.slice(1).join("/");
  },

  getFilename() {
    const _path = this.path.split("/");
    return _path.slice(_path.length - 1, _path.length);
  },

  updateAttributes() {
    const attributes = getKvData(
      document.getElementById("editor-form"),
      "attributes",
    );

    this.attributes = {
      title: this.attributes.title,
      ...attributes,
    };
  },

  attributesEntries() {
    return Object.entries(this.attributes).sort(([keyA], [keyB]) =>
      keyA === "" || keyB === "" ? 1 : keyA.localeCompare(keyB),
    );
  },

  addAttribute() {
    this.attributes = {
      ...this.attributes,
      "": "",
    };
  },

  toggleSettings() {
    this.settingsDisplaying = !this.settingsDisplaying;
    put("settingsDisplaying", this.settingsDisplaying);
  },

  async load() {
    this.loading = true;

    const { content, sha } = await this.fetchContents();
    const { attributes, body } = fm(decode(content));

    this.attributes = {
      description: "",
      ...attributes,
    };
    this.body = body;
    this.sha = sha;

    this.loading = false;
  },

  async save() {
    this.saving = true;

    const { content } = await this.putContents();
    const { sha } = content;

    this.sha = sha;

    this.saving = false;
  },

  async fetchContents() {
    return (
      await auth.request("GET /repos/{owner}/{repo}/contents/{path}", {
        owner: this.owner,
        repo: this.getRepo(),
        path: this.getPathWithoutRepo(),
      })
    ).data;
  },

  async putContents() {
    const attributes = Alpine.raw(this.attributes);
    const body = Alpine.raw(this.body);

    const content = [
      Object.entries(attributes).length > 0
        ? `---\n${stringify(attributes).trim()}\n---`
        : null,
      body.length > 0 ? `${body.trim()}` : null,
    ]
      .filter((item) => item !== null)
      .join("\n");

    return (
      await auth.request("PUT /repos/{owner}/{repo}/contents/{path}", {
        owner: this.owner,
        repo: this.getRepo(),
        path: this.getPathWithoutRepo(),
        message: `Update ${this.getFilename()} via Reprose`,
        sha: this.sha ?? undefined,
        content: encode(content),
      })
    ).data;
  },
});
