import { api } from "@app/constants";

export const routes = [
    {
        login: {
            path: api.adminPrefix + api.loginUrl,
            type: "protected",
            mode: "login"
        },
        logout: {
            path: api.adminPrefix + api.logoutUrl,
            type: "public",
            mode: "logout"
        }
    }
];

export default routes;