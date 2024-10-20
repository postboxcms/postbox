import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCSS } from "../../../hooks/css";
import Title from "../../../ui/elements/Title";
import { Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import { useAuthentication } from "../../../hooks/auth";
import { useNotifier } from "../../../hooks/notifications";
import { IOSSwitch } from "../../../utils/elements";

const Body = (props) => {
    const [websiteTitle, setWebsiteTitle] = React.useState('');
    const [websiteName, setWebsiteName] = React.useState('');
    const [isProductionReady, setIsProductionReady] = React.useState(false);
    const auth = useAuthentication();
    const notify = useNotifier();

    const saveSettings = (event) => {
        event.preventDefault();
        const data = [{
            property: 'name',
            value: websiteName
        },
        {
            property: 'title',
            value: websiteTitle
        },
        {
            property: 'isProductionReady',
            value: isProductionReady
        }];
        // Handle form submission
        auth.post("/Settings", data).then((response) =>
            notify(response.data.message)
        );
    };

    const classes = useCSS();
    const pageIcon = 'gear';

    return (
        <React.Fragment>
            <div className={`${classes.heading} ${classes.header}`}>
                <Title className={classes.title}>
                    <FontAwesomeIcon size="lg" icon={pageIcon} />{" "}
                    {props["title"] ? props["title"] : props["name"]}
                </Title>
            </div>
            <Paper style={{ padding: '16px', margin: 'auto' }} className={classes.panel}>
                <form onSubmit={saveSettings}>
                    <Grid container spacing={2} maxWidth="600px">
                        {/* Column for labels */}
                        <Grid item xs={12} sm={6} container justifyContent="flex-end" alignItems="center">
                            <Typography variant="body1" align="right">Website Name</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="website_name"
                                variant="outlined"
                                fullWidth
                                value={websiteName}
                                onChange={(e) => setWebsiteName(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} container justifyContent="flex-end" alignItems="center">
                            <Typography variant="body1" align="right">Website Title</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={websiteTitle}
                                onChange={(e) => setWebsiteTitle(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} container justifyContent="flex-end" alignItems="center">
                            <Typography variant="body1" align="right">Is Production Ready</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <IOSSwitch checked={isProductionReady} onChange={(e) => setIsProductionReady(e.target.checked)} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ marginTop: '1px' }} maxWidth="600px">
                        <Grid item xs={12} sm={6} container justifyContent="flex-end" alignItems="center">
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </React.Fragment>
    );
}

export default Body;