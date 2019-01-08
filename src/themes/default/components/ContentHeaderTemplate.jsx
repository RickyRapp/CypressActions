import React from "react";
import _ from "lodash";
import { defaultTemplate } from 'core/utils';

function ContentHeaderTemplate({ title, breadcrumbs, router, content, t }) {
    const lastIndex = breadcrumbs.length - 1;
    return (
        <div className="row page-header">
            <div className="col-sml-6">
                <h3 className="display--ib">{t(title)}</h3>
                <div className="breadcrumbs">
                    {_.map(breadcrumbs, (breadcrumb, index) => {
                        const isLast = index === lastIndex;
                        const navigate =
                            breadcrumb.route && !isLast
                                ? () => routerStore.navigate(breadcrumb.route)
                                : () => {};

                        const breadcrumbTitle = t(breadcrumb.title);
                        return (
                            <span className="breadcrumbs__item" key={breadcrumb.title} onClick={navigate}>
                                {breadcrumb.title} {isLast ? "" : <span className="icomoon icon-arrow-right-1"></span> }
                            </span>
                        );
                    })}
                </div>
            </div>
            {content ? <div className="col-sml-6">{content()}</div> : null}
        </div>
    );
}

export default defaultTemplate(ContentHeaderTemplate);
