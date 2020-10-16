import React from 'react';

import PropTypes from 'prop-types';
import _ from 'lodash';

import { defaultTemplate } from 'core/hoc';

function TabMenuLayout({ menuStore, t }) {
    const tabs = menuStore.tabMenu;
    if (!tabs || tabs.length === 0) return null;
    return (
        <div className="tabs--primary">
            {_.map(tabs, tab => {
                let className = 'tabs--primary__item';
                let navigate = () => menuStore.selectMenuItem(tab);
                if (tab.isActiveByPath(menuStore.activePath)) {
                    className += ' active';
                    navigate = () => { };
                }
                return (
                    <span className={className} key={tab.title} onClick={navigate}>
                        {t(tab.title)}
                    </span>
                );
            })}
        </div>
    );
}

TabMenuLayout.propTypes = {
    menuStore: PropTypes.object,
    t: PropTypes.func,
};

export default defaultTemplate(TabMenuLayout);
