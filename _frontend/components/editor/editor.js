import auth from "../../utils/auth";
import { decode, encode } from "js-base64";
import fm from "front-matter";
import { stringify } from "yaml";
import { Alpine } from "alpinejs";
import { init as initCommandHandler } from "../../utils/commands-handler";
import protocol from "../../protocol";

window.editor = () => ({
  editor: null,
  owner: null,
  path: null,
  sha: null,
  settingsDisplayed: false,
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

  getBody() {
    return this.editor.value();
  },

  getAttributes() {
    const data = new FormData(this.$root);
    const keys = data.getAll("attributes[key][]");
    const values = data.getAll("attributes[value][]");

    const attributes = keys.reduce((keyValues, key, index) => {
      keyValues[key] = values[index];

      return keyValues;
    }, {});

    return {
      ...attributes,
      title: this.attributes.title,
    };
  },

  toggleSettings() {
    this.settingsDisplayed = !this.settingsDisplayed;
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
    const url = `GET /repos/${this.owner}/${this.getRepo()}/contents/${this.getPathWithoutRepo()}`;

    return (await auth.request(url)).data;
  },

  async putContents() {
    const url = `PUT /repos/${this.owner}/${this.getRepo()}/contents/${this.getPathWithoutRepo()}`;

    const content = `---\n${stringify(this.getAttributes()).trim()}\n---\n${this.getBody().trim()}`;

    return (
      await auth.request(url, {
        message: `Update ${this.getFilename()} via Reprose`,
        sha: this.sha ?? undefined,
        content: encode(content),
      })
    ).data;
  },
});
