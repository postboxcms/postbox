export const api = {
    adminPrefix :   process.env.MIX_ADMIN_PREFIX,
    csrfToken   :   document.head.querySelector('meta[name="csrf-token"]').content,
    domain      :   process.env.MIX_APP_URL,
    loginUrl    :   "/login",
    url         :   process.env.MIX_API,
};
