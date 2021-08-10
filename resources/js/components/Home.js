import { makeStyles } from '@material-ui/core';
import * as React from 'react';
import { DashboardCard, DashboardPanel, DashboardContent } from './Dashboard/DashboardPanel';
import { PageCard } from './Pages';
import { PostCard } from './Posts';
import { UserCard } from './Users';

const useStyles = makeStyles((theme) => ({
    body: {
        paddingTop: theme.spacing(4)
    }
}));

const Home = () => {
    const classes = useStyles();
    return (
        <DashboardPanel className={classes.body} spacing={3}>
            <DashboardCard xs={12} md={4} lg={4}>
                <DashboardContent height="fixed" className="coaster">
                    <PostCard />
                </DashboardContent>
            </DashboardCard>
            <DashboardCard xs={12} md={4} lg={4}>
                <DashboardContent height="fixed" className="coaster">
                    <PageCard />
                </DashboardContent>
            </DashboardCard>
            <DashboardCard xs={12} md={4} lg={4}>
                <DashboardContent height="fixed" className="coaster">
                    <UserCard />
                </DashboardContent>
            </DashboardCard>
        </DashboardPanel>

    );
}

export default Home;
