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
    try {
      return await (await this.oktokit()).request(...args);
    } catch (error) {
      if (error.status === 401) {
        this.clear();
        location.refresh();

        // handle Octokit error
        // see https://github.com/octokit/request-error.js
      } else {
        // handle all other errors
        throw error;
      }
    }
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
      await this.request(`GET /repos/{owner}/{repo}/contents/${path}`, {
        owner,
        repo,
      })
    ).data;
  },

  async putContents(owner, repo, path, message, content, sha = undefined) {
    return (
      await this.request(`PUT /repos/{owner}/{repo}/contents/${path}`, {
        owner,
        repo,
        message,
        sha,
        content,
      })
    ).data;
  },

  async deleteContents(owner, repo, path, message, sha) {
    return (
      await this.request(`DELETE /repos/{owner}/{repo}/contents/${path}`, {
        owner,
        repo,
        message,
        sha,
      })
    ).data;
  },

  async checkRuns(owner, repo) {
    return (
      await this.request("GET /repos/{owner}/{repo}/commits/main/check-runs", {
        owner,
        repo,
      })
    ).data;
  },

  async config(owner, repo) {
    let content = "";

    try {
      content = decode(
        (await this.fetchContents(owner, repo, ".reproserc.yaml")).content,
      );
    } catch (error) {}

    return configFns(content);
  },
};
