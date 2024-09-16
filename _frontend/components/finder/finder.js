import { Alpine } from "alpinejs";
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

    async fetchRepos(skipPages = 0, pagesLimit = 20) {
      const items = [];

      try {
        let page = 1;

        while (page <= pagesLimit) {
          if (page <= skipPages) {
            page++;

            continue;
          }

          const fetched = (
            await auth.request("GET /user/repos", {
              per_page: 100,
              type: "owner",
              page,
            })
          ).data
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(({ name }) => ({
              type: "repo",
              name,
            }));

          if (fetched.length === 0) {
            break;
          }

          items.push(...fetched);

          page++;
        }
      } catch (error) {}

      return items;
    },

    async fetchDir() {
      const repo = this.getRepo();
      const path = this.getPathWithoutRepo();
      const url = `GET /repos/${this.owner}/${repo}/contents/${path}`;

      try {
        return (
          await auth.request(url, {
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
      } catch (error) {}

      return [];
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
        this.items = await this.fetchRepos(0, 1);
      } else {
        this.items = await this.fetchDir();
      }

      this.loading = false;

      if (this.path.length === 0) {
        requestAnimationFrame(async () => {
          this.items = [
            ...Alpine.raw(this.items),
            ...(await this.fetchRepos(1)),
          ];
        });
      }
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
        const path = [this.getPath(), item.name].join("/");

        if (window.frameElement) {
          parent.postMessage(
            `reprose:open?${new URLSearchParams({
              path,
            })}`,
            "*",
          );
        } else {
          location.href = `/editor?${new URLSearchParams({
            path,
          })}`;
        }
      }
    },

    async navigate(path) {
      this.path = path;
      this.putPathToLocalStorage(this.path);
      await this.update();
    },
  };
};
