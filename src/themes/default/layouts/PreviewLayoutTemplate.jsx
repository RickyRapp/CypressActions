import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {defaultTemplate} from 'core/hoc';
import { BaasicButton, PreviewContent} from 'core/components';
import {Page, PageFooter} from 'core/layouts';
import {getPageObject} from 'core/utils';

function PreviewLayoutTemplate({ store, children, t, layoutFooterVisible, loading }) {
    const {
        rootStore,
        routes,
        authorization,
        loaderStore
    } = store;

    const { header, footer, content, navigation } = getPageObject(children);
    return (
        <Page loading={!_.isNil(loading) ? loading : loaderStore.loading} >
            {navigation}
            {header}
            {content.header}
            {content.sidebar}
            <PreviewContent>
                    {content.children}
            </PreviewContent>
            {content.footer}
            {renderPreviewLayoutFooterContent({
                footer,
                authorization,
                routes,
                visible: layoutFooterVisible,
                t,
                goBack: () => rootStore.routerStore.goBack()
            })}
        </Page>
    );
}

function renderPreviewLayoutFooterContent({ footer, authorization, visible, routes, goBack, t }) {
    return visible ? (
        footer
            ? footer
            : (
                <PageFooter>
                    <div>
                        <BaasicButton
                            authorization={authorization ? authorization.update : null}
                            className="btn btn--base btn--primary u-mar--right--sml"
                            onClick={routes.edit}
                            icon=''
                            label={t('PREVIEW_LAYOUT.EDIT_BUTTON')}
                        />
                        <BaasicButton
                            className='btn btn--base btn--ghost'
                            label={t('PREVIEW_LAYOUT.CANCEL_BUTTON')}
                            onClick={goBack}
                        />
                    </div>
                </PageFooter>
            )
    ) : null
}

PreviewLayoutTemplate.propTypes = {
    store: PropTypes.object,
    loading: PropTypes.bool,
    layoutFooterVisible: PropTypes.bool,
    children: PropTypes.any,
    t: PropTypes.func
};

PreviewLayoutTemplate.defaultProps = {
    layoutFooterVisible: true
};

export default defaultTemplate(PreviewLayoutTemplate);
