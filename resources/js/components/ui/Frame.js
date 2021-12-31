import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import clsx from 'clsx';
import { frameStyles } from './frameStyles';

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
    const classes = frameStyles();
    const paperClass = props.height == "fixed"?(clsx(classes.paper, classes.fixedHeight))+' '+props.className:classes.paper+ ' ' +props.className;
    return (
        <Paper elevation={3} className={paperClass}>
            {/* <CardComponent /> */}
            {props.children}
        </Paper>
    )
}

Card.propTypes = {
    children: PropTypes.element
}
