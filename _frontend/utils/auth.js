import { decode } from "js-base64";
import { configFns } from "./config-fns";
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

  async fetchContents(owner, repo, path) {
    return (
      await this.request("GET /repos/{owner}/{repo}/contents/{path}", {
        owner,
        repo,
        path,
      })
    ).data;
  },

  async putContents(owner, repo, path, content, message, sha = undefined) {
    return (
      await this.request("PUT /repos/{owner}/{repo}/contents/{path}", {
        owner,
        repo,
        path,
        message,
        sha,
        content,
      })
    ).data;
  },

  async config(owner, repo) {
    let content = "";

    try {
      content = decode(
        (await this.fetchContents(owner, repo, ".reproserc.yaml")).content,
      );
    } catch (error) {
      console.log(error);
    }

    return configFns(content);
  },
};
