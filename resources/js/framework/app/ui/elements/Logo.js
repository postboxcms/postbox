import React from "react";
import LogoFull from '@root/art/logo-full.svg';
import LogoIcon from '@root/art/logo.svg';

const Logo = (props) => {
    const {variant} = props;

    return variant == "full" ? (
        <img {...props} src={LogoFull} alt="postbox-logo" width={"150px"} />
    ): (
        <img {...props} src={LogoIcon} alt="postbox-logo" width={"30px"} />
    );
}

export default Logo;