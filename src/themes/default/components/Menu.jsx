import React from "react";
import _ from "lodash";
import { observer, inject } from "mobx-react";
import { NotifyOutsideClick, Translate } from "core/components";
import { defaultTemplate } from "core/utils";

const SecondaryMenu = inject(i => ({
    items: i.rootStore.menuStore.secondaryMenu,
    routerStore: i.rootStore.routerStore,
    menuStore: i.rootStore.menuStore
}))(defaultTemplate(SecondaryItems));

const TerniaryMenu = inject(i => ({
    items: i.rootStore.menuStore.terniaryMenu,
    routerStore: i.rootStore.routerStore,
    menuStore: i.rootStore.menuStore
}))(defaultTemplate(TerniaryItems));

function MenuTemplate({ menuStore, routerStore, t }) {
    const { viewStore } = menuStore.rootStore;

    return (
        <NotifyOutsideClick action={e => menuStore.closeMenu()}>
            <React.Fragment>
                {renderPrimary(menuStore.menu, menuStore, t)}
                <SecondaryMenu />
                <TerniaryMenu />
            </React.Fragment>            
        </NotifyOutsideClick>
    );
}

function renderPrimary(menu, menuStore, translate) {
    return (
        <div className="layout__nav--primary">
            {_.map(menu, item => {
                let className = "layout__nav--primary__item";
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
                        onClick={e => menuStore.selectMenuItem(item)}
                    >
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

function SecondaryItems({ items, routerStore, menuStore, t }) {
    if (!items || items.length === 0) return null;
    return (
        <div className={"layout__nav--secondary" + (menuStore.secondaryMenuVisible ? " active" : "")}>
            <ul>
                <li className="pin" onClick={menuStore.onMenuPin}>
                
                    Pin to side
                    <span
                        className={
                            "icomoon icon-pin pin__icon" +
                            (menuStore.menuPinned ? " active" : "")
                        }
                    />
                </li>
                {items.map((item, i) => {
                    let className = "layout__nav--secondary__item";
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
                            onClick={e => menuStore.selectMenuItem(item)}
                        >
                            {title}
                            {item.hasChildren ? (
                                <span className="push">
                                    <span className="icomoon tiny icon-arrow-right-1 align--v--sub"></span>
                                </span>
                            ) : null}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function TerniaryItems({ items, routerStore, menuStore, t }) {
    const hasItems = items && items.length > 0;
    return (
        <div className={"layout__nav--tertiary" + (hasItems ? " active" : "")}>
            {hasItems &&
                items.map((item, i) => {
                    const isActive = menuItemActive(item, menuStore.activePath);
                    const title = t(item.title);
                    return (
                        <div
                            key={title}
                            className={
                                "layout__nav--tertiary__item" +
                                (isActive ? " active" : "")
                            }
                            onClick={e => menuStore.selectMenuItem(item)}
                        >
                            {title}
                        </div>
                    );
                })}
        </div>
    );
}

export default defaultTemplate(MenuTemplate);
