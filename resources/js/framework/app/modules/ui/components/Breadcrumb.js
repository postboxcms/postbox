import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { useWebCSS } from '@ui/hooks/css';

export default function Breadcrumb(props) {
    const classes = useWebCSS();

    return (
        <Breadcrumbs separator="/" aria-label="breadcrumb" className={classes.breadcrumb}>
            <Link
                color="inherit"
                href="/"
                className={classes.breadcrumbText}>
                <HomeIcon className={classes.icon} />
                Dashboard
            </Link>
            {props.title ? (
                <Typography className={classes.breadcrumbText}>
                    {props.title}
                </Typography>
            ) : ""
            }
        </Breadcrumbs>
    );
}
