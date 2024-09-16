import auth from "../../utils/auth";

window.home = () => ({
  init() {
    if (auth.check()) {
      location.href = "/finder";
    }
  },

  login() {
    location.href = "/auth";
  },

  logout() {
    auth.clear();
    location.reload();
  },
});
