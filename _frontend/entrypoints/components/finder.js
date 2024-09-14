import auth from "../utils/auth";
import icons from "../utils/icons";

window.finder = () => {
  return {
    items: [],
    path: [],
    search: "",
    username: null,
    loading: false,

    async init() {
      await this.fetchUsername();
      await this.update();
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

    async fetchUsername() {
      this.username = (await auth.user()).login;
    },

    async fetchRepos() {
      return (
        await auth.oktokit().request("GET /user/repos", {
          per_page: 100,
        })
      ).data.map(({ name }) => ({
        type: "repo",
        icon: icons.repo,
        name,
      }));
    },

    async fetchDir() {
      const repo = this.getRepo();
      const path = this.getPathWithoutRepo();
      const url = `GET /repos/${this.username}/${repo}/contents/${path}`;

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
          icon: type === "dir" ? icons.dir : icons.doc,
          name,
        }))
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
  };
};
