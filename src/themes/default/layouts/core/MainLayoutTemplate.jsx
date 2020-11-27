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
                <Menu />
                <div
                    className={
                        'layout__content card--xlrg' +
                        (menuStore.isCollapsed ? ' is-collapsed' : '') +
                        (menuStore.secondaryMenuVisible ? ' active' : '')
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
