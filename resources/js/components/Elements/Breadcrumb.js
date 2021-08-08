import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    breadcrumb: {
        display: 'inline-block',
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
    }
}));

export default function Breadcrumb(props) {
    const classes = useStyles();

    return (
        <Breadcrumbs separator=">" aria-label="breadcrumb" className={classes.breadcrumb}>
            <Link color="inherit" href="/">
                <HomeIcon className={classes.icon}/>
                Dashboard
            </Link>
            <Typography>
                {props.title}
            </Typography>
        </Breadcrumbs>
    );
}
