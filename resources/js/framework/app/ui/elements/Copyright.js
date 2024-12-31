import React from "react";
import { Typography, Link } from "@mui/material";
import { site } from "@app/utils/constants";

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link
                color="inherit"
                href="https://digitalbit.in"
                underline="hover"
            >
                {site.name}
            </Link>{" "}
            {new Date().getFullYear()}
            {/* {'.'} */}
        </Typography>
    );
}
