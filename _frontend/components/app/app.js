window.app = () => {
  return {
    init() {
      window.addEventListener("message", (event) => {
        console.log("message ", event.data);
      });
    },

    login() {
      window.location.href = "/auth";
    },

    logout() {
      auth.clear();
      window.location.reload();
    },
  };
};
