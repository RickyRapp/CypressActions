import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BaasicButton,
    BasicInput,
    BasicFieldCheckbox
} from 'core/components'
import { PageFooter } from 'core/layouts';

const TestReportCreateTemplate = function ({ t, testReportCreateViewStore }) {
    const {
        loaderStore,
        form,
        item,
        needName,
        setAllCustom
    } = testReportCreateViewStore;

    return (
        <section>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h5 className="type--lrg type--wgt--bold u-mar--bottom--sml">{t('TEST.TEST_REPORT.CREATE.TITLE')}</h5>
                <h3 className=" type--color--note u-mar--bottom--tny">{item.name}</h3>
                <div className="row">
                    {needName &&
                        <div className="form__group col col-lrg-12">
                            <BasicInput field={form.$('name')} />
                        </div>}

                    <div className="form__group col col-lrg-12">
                        <BasicFieldCheckbox field={form.$('isPreviewPrintInModal')} />
                    </div>
                </div>
            </EditFormContent>
            <PageFooter>
                <div className="u-display--flex u-push">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                    <div className="u-mar--left--sml">
                        <BaasicButton
                            className="btn btn--med btn--med--wide btn--ghost"
                            label='Set all custom data'
                            onClick={setAllCustom}
                        />
                    </div>
                </div>
            </PageFooter>
        </section>
    )
}

TestReportCreateTemplate.propTypes = {
    testReportCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(TestReportCreateTemplate);
