import React from "react";
import { translate } from "core/utils";
import {
    NotifyOutsideClick,
    Gravatar,
} from "core/components";
import logo from "themes/assets/img/logo.svg";
import { defaultTemplate } from 'core/utils';

function HeaderTemplate({ rootStore, routerStore }) {
    const {
        viewStore: {
            toggleProfileMenu,
            setProfileMenu,
            profileMenuOpen,
            toggleMainMenuVisibility
        },
        menuStore
    } = rootStore;
    return (
        <header className="layout__header">
            <img
                className="header__logo"
                src={logo}
                alt="logo"
                width={32}
                height={32}
                onClick={() =>
                    routerStore.goTo(routerStore.rootStore.initialState)
                }
            />

            <div className="display--ib push">
                <NotifyOutsideClick action={e => setProfileMenu(false)}>
                    <div className="header__profile">
                        <div onClick={toggleProfileMenu}>
                            {rootStore.authStore.user ? (
                                <div>
                                    <Gravatar
                                        className="header__profile__img"
                                        email={
                                            rootStore.authStore.user.email
                                        }
                                    />
                                    <span>
                                        {/* {rootStore.authStore.user.displayName} */}
                                        <span className="k-icon k-i-arrow-s type--color--negative"></span>
                                    </span>
                                </div>
                            ) : null}
                        </div>
                        <div className={"header__profile__dropdown" + (profileMenuOpen ? " active" : "")}>
                            <ul>
                                <li className="header__profile__dropdown__item"
                                    onClick={() => {
                                    // membershipStore.viewStore.routes.userPreferences();
                                    routerStore.goTo('master.app.membership.password-change');
                                    toggleProfileMenu(); }}> Change password
                                </li>

                                <li className="header__profile__dropdown__item"
                                    onClick={() => {
                                        rootStore.viewStore.logout();
                                        toggleProfileMenu();
                                    }}> Log off
                                </li>
                            </ul>
                        </div>
                    </div>
                </NotifyOutsideClick>
            </div>
        </header>
    );
}

export default defaultTemplate(HeaderTemplate);
