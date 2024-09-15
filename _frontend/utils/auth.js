import { Octokit } from "octokit";
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
