import * as React from 'react';
import { DashboardCard, DashboardPanel, DashboardContent } from './Dashboard/DashboardPanel';
import { PageCard } from './Pages';
import { PostCard } from './Posts';
import { UsersCard } from './Users';

const Home = () => {
    return (
        <DashboardPanel spacing={3}>
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
                    <UsersCard />
                </DashboardContent>
            </DashboardCard>
        </DashboardPanel>

    );
}

export default Home;
