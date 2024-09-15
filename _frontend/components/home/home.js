import auth from "../../utils/auth";

window.home = () => ({
  init() {
    if (auth.check()) {
      window.location.href = "/finder";
    }
  },

  login() {
    window.location.href = "/auth";
  },

  logout() {
    auth.clear();
    window.location.reload();
  },
});
