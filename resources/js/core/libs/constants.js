export const api = {
    adminPrefix: process.env.MIX_ADMIN_PREFIX,
    csrfToken: document.head.querySelector('meta[name="csrf-token"]').content,
    domain: process.env.MIX_APP_URL,
    loginUrl: process.env.MIX_LOGIN_URL,
    logoutUrl: process.env.MIX_LOGOUT_URL,
    url: process.env.MIX_API,
    token: process.env.MIX_API_TOKEN,
    menuToken: process.env.MIX_MENU_TOKEN,
    userToken: process.env.MIX_USER_TOKEN,
};
