window.header = () => ({
  login() {
    window.location.href = "/auth";
  },

  logout() {
    auth.clear();
    window.location.reload();
  },
});
