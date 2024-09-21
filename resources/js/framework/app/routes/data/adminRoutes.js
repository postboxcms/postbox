import Dashboard from "../../modules/Dashboard";
import CRUD from "../../modules/CRUD";
import Settings from "../../modules/Settings";
import { api } from "../../utils/constants";

const routes = [
    {
        dashboard: {
            path: api.adminPrefix + "/",
            title: "",
            icon: "",
            controller: Dashboard,
        },
        crud: {
            path: api.adminPrefix + "/crud",
            title: "CRUD",
            icon: "layer-group",
            controller: CRUD
        },
        settings: {
            path: api.adminPrefix + "/settings",
            title: "Settings",
            icon: "layer-group",
            controller: Settings
        }
    },
];

export default routes;
