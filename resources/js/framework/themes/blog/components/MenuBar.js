import React from 'react';
import Panel from '@ui/components/Panel';
import { Icon } from '@ui/components/elements/Icon';

export const MenuBar = () => (
  <div className="menu-panel col-span-12 md:col-span-3">
    <Panel className="sticky top-[66px] p-0">
      <nav aria-label="Main menu">
        <a href="/" className="menu-button flex items-center gap-3 rounded-md px-4 py-3 text-slate-700 hover:bg-slate-50">
          <span className="icon"><Icon name="fa-home" /></span>
          <span>Home</span>
        </a>
      </nav>
    </Panel>
  </div>
);

export default MenuBar;
