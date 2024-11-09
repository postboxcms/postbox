import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCSS } from "../../../hooks/css";
import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useAuthentication } from "../../../hooks/auth";
import { useNotifier } from "../../../hooks/notifications";
import { IOSSwitch } from "../../../utils/elements";
import {
    getWebsiteLogo,
    getWebsiteName,
    getWebsiteStatus,
    getWebsiteTitle,
    setWebsiteLogo,
    setWebsiteName,
    setWebsiteStatus,
    setWebsiteTitle,
} from "../reducers/site";
import ImageUploader from "../../../ui/elements/ImageUploader";
import Title from "../../../ui/elements/Title";

const Body = (props) => {
    const [title, setTitle] = React.useState("");
    const [name, setName] = React.useState("");
    const [isProductionReady, setIsProductionReady] = React.useState(false);
    const [image, setImage] = React.useState([]);

    const websiteLogo = useSelector(getWebsiteLogo);
    const websiteName = useSelector(getWebsiteName);
    const websiteTitle = useSelector(getWebsiteTitle);
    const websiteStatus = useSelector(getWebsiteStatus);
    const auth = useAuthentication();
    const notify = useNotifier();
    const dispatch = useDispatch();
    const classes = useCSS();
    const pageIcon = "gear";

    const saveSettings = (event) => {
        event.preventDefault();
        const data = new FormData();
        const settings = [
            {
                property: "name",
                value: name,
                type: "string",
            },
            {
                property: "title",
                value: title,
                type: "string",
            },
            {
                property: "isProductionReady",
                value: Number(isProductionReady),
                type: "string",
            },
            {
                property: "siteLogo",
                value: image,
                type: "file",
            },
        ];
        settings.forEach((item) => {
            if (item.type === "file" && item.value.length > 0) {
                data.append(item.property, item.value, item.value.name);
            } else {
                data.append(item.property, item.value);
            }
        });
        // Handle form submission
        auth.post("/Settings", data)
            .then((response) => {
                dispatch(setWebsiteName(name));
                dispatch(setWebsiteTitle(title));
                dispatch(setWebsiteStatus(isProductionReady));
                dispatch(setWebsiteStatus(isProductionReady));
                dispatch(setWebsiteLogo(response?.data?.file));
                notify(response.data.message);
            })
            .catch((error) => notify(error, "error"));
    };

    React.useEffect(() => {
        setName(websiteName);
        setTitle(websiteTitle);
        setIsProductionReady(websiteStatus);
    }, []);

    return (
        <React.Fragment>
            <div className={`${classes.heading} ${classes.header}`}>
                <Title className={classes.title}>
                    <FontAwesomeIcon size="lg" icon={pageIcon} />{" "}
                    {props["title"] ? props["title"] : props["name"]}
                </Title>
            </div>
            <Paper
                style={{ padding: "16px", margin: "auto" }}
                className={classes.panel}
            >
                <form onSubmit={saveSettings}>
                    <Grid container spacing={2} maxWidth="600px">
                        {/* Column for labels */}
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            container
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <Typography variant="body1" align="right">
                                Website Name
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="name"
                                variant="outlined"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            container
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <Typography variant="body1" align="right">
                                Website Title
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="title"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={6}
                            container
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <Typography variant="body1" align="right">
                                Is Production Ready
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <IOSSwitch
                                checked={isProductionReady}
                                onChange={(e) =>
                                    setIsProductionReady(e.target.checked)
                                }
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={6}
                            container
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <Typography variant="body1" align="right">
                                Site logo
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ImageUploader
                                placeholder={websiteLogo}
                                uploadImage={(file) => setImage(file)}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={2}
                        style={{ marginTop: "1px" }}
                        maxWidth="600px"
                    >
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            container
                            justifyContent="flex-end"
                            alignItems="center"
                        ></Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </React.Fragment>
    );
};

export default Body;
