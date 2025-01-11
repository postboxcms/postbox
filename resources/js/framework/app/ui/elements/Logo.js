import React from "react";
import LogoFull from "@root/art/logo-full.svg";
import LogoFullDark from "@root/art/logo-full-dark.svg";
import LogoIcon from "@root/art/logo.svg";

const Logo = (props) => {
    const { variant, mode } = props;

    return variant == "full" ? (
        mode == "dark" ? (
            <img {...props} src={LogoFullDark} alt="postbox-logo" width={"150px"} />
        ) : (
            <img {...props} src={LogoFull} alt="postbox-logo" width={"150px"} />
        )
    ) : (
        <img {...props} src={LogoIcon} alt="postbox-logo" width={"30px"} />
    );
};

export default Logo;
