import React from "react";
import { Typography, Link } from "@mui/material";
import { platform } from "@app/utils/constants";

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Crafting with "} &#10084; {" at "}
            <Link
                color="inherit"
                href={platform.companyURL}
                underline="none"
                fontWeight={"bold"}
            >
                {platform.company}
            </Link>{" since "}
            {platform.companyYear}
            {/* {'.'} */}
        </Typography>
    );
}
