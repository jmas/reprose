import Alpine from "alpinejs";
import { Octokit } from "octokit";
import "./components/auth_page";

window.auth = {
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
};

window.Alpine = Alpine;

Alpine.start();

// Example: Import a stylesheet in <sourceCodeDir>/index.css
// import '~/index.css'
