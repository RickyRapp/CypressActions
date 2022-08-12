import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { BaasicFormControls, BaasicButton, EditFormContent } from 'core/components';
import { Page, PageFooter } from 'core/layouts';
import { defaultTemplate } from 'core/hoc';
import { getPageObject } from 'core/utils';

function EditFormLayoutTemplate({ store, children, t, layoutFooterVisible, loading, footerClassName, contentClassName }) {
    const {
        rootStore,
        form,
        loaderStore,
    } = store;
    const { header, footer, content } = getPageObject(children);

    return (
        <Page loading={!_.isNil(loading) ? loading : loaderStore.loading} >
            {header}
            {content.header}
            {content.sidebar}
            <EditFormContent className={contentClassName} form={form}>
                {content.children}
            </EditFormContent>
            {content.footer}
            {renderEditLayoutFooterContent({
                footer,
                form,
                visible: layoutFooterVisible,
                footerClassName,
                t,
                goBack: () => rootStore.routerStore.goBack()
            })}
        </Page>
    );
}

function renderEditLayoutFooterContent({ footerClassName, footer, form, visible, goBack, t }) {
    return visible ? (
        footer
            ? footer
            : (
                <PageFooter>
                    <div className={footerClassName ? footerClassName : ""}>
                        <BaasicButton
                            className='btn btn--med btn--med--wide btn--primary u-mar--right--sml'
                            label={t('EDIT_FORM_LAYOUT.CANCEL')}
                            onClick={goBack}
                        />
                          <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                      
                    </div>
                </PageFooter>
            )
    ) : null
}

EditFormLayoutTemplate.propTypes = {
    store: PropTypes.object,
    loading: PropTypes.bool,
    layoutFooterVisible: PropTypes.bool,
    children: PropTypes.any,
    contentClassName: PropTypes.string,
    footerClassName: PropTypes.string,
    t: PropTypes.func
};

EditFormLayoutTemplate.defaultProps = {
    layoutFooterVisible: true
};

export default defaultTemplate(EditFormLayoutTemplate);
