import auth from "../../utils/auth";
import { get, put } from "../../utils/localstorage";

window.finder = () => {
  return {
    items: [],
    path: [],
    search: "",
    owner: null,
    loading: true,

    async init() {
      this.path = this.getPathFromLocalStorage();
      this.owner = await auth.username();
      await this.update();
    },

    getPathFromLocalStorage() {
      return get("path", []);
    },

    putPathToLocalStorage(path) {
      put("path", path);
    },

    getRepo() {
      return this.path[0].name;
    },

    getPath() {
      return this.path.map(({ name }) => name).join("/");
    },

    getPathWithoutRepo() {
      return this.path
        .slice(1)
        .map(({ name }) => name)
        .join("/");
    },

    async fetchRepos() {
      return (
        await auth.oktokit().request("GET /user/repos", {
          per_page: 100,
          type: "owner",
        })
      )
        .sort((a, b) => a.name.localeCompare(b.name))
        .data.map(({ name }) => ({
          type: "repo",
          name,
        }));
    },

    async fetchDir() {
      const repo = this.getRepo();
      const path = this.getPathWithoutRepo();
      const url = `GET /repos/${this.owner}/${repo}/contents/${path}`;

      return (
        await auth.oktokit().request(url, {
          per_page: 100,
        })
      ).data
        .filter(
          ({ name, type }) =>
            type === "dir" ||
            (type === "file" && name.match(/(\.(md|markdown)$)/)),
        )
        .map(({ name, type }) => ({
          type: type === "dir" ? "dir" : "doc",
          name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort(({ type }) => (type === "dir" ? -1 : type === "doc" ? 1 : 0));
    },

    _items() {
      return this.items.filter(
        (item) =>
          !this.search ||
          item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1,
      );
    },

    async update() {
      this.items = [];
      this.search = "";
      this.loading = true;

      if (this.path.length === 0) {
        this.items = await this.fetchRepos();
      } else {
        this.items = await this.fetchDir();
      }

      this.loading = false;
    },

    async push(item) {
      this.path.push(item);
      this.putPathToLocalStorage(this.path);
      await this.update();
    },

    async select(item) {
      if (item.type === "repo" || item.type === "dir") {
        await this.push(item);
      } else {
        const params = new URLSearchParams({
          selected: [this.getPath(), item.name].join("/"),
        });
        window.location.href = `${this.$root.getAttribute("data-finder-url")}?${params}`;
      }
    },

    async navigate(path) {
      this.path = path;
      this.putPathToLocalStorage(this.path);
      await this.update();
    },
  };
};
