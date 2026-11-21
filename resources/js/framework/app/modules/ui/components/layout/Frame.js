import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';

import { useAppCSS, useWebCSS } from '@app/hooks';
import {api} from '@app/constants';
import Title from '@ui/components/elements/Title';
import Icon from '../elements/Icon';

const columnSpans = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
};
const responsiveSpans = Object.fromEntries(
    Object.entries(columnSpans).map(([size, value]) => [size, value.replace('col-span', 'md:col-span')])
);
const largeSpans = Object.fromEntries(
    Object.entries(columnSpans).map(([size, value]) => [size, value.replace('col-span', 'lg:col-span')])
);

export const Frame = (props) => {
    return (
        <div className={`grid grid-cols-12 ${props.spacing === 2 ? 'gap-2' : props.spacing === 6 ? 'gap-6' : 'gap-4'} ${props.className || ''}`}>
            {props.children}
        </div>
    );
}
export const Card = (props) => {
    return (
        <div className={`${columnSpans[props.xs] || 'col-span-12'} ${props.md ? responsiveSpans[props.md] : ''} ${props.lg ? largeSpans[props.lg] : ''} ${props.className || ''}`}>
            {props.children}
        </div>
    );
}

export const Body = (props) => {
    const classes = useAppCSS();
    const paperClass = `${classes.paper} ${props.height === "fixed" ? classes.fixedHeight : ''} ${props.className || ''}`;
    return (
        <section className={paperClass}>
            {props.children}
        </section>
    )
}

export const DataCard = (props) => {
    const classes = useWebCSS();
    return (
        <div className="grid grid-cols-12 gap-3">
                <div className="col-span-10 md:col-span-9 lg:col-span-10">
                    <Title variant="normal">{props.title}</Title>
                    <p className="text-3xl font-semibold text-slate-900">
                        {props.records}
                    </p>
                    <p className={`${classes.cardText} text-sm text-slate-500`}>
                        Last record added:
                        {props.updated_at !== null ? (
                            moment(props.updated_at).fromNow()
                        ):''}
                    </p>
                    <Link className="app-primary-text hover:underline" to={api.adminPrefix + '/' +props.slug + '/list'}>
                        View more
                    </Link>
                </div>
                <div className="col-span-2 text-right md:col-span-3 lg:col-span-2">
                    <Icon className={classes.cardIcons} name={props.icon} />
                </div>
        </div>
    );
}


Card.propTypes = {
    children: PropTypes.element
}
