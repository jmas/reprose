window.app = () => {
  return {
    init() {},

    login() {
      location.href = "/auth";
    },

    logout() {
      auth.clear();
      location.reload();
    },
  };
};
