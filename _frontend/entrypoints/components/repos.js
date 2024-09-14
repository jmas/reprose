import auth from "../utils/auth";

window.repos = () => {
  return {
    items: [],

    async init() {
      this.items = await this.list();
    },

    async list() {
      return await auth.oktokit().request("GET /user/repos");
    },
  };
};
