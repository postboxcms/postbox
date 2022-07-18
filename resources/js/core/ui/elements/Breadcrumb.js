import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { ElementCSS } from './element.css';

export default function Breadcrumb(props) {
    const classes = ElementCSS();

    return (
        <Breadcrumbs separator=">" aria-label="breadcrumb" className={classes.breadcrumb}>
            <Link
                color="inherit"
                href="/"
                className={classes.breadcrumbText}
                underline="hover">
                <HomeIcon className={classes.icon}/>
                Dashboard
            </Link>
            <Typography className={classes.breadcrumbText}>
                {props.title}
            </Typography>
        </Breadcrumbs>
    );
}
