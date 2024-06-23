import { api } from "./constants";
import { history } from "./history"

export const navigate = (url) => {
    history.push(api.adminPrefix + '/' + url);
}