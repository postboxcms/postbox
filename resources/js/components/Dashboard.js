import makeStyles from '@mui/styles/makeStyles';
import * as React from 'react';
import { Card, Frame, Body } from './ui/Frame';
import { PageCard } from './Pages';
import { PostCard } from './Posts';
import { UserCard } from './Users';

const useStyles = makeStyles((theme) => ({
    body: {
        paddingTop: theme.spacing(4)
    }
}));

const Dashboard = () => {
    const classes = useStyles();
    return (
        <Frame className={classes.body} spacing={3}>
            <Card xs={12} md={4} lg={4}>
                <Body height="fixed" className="coaster">
                    <PostCard title="Posts"/>
                </Body>
            </Card>
            <Card xs={12} md={4} lg={4}>
                <Body height="fixed" className="coaster">
                    <PageCard title="Pages"/>
                </Body>
            </Card>
            <Card xs={12} md={4} lg={4}>
                <Body height="fixed" className="coaster">
                    <UserCard title="Users"/>
                </Body>
            </Card>
        </Frame>

    );
}

export default Dashboard;
