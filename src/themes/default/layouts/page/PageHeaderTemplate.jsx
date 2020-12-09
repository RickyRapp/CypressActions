import React from 'react';
import PropTypes from 'prop-types';

import {
    NotifyOutsideClick,
    Gravatar,
    BaasicButton
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

function PageHeaderTemplate({ children, rootStore, routes, t, hideTitle = false, coreResolving, menuStore, ...props }) {
    const {
        viewStore: {
            toggleProfileMenu,
            setProfileMenu,
            profileMenuOpen
        },
    } = rootStore;

    const activeRoute = rootStore.routerStore.routes.find(c => c.name === rootStore.routerStore.routerState.routeName);
    const title = (activeRoute.data ? activeRoute.data.title : '');

    return (
        <div className="layout__header header">

            {!coreResolving ? renderHeaderContent(children, props, routes, hideTitle, t, title) : null}

            {!coreResolving &&
                <div className="header__options">
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
                                                {/* <i className="k-icon k-i-arrow-s header__profile__icon"></i> */}
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
                                                    rootStore.routerStore.goTo('master.app.main.donor-profile', { id: rootStore.userStore.user.id })
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
                    <div className="header__hamburger"
                        onClick={() => menuStore.toggleMenuOpen()}>
                        <i className="u-icon u-icon--med u-icon--menu"></i>
                    </div>

                </div>}

        </div>
    )
}

PageHeaderTemplate.propTypes = {
    children: PropTypes.any,
    t: PropTypes.func,
    coreResolving: PropTypes.bool,
    hideTitle: PropTypes.bool,
    rootStore: PropTypes.object,
    menuStore: PropTypes.object,
    routes: PropTypes.any,
};

function renderHeaderContent(children, props, routes, hideTitle, t, title) {
    let contentRender = null;
    if (children) {
        contentRender = typeof children === 'function' ? children(props) : children;
    }

    return (
        <React.Fragment>
            {!hideTitle && <h3 className="type--lrg type--wgt--medium u-mar--right--sml">{t(title)}</h3>}
            {routes && routes.create ?
                <BaasicButton
                    className="btn btn--base btn--primary u-mar--right--sml"
                    label={'LIST_LAYOUT.CREATE_BUTTON'}
                    onClick={routes.create} />
                : null}
            {children && contentRender ?
                <div className="content__header">
                    <div className="row row__align--end">{contentRender}</div>
                </div>
                :
                null}
        </React.Fragment>
    )
}

export default defaultTemplate(PageHeaderTemplate);
