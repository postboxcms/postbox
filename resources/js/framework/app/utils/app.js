export const parseURL = (str) => {
    return str.replace(/([^:]\/)\/+/g, "$1")
}