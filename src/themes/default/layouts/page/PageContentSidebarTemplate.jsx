import React from "react";
import { defaultTemplate } from "core/utils";

function PageContentSidebarTemplate({ children, contentSidebarVisible, toggleContentSidebarVisibility }) {
    return (
        <React.Fragment>
            <div
                className={
                    "content__main__aside" + (contentSidebarVisible ? "" : " is-collapsed")
                }
            >
                {children}
            </div>
            <button
                className="content__main__aside__action"
                onClick={() => toggleContentSidebarVisibility()}
            >
                <span className={"icomoon treeview icon-arrow-button-right-1" + (contentSidebarVisible ? "" : " is-collapsed")} />
            </button>
        </React.Fragment>
    );
}

export default defaultTemplate(PageContentSidebarTemplate);
