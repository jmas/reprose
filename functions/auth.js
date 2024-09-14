export async function onRequest({ request, env }) {
  const code = new URL(request.url).searchParams.get("code");

  if (!code) {
    const params = new URLSearchParams({
      client_id: env.GITHUB_APP_CLIENT_ID,
      scope: env.GITHUB_AUTH_SCOPE,
      redirect_uri: env.REDIRECT_URI,
    });

    return Response.redirect(
      `${env.GITHUB_SITE_URL}/login/oauth/authorize?${params}`,
      301,
    );
  }

  try {
    const params = new URLSearchParams({
      client_id: env.GITHUB_APP_CLIENT_ID,
      client_secret: env.GITHUB_APP_CLIENT_SECRET,
      redirect_uri: env.REDIRECT_URI,
      code,
    });

    const response = await fetch(
      `${env.GITHUB_SITE_URL}/login/oauth/access_token?${params}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
        },
      },
    );

    const data = await response.json();

    return new Response(
      `<script>localStorage['auth'] = JSON.parse(${JSON.stringify(data)}); location.href = '${env.HOME_URL}';</script>`,
      {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      },
    );
  } catch (error) {
    return new Response(String(error));
  }
}
