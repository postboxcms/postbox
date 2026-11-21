import React from 'react';
import { first } from 'lodash';
import Panel from '@ui/components/Panel';
import { useConsumer } from '@website/hooks/consumer';
import { Footer as WebsiteFooter } from '@ui/components/Footer';

export const UserInfo = () => {
  const { data } = useConsumer();
  const user = first(data);

  return (
    <div className="user-panel col-span-12 md:col-span-3">
      <Panel className="sticky top-[66px] flex h-[250px] flex-col items-center justify-center">
        <div className="avatar-icon flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl font-semibold text-white">
          {user?.name?.charAt(0)}
        </div>
        <h4 className="mt-3 w-full text-center font-semibold">{user?.name}</h4>
        <p className="text-sm text-slate-500">{user?.email}</p>
      </Panel>
      <Panel className="sticky top-[330px] mx-auto p-0">
        <WebsiteFooter
          prefix={() => <>Powered by</>}
          suffix={() => <>&copy; {new Date().getFullYear()}</>}
          linkText="Postbox"
          linkURL="https://digitalbit.in"
        />
      </Panel>
    </div>
  );
};

export default UserInfo;
