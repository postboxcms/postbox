import React from "react";
import LogoFull from "@root/art/logo-full.svg";
import LogoFullDark from "@root/art/logo-full-dark.svg";
import LogoIcon from "@root/art/logo.svg";

const Logo = (props) => {
    const { variant, mode, width } = props;

    return variant == "full" ? (
        mode == "dark" ? (
            <img {...props} src={LogoFullDark} alt="postbox-logo" width={width || "150px"} />
        ) : (
            <img {...props} src={LogoFull} alt="postbox-logo" width={width || "150px"} />
        )
    ) : (
        <img {...props} src={LogoIcon} alt="postbox-logo" width={width || "30px"} />
    );
};

export default Logo;
