import React from 'react';
import _ from 'lodash';
import { inject } from 'mobx-react';
import { PropTypes } from 'prop-types';
import { NotifyOutsideClick } from 'core/components';
import { defaultTemplate } from 'core/hoc';

const SecondaryMenu = inject(i => ({
    items: i.rootStore.menuStore.secondaryMenu,
    menuStore: i.rootStore.menuStore
}))(defaultTemplate(SecondaryItems));

const TerniaryMenu = inject(i => ({
    items: i.rootStore.menuStore.terniaryMenu,
    menuStore: i.rootStore.menuStore
}))(defaultTemplate(TerniaryItems));

function MenuTemplate({ menuStore, t }) {

    return (
        <NotifyOutsideClick action={() => menuStore.closeMenu()}>
            <div className={menuStore.isCollapsed ? "layout__aside is-collapsed" : "layout__aside"}>
                <React.Fragment>
                    {renderPrimary(menuStore.menu, menuStore, t)}
                </React.Fragment>
            </div>
        </NotifyOutsideClick>
    );
}

function renderPrimary(menu, menuStore, translate) {
    return (
        <div>

            <div className={menuStore.isOpen ? "nav--primary is-open" : "nav--primary"}>
                <div onClick={() => menuStore.toggleMenuOpen()}
                    className="nav--primary__close">
                    <i className="u-icon u-icon--xmed u-icon--close">
                    </i>
                </div>

                {_.map(menu, item => {
                    let className = "nav--primary__item";
                    if (
                        menuStore.selectedPath &&
                        menuStore.selectedPath.length > 0
                    ) {
                        if (menuItemActive(item, menuStore.selectedPath)) {
                            className += " selected";
                        }
                    }
                    if (menuItemActive(item, menuStore.activePath)) {
                        className += " active";
                    }
                    const title = translate(item.title);
                    if (className.includes("selected") || (item.hasChildren && className.includes("active"))) {
                        return (
                            <div key={title}>
                                <div
                                    className={className}
                                    aria-label={title}
                                    onClick={() => menuStore.selectMenuItem(item)}
                                >
                                    <span
                                        title={title}
                                        className={"u-mar--right--sml u-icon u-icon--sml u-icon--" + item.icon}
                                    />
                                    <span title={title} className="nav__text">{title}</span>
                                    {item.hasChildren ? (
                                        <span className="nav--primary__icon">
                                            <span className="u-icon u-icon--tny u-icon--arrow-down"></span>
                                        </span>
                                    ) : null}
                                </div>
                                <SecondaryMenu />
                            </div>
                        );
                    }
                    else {
                        return (
                            <div
                                key={title}
                                aria-label={title}
                                className={className}
                                label={title}
                                onClick={() => menuStore.selectMenuItem(item)}
                            >
                                <span
                                    title={title}
                                    className={"u-mar--right--sml u-icon u-icon--sml u-icon--" + item.icon}
                                />

                                <span title={title} className="nav__text">{title}</span>
                                {item.hasChildren ? (
                                    <span className="nav--primary__icon">
                                        <span className="u-icon u-icon--tny u-icon--arrow-down"></span>
                                    </span>
                                ) : null}

                            </div>
                        );
                    }

                })}
                <div className="nav--primary__collapse"
                    title="Toggle Menu"
                    onClick={() => menuStore.toggleCollapse()}
                >
                    <i className="u-icon u-icon--med u-icon--circle-right"></i>
                </div>
            </div>
        </div>
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

function SecondaryItems({ items, menuStore, t }) {
    if (!items || items.length === 0) return null;
    return (
        <div className={"nav--secondary" + (menuStore.secondaryMenuVisible ? " active" : "")}>
            <ul>
                {items.map(item => {
                    let className = "nav--secondary__item";
                    if (menuItemActive(item, menuStore.activePath)) {
                        className += " active";
                    }
                    if (menuItemActive(item, menuStore.selectedPath)) {
                        className += " selected";
                    }

                    const title = t(item.title);
                    if (className.includes("selected")) {
                        return (
                            <ul key={title}>
                                <li
                                    className={className}
                                    title={title}
                                    onClick={() => menuStore.selectMenuItem(item)}
                                >
                                    {title}
                                    {item.hasChildren ? (
                                        <span className="u-push">
                                            <span className="u-icon u-icon--tny u-icon--arrow-right"></span>
                                        </span>
                                    ) : null}
                                </li>
                                <TerniaryMenu />
                            </ul>
                        );
                    }
                    else {
                        return (
                            <li
                                key={title}
                                title={title}
                                className={className}
                                onClick={() => menuStore.selectMenuItem(item)}
                            >
                                {title}
                                {item.hasChildren ? (
                                    <span className="u-push">
                                        <span className="u-icon u-icon--tny u-icon--arrow-right"></span>
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
function TerniaryItems({ items, menuStore, t }) {
    if (!items || items.length === 0) return null;
    return (
        <div className={"nav--tertiary layout__aside--secondary" + (menuStore.terniaryMenuVisible ? " active" : "")}>
            <ul>
                <li className="nav--tertiary__back"
                    onClick={() => menuStore.setSelectedPath(items[0].parent.parent.path)}>
                    <i className="u-icon u-icon--xmed u-icon--back"></i>
                </li>
                {items.map(item => {
                    let className = "nav--tertiary__item";
                    if (menuItemActive(item, menuStore.activePath)) {
                        className += " active";
                    }
                    if (menuItemActive(item, menuStore.selectedPath)) {
                        className += " selected";
                    }

                    const title = t(item.title);
                    return (
                        <li
                            key={title}
                            title={title}
                            className={className}
                            onClick={() => menuStore.selectMenuItem(item)}
                        >
                            {title}
                            {item.hasChildren ? (
                                <span className="u-push">
                                    <span className="u-icon u-icon--tny u-icon--arrow-right"></span>
                                </span>
                            ) : null}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

TerniaryItems.propTypes = {
    items: PropTypes.array,
    menuStore: PropTypes.object,
    t: PropTypes.func
}
SecondaryItems.propTypes = {
    items: PropTypes.array,
    menuStore: PropTypes.object,
    t: PropTypes.func
}

MenuTemplate.propTypes = {
    menuStore: PropTypes.object,
    t: PropTypes.func
}

export default defaultTemplate(MenuTemplate);
