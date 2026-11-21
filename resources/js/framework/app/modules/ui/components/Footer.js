import React from 'react';
import {useWebCSS} from '@ui/hooks/css';

export const Footer = ({prefix, suffix, linkText, linkURL}) => {
    const classes = useWebCSS();
    const Prefix = prefix || (() => null);
    const Suffix = suffix || (() => null);
    
    return (
        <p className="text-center text-sm text-slate-500">
            <Prefix /> {" "}
            <a className={`${classes.footerLink} hover:underline`} href={linkURL}>
                {linkText || 'Postbox'}
            </a>{" "}
            <Suffix />
        </p>
    );
}

export default Footer;