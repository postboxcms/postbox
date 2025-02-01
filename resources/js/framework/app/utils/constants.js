import { parseURL } from "./app";

const generateURL = (url, port) => {
    return port != 80 && process.env.APP_ENV === 'local' ? parseURL(`${url}:${port}`) : parseURL(url);
}

export const api = {
    adminPrefix: process.env.MIX_ADMIN_PREFIX,
    csrfToken: document.head.querySelector('meta[name="csrf-token"]').content,
    domain: process.env.MIX_APP_URL,
    loginUrl: process.env.MIX_LOGIN_URL,
    logoutUrl: process.env.MIX_LOGOUT_URL,
    url: parseURL(`${generateURL(process.env.MIX_APP_URL, process.env.MIX_APP_PORT)}/${process.env.MIX_API_ROUTE}`),
    token: process.env.MIX_API_TOKEN,
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
    comingSoonMessage: 'The website will be launching soon ...'
};
export const platform = {
    company: process.env.MIX_COMPANY_NAME,
    companyURL: process.env.MIX_COMPANY_URL,
    companyYear: process.env.MIX_COMPANY_YEAR
}