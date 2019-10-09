import React from 'react';
import _ from 'lodash';
import { inject } from 'mobx-react';
import {PropTypes} from 'prop-types';
import { NotifyOutsideClick } from 'core/components';
import { defaultTemplate } from 'core/hoc';

const SecondaryMenu = inject(i => ({
    items: i.rootStore.menuStore.secondaryMenu,
    menuStore: i.rootStore.menuStore
}))(defaultTemplate(SecondaryItems));

function MenuTemplate({ menuStore, t }) {

    return (
        <NotifyOutsideClick action={() => menuStore.closeMenu()}>
            <div className="layout__aside">
                <React.Fragment>
                    {renderPrimary(menuStore.menu, menuStore, t)}
                    <SecondaryMenu />
                </React.Fragment>
            </div>
        </NotifyOutsideClick>
    );
}

function renderPrimary(menu, menuStore, translate) {
    return (
        <div className="nav--primary">
            {_.map(menu, item => {
                let className = "nav--primary__item";
                if (
                    menuStore.selectedPath &&
                    menuStore.selectedPath.length > 0
                ) {
                    if (menuItemActive(item, menuStore.selectedPath)) {
                        className += " active";
                    }
                } else if (menuItemActive(item, menuStore.activePath)) {
                    className += " active";
                }

                const title = translate(item.title);

                return (
                    <div
                        key={title}
                        className={className}
                        onClick={() => menuStore.selectMenuItem(item)}
                    >{title}
                        <span
                            title={title}
                            className={"icomoon medium icon-" + item.icon}
                        />
                    </div>
                );
            })}
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
                    } else if (menuItemActive(item, menuStore.selectedPath)) {
                        className += " selected";
                    }

                    const title = t(item.title);
                    return (
                        <li
                            key={title}
                            className={className}
                            onClick={() => menuStore.selectMenuItem(item)}
                        >
                            {title}
                            {item.hasChildren ? (
                                <span className="push">
                                    <span className="icomoon xtiny icon-arrow-right-1 align--v--middle"></span>
                                </span>
                            ) : null}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
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
