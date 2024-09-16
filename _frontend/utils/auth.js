import { del, get, put } from "./localstorage";

export default {
  set(auth) {
    put("auth", auth);
  },

  get() {
    return get("auth");
  },

  clear() {
    del("auth");
  },

  async oktokit() {
    const Octokit = (await import("octokit")).Octokit;

    return new Octokit({
      auth: this.get().access_token,
    });
  },

  async request(...args) {
    return await (await this.oktokit()).request(...args);
  },

  check() {
    return Boolean(this.get());
  },

  async user() {
    return (await this.request("GET /user")).data;
  },

  async username() {
    return (await this.user()).login;
  },
};
