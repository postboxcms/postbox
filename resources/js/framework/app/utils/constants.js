import { parseURL } from "./app";

const generateURL = (url, port) => {
    return port != 80 && process.env.APP_ENV === 'local' ? parseURL(`${url}:${port}`) : parseURL(url);
}

const getAPIURL = () => {
    return process.env.MIX_API_ROUTE !== undefined && parseURL(`${generateURL(process.env.MIX_APP_URL, process.env.MIX_APP_PORT)}/${process.env.MIX_API_ROUTE}`);
}

export const api = {
    adminPrefix: process.env.MIX_ADMIN_PREFIX,
    csrfToken: typeof document !== typeof undefined ? document.head.querySelector('meta[name="csrf-token"]').content : null,
    domain: process.env.MIX_APP_URL,
    loginUrl: process.env.MIX_LOGIN_URL,
    logoutUrl: process.env.MIX_LOGOUT_URL,
    url: getAPIURL(),
    token: process.env.MIX_API_TOKEN,
    editorToken: process.env.MIX_EDITOR_TOKEN,
};
export const cms = {
    adminPrefix: api.adminPrefix,
    csrfToken: api.csrfToken,
    domain: api.domain,
    loginUrl: api.loginUrl,
    logoutUrl: api.logoutUrl,
    url: parseURL(`${generateURL(process.env.MIX_APP_URL, process.env.MIX_APP_PORT)}/${process.env.MIX_CMS_ROUTE}`),
    token: api.token,
};

export const nav = {
    menuToken: process.env.MIX_MENU_TOKEN,
    userToken: process.env.MIX_USER_TOKEN,
    maxEntityLimit: 5
};
export const site = {
    name: process.env.MIX_APP_NAME,
    url: generateURL(process.env.MIX_APP_URL, process.env.MIX_APP_PORT),
    themeMessage: 'Theme content goes here ...',
    comingSoonMessage: 'Coming Soon!',
    loadingMessage: '...',
};
export const platform = {
    company: process.env.MIX_COMPANY_NAME,
    companyURL: process.env.MIX_COMPANY_URL,
    companyYear: process.env.MIX_COMPANY_YEAR
}