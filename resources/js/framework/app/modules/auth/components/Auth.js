import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

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
import { useNotifier, useNavigation, useAuth } from "@app/hooks";
import { platform } from "@app/constants";

import Footer from "@ui/components/Footer";
import ClassicButton from "@ui/components/elements/ClassicButton";
import Logo from "@ui/components/elements/Logo";

import { loginUser, getUser } from "../reducers/user";

export const Auth = () => {
    const user = useSelector(getUser);
    const { token } = useAuth();
    const notify = useNotifier();
    const navigate = useNavigation();
    const dispatch = useDispatch();
    const randomWord = (Math.random() + 1).toString(36).substring(7);

    const doLogin = (event) => {
        event.preventDefault();
        const formdata = new FormData(event.currentTarget);
        const data = Object.fromEntries(formdata);
        const { email, password } = data;
        if (!isEmpty(email) && !isEmpty(password)) {
            try {
                dispatch(loginUser(data));
            } catch (e) {
                const message = e?.response?.data.message;
                notify(
                    message === undefined ? "Something went wrong" : message,
                    "error"
                );
            }
        } else {
            notify('Please provide your email and password', 'error');
        }
    };

    React.useEffect(() => {
        if (user && token) {
            navigate("/");
        }
    },[user,token]);

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
                        <Logo width="80" style={{ marginBottom: 10 }} />
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
                            <ClassicButton
                                icon="fa-sign-in-alt"
                                type="submit"
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </ClassicButton>
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
                                    prefix={() => <>Copyright &copy; </>}
                                    suffix={() => " " + new Date().getFullYear()}
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
