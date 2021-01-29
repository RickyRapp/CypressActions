import React from 'react';
import { inject } from 'mobx-react';
import { PropTypes } from 'prop-types';
import { NotifyOutsideClick } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import logo from 'themes/styles/postcss-svg/old/logo-app.svg';
import logo_collapsed from 'themes/styles/postcss-svg/old/logo-collapsed.svg';

function MenuTemplate({ menuStore, t }) {
    return (
        <NotifyOutsideClick action={() => menuStore.closeMenu()}>
            <div className={'layout__aside ' +  (menuStore.isCollapsed ? 'is-collapsed' : '') + (menuStore.isOpen ? ' is-open' : '')}>
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
                {menu.map((item, i) => {
                    const title = translate(item.title);
                    let className = title === "Give" ? 'nav--primary__item nav--primary__item--give' : 'nav--primary__item';
                    
                    if (menuStore.selectedPath && menuStore.selectedPath.length > 0) {
                        if (menuItemActive(item, menuStore.selectedPath)) {
                            className += ' selected';
                        }
                    }
                    if (menuItemActive(item, menuStore.activePath)) {
                        className += ' active';
                    }
                    if (className.includes('selected') || (item.hasChildren && className.includes('active'))) {
                        return (
                            <React.Fragment key={title}>
                                
                                    <div className={title === "Give" ? `${className}--give` : className} aria-label={title} onClick={() => menuStore.selectMenuItem(item)}>
                                        <span className={!menuStore.isCollapsed ? `u-icon u-icon--med u-icon--${item.icon}` : `u-icon u-icon--med u-icon--${item.icon} u-mar--center`} />
                                        {!menuStore.isCollapsed &&
                                            <span title={title} className={title === "Give" ? "u-mar--left--med" : "nav--secondary__text u-mar--left--med"}>
                                                {title}
                                            </span>}
                                        {item.hasChildren ? (
                                            <span className="nav--primary__icon">
                                                <span className="u-icon u-icon--sml u-icon--arrow-up"></span>
                                            </span>
                                        ) : null}
                                    </div>
                                    <SecondaryMenu items={item.subMenu} />
                                
                                    
                            </React.Fragment>
                        );
                    } else {
                        return (
                            <React.Fragment key={title}>
                                
                                    <div className={className} aria-label={title} onClick={() => menuStore.selectMenuItem(item)}>
                                        <span className={!menuStore.isCollapsed ? `u-icon u-icon--med u-icon--${item.icon}` : `u-icon u-icon--med u-icon--${item.icon} u-mar--center`} title={title} />
                                        {!menuStore.isCollapsed &&
                                            <span title={title} className={title === "Give" ? "u-mar--left--med" : "nav--secondary__text u-mar--left--med"}>
                                                {title}
                                            </span>}
                                        {item.hasChildren ? (
                                            <span className="nav--primary__icon">
                                                <span className="u-icon u-icon--sml u-icon--arrow-down"></span>
                                            </span>
                                        ) : null}
                                    </div>

                            </React.Fragment>
                        );
                    }
                })}
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
                                            <span className="u-icon u-icon--sml u-icon--arrow-right"></span>
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
                                        <span className="u-icon u-icon--sml u-icon--arrow-right"></span>
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
            <div className="nav--primary__close" onClick={() => menuStore.toggleCollapse()} title={menuStore.isCollapsed ? t('MENU.FOOTER.EXPAND') : t('MENU.FOOTER.COLLAPSE')}>
                <i className="u-icon u-icon--base u-icon--close-menu"></i>
            </div>
        </div>
    )
}

function renderMenuFooter(menuStore, t) {
    return (
        <React.Fragment>
            <div className="nav--primary__footer">
                <div className="nav--primary__item--logout">
                    {menuStore.isCollapsed ? <i className="u-icon u-icon--med u-icon--logout"></i>
                        : <span onClick={() => menuStore.rootStore.viewStore.logout()}>{t('MENU.FOOTER.LOGOUT')}</span>
                    }
                </div>
                <div className="nav--primary__item--menu" onClick={() => menuStore.toggleCollapse()} title={menuStore.isCollapsed ? t('MENU.FOOTER.EXPAND') : t('MENU.FOOTER.COLLAPSE')}>
                    {menuStore.isCollapsed ? <i className="u-icon u-icon--sml u-icon--arrow-right"></i> : <i className="u-icon u-icon--sml u-icon--arrow-left"></i>}
                </div>
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
