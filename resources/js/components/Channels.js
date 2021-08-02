import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';

import Title from './Title';
import { DashboardCard, DashboardPanel, DashboardContent } from './Dashboard/DashboardPanel';

function preventDefault(event) {
    event.preventDefault();
}

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const useStyles = makeStyles({
    channelContext: {
        flex: 1,
        fontSize: "14px"
    },
    iconClass: {
        float: "right",
        "& .MuiSvgIcon-root": {
            fontSize: 80,
            opacity: 0.5,
            color: "#ddd"
        }
    },

});

const rows = [
    createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
    createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
    createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

const ChannelsBody = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Channels</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Ship To</TableCell>
                        <TableCell>Payment Method</TableCell>
                        <TableCell align="right">Sale Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.shipTo}</TableCell>
                            <TableCell>{row.paymentMethod}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    See more orders
            </Link>
            </div>
        </React.Fragment>
    );
}

export const ChannelsCard = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid container>
            <Grid item xs={10} md={9} lg={10}>
                <Title>Channels</Title>
                <Typography component="p" variant="h4">
                    0
                </Typography>
                <Typography color="textSecondary" className={classes.channelContext}>
                    Last updated: a few seconds ago
                </Typography>
                <div>
                    <Link color="primary" href="#" onClick={preventDefault}>
                        View more
                    </Link>
                </div>
            </Grid>
            <Grid item xs={2} md={3} lg={2}>
                <Typography align="right" className={classes.iconClass}>
                    <VideoLibraryIcon />
                </Typography>
            </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default function Channels() {
    return (
        <DashboardPanel>
            <DashboardCard xs={12}>
                <DashboardContent>
                    <ChannelsBody />
                </DashboardContent>
            </DashboardCard>
        </DashboardPanel>
    );
}
