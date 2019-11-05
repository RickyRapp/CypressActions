import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { BaasicFormControls, BaasicButton, EditFormContent } from 'core/components';
import { Page, PageFooter } from 'core/layouts';
import { defaultTemplate } from 'core/hoc';
import { getPageObject } from 'core/utils';

function EditFormLayoutTemplate({ store, children, t, layoutFooterVisible, loading }) {
    const {
        rootStore,
        form,
        loaderStore
    } = store;
    const { header, footer, content } = getPageObject(children);

    return (
        <Page loading={!_.isNil(loading) ? loading : loaderStore.loading} >
            {header}
            {content.header}
            {content.sidebar}
            <EditFormContent form={form}>
                {content.children}
            </EditFormContent>
            {content.footer}
            {renderEditLayoutFooterContent({
                footer,
                form,
                visible: layoutFooterVisible,
                t,
                goBack: () => rootStore.routerStore.goBack()
            })}
        </Page>
    );
}

function renderEditLayoutFooterContent({ footer, form, visible, goBack, t }) {
    return visible ? (
        footer
            ? footer
            : (
                <PageFooter>
                    <div>
                        <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                        <BaasicButton
                            className='btn btn--base btn--ghost'
                            label={t('EDIT_FORM_LAYOUT.CANCEL')}
                            onClick={goBack}
                        />
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
    t: PropTypes.func
};

EditFormLayoutTemplate.defaultProps = {
    layoutFooterVisible: true
};

export default defaultTemplate(EditFormLayoutTemplate);
