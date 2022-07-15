import React from 'react';
import { inject } from 'mobx-react';
import { PropTypes } from 'prop-types';
import { FormatterResolver, NotifyOutsideClick } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import logo from 'themes/styles/postcss-svg/old/logo-app.svg';
import logo_collapsed from 'themes/styles/postcss-svg/old/logo-collapsed.svg';
import ReactTooltip from 'react-tooltip';

function MenuTemplate({ menuStore, t }) {
    return (
        <NotifyOutsideClick action={() => menuStore.closeMenu()}>
            <div className={'layout__aside ' + (menuStore.isCollapsed ? 'is-collapsed' : '') + (menuStore.isOpen ? ' is-open' : '')}>
                <React.Fragment>{renderPrimary(menuStore.menu, menuStore, t)}</React.Fragment>
            </div>
        </NotifyOutsideClick>
    );
}

function renderPrimary(menu, menuStore, translate) {
    return (
        <React.Fragment>
            {renderMenuHeader(menuStore, translate)}

            <div className={menuStore.isOpen ? 'nav--primary' : 'nav--primary'}>
                {menu.map((item) => {
                    const title = translate(item.title);
                    let className = '';

                    const secondaryMenuOpen = () => {
                        if (title === "Manage Fund" && menuStore.isCollapsed) {
                            menuStore.toggleCollapse();
                            menuStore.toggleSecondaryMenu();
                        } else if (title === "Manage Fund") {
                            menuStore.toggleSecondaryMenu();
                        } else {
                            menuStore.selectMenuItem(item);
                        }
                    }

                    if (menuStore.selectedPath && menuStore.selectedPath.length > 0) {
                        if (menuItemActive(item, menuStore.selectedPath)) {
                            className += 'selected';
                        }
                    }
                    if (menuItemActive(item, menuStore.activePath)) {
                        className += 'active';
                    }

                    // if (className.includes('selected') || (item.hasChildren && className.includes('active'))) {
                    return (
                        <React.Fragment key={title}>
                            <div data-tip={`${title}`} className={`nav--primary__item ${title === "Give" ? "nav--primary__item--give" : className}`} aria-label={title} onClick={secondaryMenuOpen}>
                                <i className={!menuStore.isCollapsed ? `u-icon u-icon--med u-icon--${item.icon}` : `u-icon u-icon--med u-icon--${item.icon} u-mar--center`}></i>
                                {!menuStore.isCollapsed &&
                                    <span title={title} className={title === "Give" ? "u-mar--left--base" : "nav--secondary__text u-mar--left--base"}>
                                        {title}
                                    </span>}
                                {item.hasChildren ? (
                                    <span className="nav--primary__icon">
                                        <span className={`u-icon u-icon--base u-icon--arrow-up ${menuStore.secondaryMenuIsOpen ? "" : "u-rotate--180"}`}></span>
                                    </span>
                                ) : null}

                                {menuStore.isCollapsed &&
                                    <ReactTooltip place={"right"} />
                                }
                            </div>

                            {menuStore.secondaryMenuIsOpen &&
                                <SecondaryMenu items={item.subMenu} />
                            }
                        </React.Fragment>
                    );
                })}
                { menuStore.rootStore.userStore.applicationUser
                 && menuStore.rootStore.userStore.applicationUser.donor &&
                 <div className="nav--primary__balance">
                <p className="nav--primary__balance__label">
                    AVAILABLE BALANCE
                </p>
                <p className="nav--primary__balance__amount">
                    <FormatterResolver
						item={{ balance: menuStore.rootStore.userStore.applicationUser.donor.availableBalance }}
                        field="balance"
						format={{ type: 'currency' }}
					/>
                </p>
                </div> }

            </div>
            {
                renderMenuFooter(menuStore, translate)
            }
        </React.Fragment>
    );
}

function menuItemActive(item, activePath = []) {
    if (item.path.length > activePath.length) return false;

    for (let i = 0; i < item.path.length; i++) {
        if (item.path[i] !== activePath[i]) {
            return false;
        }
    }

    return true;
}

const SecondaryMenu = inject(i => ({
    menuStore: i.rootStore.menuStore
}))(defaultTemplate(SecondaryItems));

function SecondaryItems({ items, menuStore, t }) {
    if (!items || items.length === 0) return null;
    return (
        <div className={'nav--secondary' + (menuStore.secondaryMenuVisible ? ' active' : '')}>
            <ul>
                {items.map(item => {
                    let className = 'nav--secondary__item';
                    if (menuItemActive(item, menuStore.activePath)) {
                        className += ' active';
                    }
                    if (menuItemActive(item, menuStore.selectedPath)) {
                        className += ' selected';
                    }

                    const title = t(item.title);
                    if (className.includes('selected')) {
                        return (
                            <ul key={title}>
                                <li className={className} title={title} style={{ backgroundColor: "yellow" }} onClick={() => menuStore.selectMenuItem(item)}>
                                    {title}
                                    {item.hasChildren ? (
                                        <span className="u-push">
                                            <span className="u-icon u-icon--base u-icon--arrow-right"></span>
                                        </span>
                                    ) : null}
                                </li>
                            </ul>
                        );
                    } else {
                        return (
                            <li key={title} title={title} className={className} onClick={() => menuStore.selectMenuItem(item)}>
                                {title}
                                {item.hasChildren ? (
                                    <span className="u-push">
                                        <span className="u-icon u-icon--base u-icon--arrow-right"></span>
                                    </span>
                                ) : null}
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
}

function renderMenuHeader(menuStore, t) {
    return (
        <div className="nav--primary__logo">
            <a href="/">
                <img
                    className='header__logo'
                    src={menuStore.isCollapsed ? logo_collapsed : logo}
                    alt='logo'
                />
            </a>
            <div className="nav--primary__close" onClick={() => menuStore.toggleMenuOpen()} title={menuStore.isCollapsed ? t('MENU.FOOTER.EXPAND') : t('MENU.FOOTER.COLLAPSE')}>
                <i className="u-icon u-icon--base u-icon--close-menu"></i>
            </div>
        </div>
    )
}

function renderMenuFooter(menuStore, t) {
    return (
        <React.Fragment>
            <div className="nav--primary__footer">
                <div className="nav--primary__item--logout" onClick={() => menuStore.rootStore.viewStore.logout()} data-tip={t('MENU.FOOTER.LOGOUT')}>
                    {menuStore.isCollapsed ? <i className="u-icon u-icon--med u-icon--logout"></i>
                        : <span>{t('MENU.FOOTER.LOGOUT')}</span>
                    }
                </div>
                <div className="nav--primary__item--menu" onClick={() => menuStore.toggleCollapse()} title={menuStore.isCollapsed ? t('MENU.FOOTER.EXPAND') : t('MENU.FOOTER.COLLAPSE')}>
                    {menuStore.isCollapsed ? <i className="u-icon u-icon--base u-icon--arrow-right"></i> : <i className="u-icon u-icon--base u-icon--arrow-left"></i>}
                </div>

                {menuStore.isCollapsed &&
                    <ReactTooltip place={"right"} />
                }
            </div>

        </React.Fragment>
    )
}

SecondaryItems.propTypes = {
    items: PropTypes.array,
    menuStore: PropTypes.object,
    t: PropTypes.func,
};

MenuTemplate.propTypes = {
    menuStore: PropTypes.object,
    t: PropTypes.func,
};

export default defaultTemplate(MenuTemplate);
