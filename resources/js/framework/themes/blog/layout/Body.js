import React from 'react';
import { useSelector } from 'react-redux';

import Icon from '@ui/components/elements/Icon';
import Title from '@ui/components/elements/Title';

import { getWebsiteStatus } from '@modules/settings/reducers/site';
import { site } from '@app/constants';
import Consumer from '@website/providers/Consumer';

import { UserInfo, FeedPanel, MenuBar } from '@themes/blog/components';

const BodyContent = () => (
  <div className="grid grid-cols-12 gap-4 py-8">
    <Consumer table="pages">
      <MenuBar />
    </Consumer>
    <Consumer table="posts" scroll={true} limit="3">
      <FeedPanel />
    </Consumer>
    <Consumer table="users">
      <UserInfo />
    </Consumer>
  </div>
);

const ComingSoonContent = () => (
  <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center">
    <Icon name="fa-dolly" color="#ccc" style={{ fontSize: '240px' }} />
    <Title variant="normal">{site.comingSoonMessage}</Title>
  </div>
);

export const Body = () => {
  const websiteStatus = useSelector(getWebsiteStatus);
  const systemStatus = useSelector((state) => state.site.status);
  const isWebsiteUnavailable = systemStatus === 'fulfilled' && !websiteStatus;

  return (
    <main className="mx-auto w-full max-w-screen-xl px-4">
      {isWebsiteUnavailable ? <ComingSoonContent /> : <BodyContent />}
    </main>
  );
};

export default Body;
