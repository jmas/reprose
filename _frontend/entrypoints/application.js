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

  authUrl() {
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GITHUB_APP_CLIENT_ID,
      scope: import.meta.env.VITE_GITHUB_AUTH_SCOPE,
      redirect_uri: import.meta.env.VITE_AUTH_CALLBACK_URL,
    });

    return `${import.meta.env.VITE_GITHUB_SITE_URL}/login/oauth/authorize?${params}`;
  },
};

window.Alpine = Alpine;

Alpine.start();

// Example: Import a stylesheet in <sourceCodeDir>/index.css
// import '~/index.css'
