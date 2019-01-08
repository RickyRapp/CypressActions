import React from "react";
import { ContentHeader, ContentFooter, Loadable } from "core/components";
import { TabMenuLayout } from "core/layouts";

function ContentLayoutTemplate({
    children,
    loaderStore,
    headerContent,
    footerContent,
    title = null
}) {
    return (
        <React.Fragment>
            <ContentHeader title={title} content={headerContent} />
            <TabMenuLayout />
            {loaderStore ? (
                <Loadable loaderStore={loaderStore}>{children}</Loadable>
            ) : (
                children
            )}
            <ContentFooter content={footerContent} />
        </React.Fragment>
    );
}

export default ContentLayoutTemplate;
