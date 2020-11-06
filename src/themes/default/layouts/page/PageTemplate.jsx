import React from 'react';
import { PageNavigation, PageHeader, PageFooter, TabMenuLayout, Content } from 'core/layouts';
import { getPageObject } from 'core/utils';
import { defaultTemplate } from 'core/hoc';
import { PropTypes } from 'prop-types';

function PageTemplate({ children, rootStore, loading = false, isError = false, empty = false, emptyRenderer = null }) {
    const { header, footer, navigation, content } = getPageObject(children);

    // we should hide whole content when user or application is being resolved
    let coreResolving = rootStore.userStore.resolving;

    return (
        <div className='container'>
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

            <Content isError={isError} loading={loading}> {/*when loading main content don't show empty (for now)*/}
                {content.sidebar}
                <React.Fragment>
                    {
                        content.header &&
                        <div>
                            {content.header}
                        </div>
                    }

                    <div className="content__main">
                        {content.children}
                    </div>

                    {
                        content.footer &&
                        <div className="content__footer">
                            {content.footer}
                        </div>
                    }
                </React.Fragment>

            </Content>

            {!loading ? <PageFooter {...(footer ? footer[0].props : {})} /> : null}
        </React.Fragment>
    )
});

PageTemplate.propTypes = {
    children: PropTypes.any,
    rootStore: PropTypes.object,
    loading: PropTypes.bool,
    isError: PropTypes.bool,
    empty: PropTypes.bool,
    emptyRenderer: PropTypes.any
}

export default defaultTemplate(PageTemplate);