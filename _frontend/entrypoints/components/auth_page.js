console.log(import.meta.env);

window.auth_page = () => {
  return {
    logged: false,

    init() {
      this.logged = auth.check();
    },

    authUrl() {
      const params = new URLSearchParams({
        client_id: import.meta.env.VITE_GITHUB_AUTH_CLIENT_ID,
        scope: import.meta.env.VITE_GITHUB_AUTH_SCOPE,
        redirect_uri: window.location.href,
      });

      //

      return `${import.meta.env.VITE_GITHUB_SITE_URL}/login/oauth/authorize?${params}`;
    },
  };
};
