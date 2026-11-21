import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

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
    }, [user, token]);

    return (
        <main className="flex min-h-screen bg-slate-50">
            <div
                aria-hidden="true"
                className="hidden flex-1 bg-cover bg-center sm:block"
                style={{
                    backgroundImage: `url(https://picsum.photos/seed/${randomWord}/1920/1080)`,
                }}
            />
            <section className="auth-screen flex w-full flex-col justify-center bg-white px-6 py-10 shadow-xl sm:w-2/3 sm:px-12 md:w-5/12">
                <div className="mx-auto flex w-full max-w-sm flex-col items-center">
                    <Logo width="80" style={{ marginBottom: 10 }} />
                    <h1 className="mb-6 text-2xl font-semibold text-slate-900">Sign in</h1>
                    <form noValidate onSubmit={doLogin} className="w-full space-y-3">
                        <input
                            className="app-primary-focus w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:ring-2"
                            required
                            id="email"
                            placeholder="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            type="email"
                        />
                        <input
                            className="app-primary-focus w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:ring-2"
                            required
                            name="password"
                            placeholder="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <label className="flex items-center gap-2 text-sm text-slate-600">
                            <input type="checkbox" value="remember" className="app-primary-checkbox h-4 w-4" />
                            Remember me
                        </label>
                        <ClassicButton
                            icon="fa-sign-in-alt"
                            type="submit"
                            fullWidth
                            className="mt-4"
                        >
                            Sign In
                        </ClassicButton>
                        <div className="pt-8">
                            <Footer
                                prefix={() => <>Copyright &copy; </>}
                                suffix={() => " " + new Date().getFullYear()}
                                linkText={platform.company}
                                linkURL={platform.companyURL}
                            />
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Auth;
