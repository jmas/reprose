import { Octokit } from "octokit";

export default {
  set(auth) {
    localStorage["auth"] = JSON.stringify(auth);
  },

  get() {
    return JSON.parse(localStorage["auth"] ?? "null");
  },

  clear() {
    delete localStorage["auth"];
  },

  oktokit() {
    return new Octokit({
      auth: this.get().access_token,
    });
  },

  check() {
    return Boolean(this.get());
  },

  async user() {
    return (await this.oktokit().request("GET /user")).data;
  },

  async username() {
    return (await this.user()).login;
  },
};
