import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { Styles } from './Styles';

export const DashboardPanel = (props) => {
    return (
        <Grid container spacing={props.spacing} className={props.className}>
            {props.children}
        </Grid>
    );
}
export const DashboardCard = (props) => {
    return (
        <Grid item xs={props.xs} md={props.md} lg={props.lg} className={props.className}>
            {props.children}
        </Grid>
    );
}

export const DashboardContent = (props) => {
    const classes = Styles();
    const paperClass = props.height == "fixed"?(clsx(classes.paper, classes.fixedHeight))+' '+props.className:classes.paper+ ' ' +props.className;
    return (
        <Paper elevation={3} className={paperClass}>
            {/* <CardComponent /> */}
            {props.children}
        </Paper>
    )
}

// DashboardPanel.propTypes = {
//     children: PropTypes.element
// }
DashboardCard.propTypes = {
    children: PropTypes.element
}
// DashboardContent.propTypes = {
//     children: PropTypes.element
// }
