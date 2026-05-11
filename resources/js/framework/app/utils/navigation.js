import { api } from "@app/constants";
import { history } from "./history"

export const navigate = (url) => {
    history.push(api.adminPrefix + url);
}