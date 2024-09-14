export async function onRequest({ request }) {
  const code = request.url.get("code");

  const response = await fetch(
    `${env.GITHUB_SITE_URL}/login/oauth/access_token`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_APP_CLIENT_ID,
        client_secret: env.GITHUB_APP_CLIENT_SECRET,
        redirect_uri: env.REDIRECT_URI,
        code,
      }),
    },
  );

  return Response.json(await response.json());
}
