import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, Typography } from "@mui/material";

import { useCSS, useSecureRoute, useNotifier } from "@app/hooks";
import {
    getWebsiteLogo,
    getWebsiteName,
    getWebsiteStatus,
    getWebsiteTitle,
    setWebsiteLogo,
    setWebsiteName,
    setWebsiteStatus,
    setWebsiteTitle,
} from "@modules/Settings/reducers/site";

import IOSSwitch from "@ui/elements/IOSSwitch";
import Title from "@ui/elements/Title";
import Input from "@ui/elements/Input";
import SaveButton from "@ui/elements/SaveButton";
import ImageUploader from "@ui/components/ImageUploader";
import Panel from "@ui/components/Panel";
import Form from "@ui/components/Form";

const Body = (props) => {
    const [title, setTitle] = React.useState("");
    const [name, setName] = React.useState("");
    const [isProductionReady, setIsProductionReady] = React.useState(false);
    const [image, setImage] = React.useState(null);

    const websiteLogo = useSelector(getWebsiteLogo);
    const websiteName = useSelector(getWebsiteName);
    const websiteTitle = useSelector(getWebsiteTitle);
    const websiteStatus = useSelector(getWebsiteStatus);
    const api = useSecureRoute();
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
            if (item.value) {
                data.append(item.property, item.value);
            }
        });
        // Handle form submission
        api.post("/settings", data)
            .then((response) => {
                const responseLogo = response?.data?.data?.file;
                dispatch(setWebsiteName(name));
                dispatch(setWebsiteTitle(title));
                dispatch(setWebsiteStatus(isProductionReady));
                if (responseLogo) {
                    dispatch(setWebsiteLogo(responseLogo));
                }
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
                <Title icon={pageIcon}>
                    {props["title"] ? props["title"] : props["name"]}
                </Title>
            </div>
            <Panel
                style={{ padding: "16px", margin: "auto" }}
                className={classes.panel}
            >
                <Form onSubmit={saveSettings}>
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
                            <Input
                                name="name"
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
                            <Input
                                name="title"
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
                                placeholder={"/uploads/settings/" + websiteLogo}
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
                            <SaveButton />
                        </Grid>
                    </Grid>
                </Form>
            </Panel>
        </React.Fragment>
    );
};

export default Body;
