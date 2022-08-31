import * as React from 'react';
import PropTypes from 'prop-types';
import { Loader, Menu } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { BaasicConfirmModal } from 'core/components';

function MainLayoutTemplate({ render, initialized, viewStore, ...props }) {
    if (!initialized) return <Loader />;

    const {
        rootStore: { menuStore },
    } = viewStore;

    return (
        <div>
                
            <div className="layout">
                {/* <Header /> */}
                { menuStore.rootStore.userStore.applicationUser && (
                    menuStore.rootStore.userStore.applicationUser.roles.includes('Charities') ? 
                    (menuStore.rootStore.userStore.applicationUser.permissions.verifiedAccountSection ? <Menu /> : null)
                : <Menu /> )  }
                <div
                    className={
                         menuStore.rootStore.userStore.applicationUser && ( menuStore.rootStore.userStore.applicationUser.roles.includes('Charities') ?
                          (menuStore.rootStore.userStore.applicationUser.permissions.verifiedAccountSection ? 'layout__content' : "layout__content--secondary") : 'layout__content' +
                        (menuStore.isCollapsed ? ' is-collapsed' : '') +
                        (menuStore.secondaryMenuVisible ? ' active' : ''))
                    }
                >
                    {render(props)}
                </div>
                <BaasicConfirmModal />
            </div>
        </div>
    );
}

MainLayoutTemplate.propTypes = {
    render: PropTypes.func,
    initialized: PropTypes.bool,
    viewStore: PropTypes.any,
};

export default defaultTemplate(MainLayoutTemplate);
