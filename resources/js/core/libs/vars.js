export const api = {
    url       : process.env.MIX_API,
    csrfToken : document.head.querySelector('meta[name="csrf-token"]').content
};
