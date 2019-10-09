import * as React from 'react';
import PropTypes from 'prop-types';
import { Header, Loader, Menu, SessionExpireModal } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { BaasicConfirmModal } from 'core/components';

function MainLayoutTemplate({ render, initialized, viewStore, ...props }) {
    if (!initialized) return <Loader />;

    const {
        rootStore: { menuStore }
    } = viewStore;

    return (
        <div>
            <div className='layout'>
                <Header />
                <Menu />
                <div
                    style={{ overflow: 'auto' }} //TODO: designer
                    className={'layout__content' + (menuStore.secondaryMenuVisible ? ' active' : '')}>{render(props)}
                </div>

                <BaasicConfirmModal />
                <SessionExpireModal />
            </div>
        </div>
    );
}

MainLayoutTemplate.propTypes = {
    render: PropTypes.func,
    initialized: PropTypes.bool,
    viewStore: PropTypes.any
};

export default defaultTemplate(MainLayoutTemplate);
