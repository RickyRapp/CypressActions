import React from 'react';
import _ from 'lodash';
import { defaultTemplate } from 'core/utils';

function TabMenuLayout({ menuStore, t }) {
  const tabs = menuStore.tabMenu;
  if (!tabs || tabs.length === 0) return null;
  return (
    <div className="content__header">
      <div className="tabs--primary">
        {_.map(tabs, tab => {
          let className = 'tabs--primary__item';
          let navigate = () => menuStore.selectMenuItem(tab);
          if (tab.isActiveByPath(menuStore.activePath)) {
            className += ' active';
            navigate = () => {};
          }
          return (
            <span className={className} key={tab.title} onClick={navigate}>
              {t(tab.title)}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default defaultTemplate(TabMenuLayout);
