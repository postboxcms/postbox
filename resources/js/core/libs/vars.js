export const api = {
    url         :   process.env.MIX_API,
    adminPrefix :   process.env.MIX_ADMIN_PREFIX,
    csrfToken   :   document.head.querySelector('meta[name="csrf-token"]').content
};
