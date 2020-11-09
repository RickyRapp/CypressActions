import React from 'react';
import PropTypes from 'prop-types';

import {
    NotifyOutsideClick,
    Gravatar
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
function HeaderTemplate({ rootStore, routerStore, t, menuStore }) {
    const {
        viewStore: {
            toggleProfileMenu,
            setProfileMenu,
            profileMenuOpen,
        },
    } = rootStore;

    return (
        <header className="layout__header header">
            <div className="header__options">
                <div className="header__hamburger"
                    onClick={() => menuStore.toggleMenuOpen()}>
                    <i className="u-icon u-icon--med u-icon--menu"></i>
                </div>

                {/* 
                    uncomment this if you need to debug session expiration modal
                    
                    <button onClick={()=>{
                        rootStore.authStore.token = null;
                    }}>Invalidate token</button> 
                    <button type='button' onClick={clearToken}>CLEAR</button>
                */}

                {/*<button type="button" onClick={clearToken}>CLEAR</button>*/}
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
            </div>

        </header>
    );
}

HeaderTemplate.propTypes = {
    rootStore: PropTypes.object,
    routerStore: PropTypes.object,
    menuStore: PropTypes.object,
    t: PropTypes.func
};

export default defaultTemplate(HeaderTemplate);
