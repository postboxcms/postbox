export const ucfirst = (str) => {
    if (typeof str !== 'string' || str.length === 0) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const singularize = (str) => {
    if (typeof str !== 'string' || str.length === 0) {
        return str;
    }
    if (str.endsWith('s')) {
        return str.slice(0, -1);
    }
    return str;
}