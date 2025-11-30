export const parseURL = (str) => {
    return str?.replace(/([^:]\/)\/+/g, "$1")
}

export const fetchKeys = (obj) => {
    return Object.keys(obj);
}

export const fetchValues = (obj) => {
    return Object.values(obj);
}

export const fetchEntries = (obj) => {
    return Object.entries(obj);
}

export const pushToObject = (obj,data) => {
    return Object.assign(obj,data);
}