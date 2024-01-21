import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { useCSS } from '../../hooks/css';

export default function Breadcrumb(props) {
    const classes = useCSS();

    return (
        <Breadcrumbs separator="/" aria-label="breadcrumb" className={classes.breadcrumb}>
            <Link
                color="inherit"
                href="/"
                className={classes.breadcrumbText}
                underline="hover">
                <HomeIcon className={classes.icon}/>
                Dashboard
            </Link>
            {props.title?(
                <Typography className={classes.breadcrumbText}>
                    {props.title}
                </Typography>
            ):""
            }
        </Breadcrumbs>
    );
}
