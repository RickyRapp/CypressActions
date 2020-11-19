import React from 'react';
import PropTypes from 'prop-types';

import {
    NotifyOutsideClick,
    Gravatar
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

function PageHeaderTemplate({ children, rootStore, t, coreResolving, ...props }) {
    const {
        viewStore: {
            toggleProfileMenu,
            setProfileMenu,
            profileMenuOpen,
        },
    } = rootStore;

    const activeRoute = _.find(rootStore.routerStore.routes, {
        name: rootStore.routerStore.routerState.routeName
    });
    const title = (activeRoute.data ? activeRoute.data.title : '');

    return (
        <div className="layout__header header">

            {!coreResolving ? renderHeaderContent(children, props, t, title) : null}

            {!coreResolving &&
                <div className="header__options">
                    <div className="header__hamburger"
                        onClick={() => menuStore.toggleMenuOpen()}>
                        <i className="u-icon u-icon--med u-icon--menu"></i>
                    </div>
                    <div className="header__profile">
                        <NotifyOutsideClick action={() => setProfileMenu(false)}>
                            <div>
                                <div onClick={toggleProfileMenu}>
                                    {rootStore.userStore.user ? (
                                        <div>
                                            <Gravatar
                                                className='header__profile__img'
                                                email={
                                                    rootStore.userStore.user.email
                                                }
                                            />
                                            <span className="header__profile__name">
                                                <span>{rootStore.userStore.user.displayName}</span>
                                                <i className="k-icon k-i-arrow-s header__profile__icon"></i>
                                            </span>
                                        </div>
                                    ) : null}
                                </div>
                                <div className={'header__profile__dropdown' + (profileMenuOpen ? ' active' : '')}>
                                    <ul>
                                        {rootStore.userStore.user && rootStore.userStore.user.roles.includes('Users', 'Charities') &&
                                            <li className='header__profile__dropdown__item'
                                                onClick={() => {
                                                    toggleProfileMenu();
                                                    routerStore.goTo('master.app.main.donor-profile', { id: rootStore.userStore.user.id })
                                                }}> {t('HEADER.USER_MENU.MY_PROFILE')}
                                            </li>}
                                        <li className='header__profile__dropdown__item'
                                            onClick={() => {
                                                rootStore.viewStore.logout();
                                                toggleProfileMenu();
                                            }}> {t('HEADER.USER_MENU.LOGOUT')}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </NotifyOutsideClick>

                    </div>
                </div>}

        </div>
    )
}

PageHeaderTemplate.propTypes = {
    children: PropTypes.any,
    t: PropTypes.func,
    coreResolving: PropTypes.bool,
    rootStore: PropTypes.object
};

function renderHeaderContent(children, props, t, title) {
    if (children) {
        const contentRender = typeof children === 'function' ? children(props) : children;
        if (contentRender) {
            return (
                <div className='content__header'>
                    <div>{contentRender}</div>
                </div>
            )
        }
    }

    return <h3>{t(title)}</h3>;
}

export default defaultTemplate(PageHeaderTemplate);
