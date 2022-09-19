export const api = {
    url         :   process.env.MIX_API,
    admin_prefix:   '/admin',
    csrfToken   :   document.head.querySelector('meta[name="csrf-token"]').content
};
