import auth from "../../utils/auth";
import { decode, encode } from "js-base64";
import fm from "front-matter";
import { stringify } from "yaml";
import { Alpine } from "alpinejs";
import { init as initCommandHandler } from "../../utils/commands-handler";
import protocol from "../../protocol";
import { getKvData } from "../../utils/form-kvdata";

window.editor = () => ({
  editor: null,
  owner: null,
  path: null,
  sha: null,
  saving: false,
  loading: true,
  filename: "",
  attributes: {},
  body: "",
  config: {},

  async init() {
    const EasyMDE = (await import("easymde")).default;

    this.owner = await auth.username();

    this.path = this.getPathFromLocation();

    this.config = await auth.config(this.owner, this.getRepo());

    this.filename = this.getFilenameFromPath();

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

        delete: () => {
          this.delete();
        },
      },
    });
  },

  destroy() {
    this.editor.toTextArea();
  },

  async delete() {
    if (this.isNotExists()) {
      alert(`Can't delete file because it doesn't exists`);
      return;
    }

    if (
      confirm(
        `You are about to delete ${this.getFilenameFromPath()}. Are you sure?`,
      )
    ) {
      this.loading = true;

      await auth.deleteContents(
        this.owner,
        this.getRepo(),
        this.getPath(true),
        `Delete \`${this.getFilenameFromPath()}\` via Reprose`,
        this.sha,
      );

      this.loading = false;

      location.href = "/finder";
    }
  },

  getPathFromLocation() {
    return new URL(window.location.href).searchParams.get("path");
  },

  getRepo() {
    const _path = this.path.split("/");
    return _path[0] ?? null;
  },

  getPath(withoutRepo = false, withoutFile = false) {
    let _path = this.path.split("/").filter((segment) => segment.trim() !== "");

    if (withoutRepo) {
      _path = _path.slice(1);
    }

    if (withoutFile) {
      _path = _path.slice(0, -1);
    }

    return _path.join("/");
  },

  getFilenameFromPath() {
    if (!this.isPathWithFile()) {
      return null;
    }

    const _path = this.path.split("/");
    return _path.slice(_path.length - 1, _path.length);
  },

  isPathWithFile() {
    return !this.path.endsWith("/");
  },

  isNotExists() {
    return this.sha === null;
  },

  updateAttributes() {
    const attributes = this.config.formatAttributes(
      getKvData(this.$root, "attributes"),
    );

    this.attributes = attributes;

    this.updateAutosize();
  },

  updateAutosize() {
    requestAnimationFrame(() => {
      Array.from(this.$root.querySelectorAll("[x-autosize]")).forEach(
        (element) => {
          element.dispatchEvent(new CustomEvent("autosize"));
        },
      );
    });
  },

  fields() {
    return this.config.getAttributesFields(Alpine.raw(this.attributes));
  },

  addAttribute() {
    this.attributes = {
      ...this.attributes,
      "": "",
    };
  },

  async load() {
    this.loading = true;

    if (this.isPathWithFile()) {
      const { content, sha } = await auth.fetchContents(
        this.owner,
        this.getRepo(),
        this.getPath(true),
      );

      const { attributes, body } = fm(decode(content));

      this.attributes = this.config.formatAttributes(attributes);
      this.body = body;
      this.sha = sha;
    } else {
      this.attributes = this.config.getDefaultAttributes();
    }

    this.loading = false;
  },

  async save() {
    this.saving = true;

    const attributes = this.config.formatAttributes(
      Alpine.raw(this.attributes),
      true,
      true,
    );

    const body = Alpine.raw(this.body);

    const content = [
      Object.entries(attributes).length > 0
        ? `---\n${stringify(attributes).trim()}\n---`
        : null,
      body.length > 0 ? `${body.trim()}` : null,
    ]
      .filter((item) => item !== null)
      .join("\n");

    const path = [
      this.getPath(true, this.isPathWithFile()),
      this.filename,
    ].join("/");

    const {
      content: { sha, name, path: _path },
    } = await auth.putContents(
      this.owner,
      this.getRepo(),
      path,
      `${this.isNotExists() ? "Create" : "Update"} \`${this.filename}\` via Reprose`,
      encode(content),
      this.sha,
    );

    if (this.isNotExists() && this.getFilenameFromPath() !== this.filename) {
      await auth.deleteContents(
        this.owner,
        this.getRepo(),
        this.getPath(true),
        `[skip ci] Delete \`${this.getFilenameFromPath()}\` because name of file was changed to \`${this.filename}\` via Reprose`,
        this.sha,
      );
    }

    this.sha = sha;
    this.filename = name;
    this.path = [this.getRepo(), _path].join("/");

    this.saving = false;
  },
});
