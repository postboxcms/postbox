import * as React from 'react';
import { DashboardCard, DashboardPanel, DashboardContent } from './Dashboard/DashboardPanel';
import { VideoCard } from './Videos';
import { ChannelsCard } from './Channels';
import { SubscribersCard } from './Subscribers';

const Home = () => {
    return (
        <DashboardPanel spacing={3}>
            <DashboardCard xs={12} md={4} lg={4}>
                <DashboardContent height="fixed" className="coaster">
                    <VideoCard />
                </DashboardContent>
            </DashboardCard>
            <DashboardCard xs={12} md={4} lg={4}>
                <DashboardContent height="fixed" className="coaster">
                    <ChannelsCard />
                </DashboardContent>
            </DashboardCard>
            <DashboardCard xs={12} md={4} lg={4}>
                <DashboardContent height="fixed" className="coaster">
                    <SubscribersCard />
                </DashboardContent>
            </DashboardCard>
        </DashboardPanel>

    );
}

export default Home;
