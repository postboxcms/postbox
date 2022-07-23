import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LayoutCSS } from './layout.css';
import { ElementCSS } from '../elements/element.css';
import Title from '../elements/Title';
import iconList from '../../libs/icons';

export const Frame = (props) => {
    return (
        <Grid container spacing={props.spacing} className={props.className}>
            {props.children}
        </Grid>
    );
}
export const Card = (props) => {
    return (
        <Grid item xs={props.xs} md={props.md} lg={props.lg} className={props.className}>
            {props.children}
        </Grid>
    );
}

export const Body = (props) => {
    const classes = LayoutCSS();
    const paperClass = props.height == "fixed" ? (clsx(classes.paper, classes.fixedHeight)) + ' ' + props.className : classes.paper + ' ' + props.className;
    return (
        <Paper elevation={3} className={paperClass}>
            {/* <CardComponent /> */}
            {props.children}
        </Paper>
    )
}

export const Data = (props) => {
    const classes = ElementCSS();
    const [data, setData] = useState({
        posts: 0,
        pages: 0,
        users: 0
    });

    useEffect(() => {
        // fetch(props.api+'/post/')
        setData((data) => ({ ...data }));
    }, []);

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={10} md={9} lg={10}>
                    <Title>{props.title}</Title>
                    <Typography component="p" variant="h4">
                        {props.records}
                    </Typography>
                    <Typography color="textSecondary" className={classes.cardText}>
                        Last record added:
                        {props.updated_at !== null ? (
                            <Moment fromNow>{props.updated_at}</Moment>
                        ):''}
                    </Typography>
                    <Link color="primary" to={props.slug}>
                        View more
                    </Link>
                </Grid>
                <Grid item xs={2} md={3} lg={2}>
                    <Typography align="right">
                        <FontAwesomeIcon icon={props.icon} size="xl" />
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}


Card.propTypes = {
    children: PropTypes.element
}
