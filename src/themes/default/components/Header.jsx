import React from 'react';
import PropTypes from 'prop-types';

import {
    NotifyOutsideClick,
    Gravatar
} from 'core/components';
import logo from 'themes/assets/img/logo.svg';
import {defaultTemplate} from 'core/hoc';

function HeaderTemplate({ rootStore, routerStore, t }) {
    const {
        viewStore: {
            toggleProfileMenu,
            setProfileMenu,
            profileMenuOpen,
        },
    } = rootStore;

    return (
        <header className="layout__header header">
            <img
                className='header__logo'
                src={logo}
                alt='logo'
                onClick={() =>
                    routerStore.goTo('master.app.main.dashboard')
                }
            />
            
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
                                        <i className="k-icon k-i-arrow-s type--color--negative header__profile__icon"></i>
                                    </span>
                                </div>
                            ) : null}
                        </div>
                        <div className={'header__profile__dropdown' + (profileMenuOpen ? ' active' : '')}>
                            <ul>
                                <li className='header__profile__dropdown__item'
                                    onClick={() => {
                                        // membershipStore.viewStore.routes.userPreferences();
                                        routerStore.goTo('master.app.main.user-profile.password-change');
                                        toggleProfileMenu();
                                    }}> Change password
                                </li>
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

        </header>
    );
}

HeaderTemplate.propTypes = {
    rootStore: PropTypes.object,
    routerStore: PropTypes.object,
    t: PropTypes.func
};

export default defaultTemplate(HeaderTemplate);
