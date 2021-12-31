import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';

const useStyles = makeStyles((theme) => ({
    breadcrumb: {
        display: 'inline-block',
        fontSize: theme.spacing(1.8),
        backgroundColor: '#281850',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        borderRadius: theme.spacing(5),
        color: '#fff'
    },
    icon: {
        marginRight: theme.spacing(0.5),
        marginBottom: theme.spacing(0.6),
        width: 20,
        height: 20
    },
    breadcrumbText: {
        fontSize: theme.spacing(1.8),
    }
}));

export default function Breadcrumb(props) {
    const classes = useStyles();

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
