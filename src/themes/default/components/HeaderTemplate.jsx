import React from 'react';
import PropTypes from 'prop-types';
import { NotifyOutsideClick } from 'core/components';
import { defaultTemplate } from 'core/hoc';

function HeaderTemplate({ rootStore, routerStore, t, menuStore }) {
    const {
        viewStore: {
            toggleProfileMenu,
            setProfileMenu,
            profileMenuOpen,
        },
    } = rootStore;

    const imgUrl = 'https://www.pngkit.com/png/full/281-2812821_user-account-management-logo-user-icon-png.png'

    return (
        <header className="layout__header header">
            <div className="header__options">
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
                        <div onClick={toggleProfileMenu}>
                            {rootStore.userStore.user ? (
                                <div>
                                    <img
                                        src={imgUrl}
                                        height={30}
                                        width={30}
                                        className={'header__profile__img'}
                                    />
                                    <span className="header__profile__name">
                                        <span>{rootStore.userStore.user.displayName}</span>
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
                                            routerStore.goTo('master.app.main.donor.profile')
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
                    </NotifyOutsideClick>
                </div>
                <div className="header__hamburger"
                    onClick={() => menuStore.toggleMenuOpen()}>
                    <i className="u-icon u-icon--med u-icon--menu"></i>
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
