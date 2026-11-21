import React from 'react';
import { useSelector } from 'react-redux';

import { getWebsiteLogo, getWebsiteName } from '@modules/settings/reducers/site';
import { site } from '@app/constants';

export const Header = () => {
  const websiteName = useSelector(getWebsiteName);
  const websiteLogo = useSelector(getWebsiteLogo);

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center px-4">
        <h1 className="text-xl font-semibold text-slate-900">
          {websiteLogo ? (
            <img src={`${site.url}/uploads/settings/${websiteLogo}`} style={{ maxHeight: '36px' }} alt={websiteName || 'Website logo'} />
          ) : websiteName}
        </h1>
      </div>
    </header>
  );
};

export default Header;
