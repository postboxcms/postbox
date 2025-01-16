import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { admin } from "@app/init/theme";
import { api } from "@app/utils/constants";
import { useSecureRoute, useNotifier, useNavigation } from "@app/hooks";
import { platform } from "@app/utils/constants";

import Footer from "@ui/components/Footer";
import PrimaryButton from "@ui/elements/PrimaryButton";
import Logo from "@ui/elements/Logo";

import {
    setToken,
    setUser,
    unsetToken,
    getToken,
    unsetUser,
    getUser,
} from "./reducers/jwt";
import { Icon } from "@mui/material";

const Auth = (props) => {
    // const history = useHistory();
    const auth = useSecureRoute();
    const token = useSelector(getToken);
    const user = useSelector(getUser);
    const notify = useNotifier();
    const dispatch = useDispatch();
    const navigate = useNavigation();
    const randomWord = (Math.random() + 1).toString(36).substring(7);

    const doLogin = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        axios
            .post(api.url + "/login", data)
            .then((response) => {
                const token = response.data.token;
                const user = response.data.user;
                dispatch(setToken(token));
                dispatch(setUser(user));
                navigate("/");
                notify("Login successful");
            })
            .catch((error) => {
                const message = error?.response?.data.message;
                notify(
                    message === undefined ? "Something went wrong" : message,
                    "error"
                );
            });
    };

    React.useEffect(() => {
        if (props.mode == "logout") {
            auth.post("/logout", {}).then(() => {
                dispatch(unsetToken(token));
                dispatch(unsetUser(user));
                navigate(api.loginUrl);
            });
        }
    }, [props.mode]);

    return (
        <ThemeProvider theme={admin}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            "url(https://picsum.photos/seed/" +
                            randomWord +
                            "/1920/1080)",
                        // backgroundImage: 'url('+process.env.MIX_APP_URL+'/background.jpg)',
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid
                    className="auth-screen"
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        {/* <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar> */}
                        <Logo width="80" style={{marginBottom: 10}} />
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={doLogin}
                            sx={{ mt: 1 }}
                        >
                            <OutlinedInput
                                margin="dense"
                                required
                                fullWidth
                                id="email"
                                placeholder="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <OutlinedInput
                                margin="dense"
                                required
                                fullWidth
                                name="password"
                                placeholder="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <PrimaryButton
                                icon="fa-sign-in-alt"
                                type="submit"
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </PrimaryButton>
                            {/* <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid> */}
                            <Box pt={4}>
                                <Footer
                                    prefix={"Copyright \xA9"}
                                    suffix={" " + new Date().getFullYear()}
                                    linkText={platform.company}
                                    linkURL={platform.companyURL}
                                    sx={{ mt: 5 }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default Auth;
