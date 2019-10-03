import React from "react";
import _ from 'lodash';
import { Loadable } from "core/components";
import { PageNavigation, PageHeader, PageFooter, TabMenuLayout, Content } from 'core/layouts';
import { getPageObject } from 'core/utils';
import { defaultTemplate } from 'core/utils';

function PageTemplate({ children, rootStore, loading = false, isError = false, empty = false, emptyRenderer = null }) {
    const { header, footer, navigation, content } = getPageObject(children);

    // we should hide whole content when user or application is being resolved
    let coreResolving = rootStore.applicationStore.resolving;
    let resolving = loading || rootStore.applicationStore.resolving;

    return (
        <div className="content">
            {
                !coreResolving &&
                <React.Fragment>
                    <PageNavigation {...(navigation ? navigation[0].props : {})} />
                    <TabMenuLayout />
                </React.Fragment>
            }
            {
                (!empty &&
                    <MainContent
                        rootStore={rootStore}
                        loading={loading || coreResolving}
                        header={header}
                        footer={footer}
                        content={content}
                        isError={isError}
                    />
                ) || (empty && emptyRenderer)

            }
        </div>
    );
}

const MainContent = defaultTemplate(({ loading, header, footer, content, isError }) => {
    return (
        <React.Fragment>
            {/* can't wrap header and footer in Content so hide them while loading (because loader needs content__main as parent) */}
            {!loading ? <PageHeader {...(header ? header[0].props : {})} /> : null}

            <div className="content__main">
                <Content isError={isError} empty={false} loading={loading}> {/*when loading main content don't show empty (for now)*/}
                    {content.sidebar}

                    <div className="content__main__content">
                        <div className="content">
                            {
                                content.header &&
                                <div className="content__header">
                                    {content.header}
                                </div>
                            }

                            <div className="content__main">
                                <div className="content__main__content">
                                    <div className="padd--sml">
                                        {content.children}
                                    </div>
                                </div>
                            </div>

                            {
                                content.footer &&
                                <div className="content__footer">
                                    {content.footer}
                                </div>
                            }
                        </div>
                    </div>
                </Content>
            </div>

            {!loading ? <PageFooter {...(footer ? footer[0].props : {})} /> : null}
        </React.Fragment>
    )
});

export default defaultTemplate(PageTemplate);
