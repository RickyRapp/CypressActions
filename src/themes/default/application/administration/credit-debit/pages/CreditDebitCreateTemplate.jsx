import React from 'react';
import PropTypes from 'prop-types';
import { NumericInputField, BaasicFormControls, BasicTextArea, BaasicFieldSwitch } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { Content, EditFormLayout } from 'core/layouts';

const CreditDebitCreateTemplate = function ({ creditDebitCreateViewStore, t }) {
    const {
        contentLoading,
        form,
        donor,
        loaderStore,
    } = creditDebitCreateViewStore;

    return (
        <React.Fragment>
            <EditFormLayout store={creditDebitCreateViewStore} loading={loaderStore.loading} layoutFooterVisible={false}>
                <Content loading={contentLoading}>
                    <div className="row row--form">
                        <div className="col col-sml-12 col-xxlrg-6">
                            <h3 className=" u-mar--bottom--med">{t('CREDIT_DEBIT.CREATE.FROM_TITLE')}</h3>
                            <div className="card--primary card--med u-mar--bottom--med">
                                <div className="row">
                                    <div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                                        <div className="type--base type--wgt--medium type--color--note">{donor && donor.donorName ? t('CREDIT_DEBIT.PREVIEW.FIELDS.DONOR_NAME_LABEL') : t('CREDIT_DEBIT.PREVIEW.FIELDS.CHARITY_NAME_LABEL')}</div>
                                        <span className="input--preview--uppercase">
                                            {donor && <React.Fragment>{donor.donorName}</React.Fragment>}
                                            {donor && <React.Fragment>{donor.charityName}</React.Fragment>}
                                        </span>
                                    </div>
                                    <div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                                        <div className="type--base type--wgt--medium type--color--note">{t('CREDIT_DEBIT.PREVIEW.FIELDS.PRESENT_BALANCE')}</div>
                                        <span className="input--preview">
                                            {donor && <React.Fragment>{donor.presentBalance}</React.Fragment>}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="form__group col col-sml-12 col-lrg-12 col-xxlrg-12 u-align--self--end">
                                <BaasicFieldSwitch field={form.$('isDebit')} regular={true} />
                            </div>
                            <div className="card--primary card--med u-mar--bottom--med">
                                <div className="row row--form">
                                    <div className="form__group col col-sml-12">
                                        <NumericInputField field={form.$('amount')} />
                                    </div>
                                </div>
                                <div className="row row--form">
                                    <div className="form__group col col-sml-12">
                                        <BasicTextArea field={form.$('description')} label="Description" placeholder="Credit description" />
                                    </div>
                                </div>
                                {renderEditLayoutFooterContent({ form })}
                            </div>
                        </div>
                    </div>
                </Content>
            </EditFormLayout >
        </React.Fragment >
    )
};

CreditDebitCreateTemplate.propTypes = {
    creditDebitCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderEditLayoutFooterContent({ form }) {
    return <div className="u-mar--top--sml u-mar--bottom--sml type--right">
        <BaasicFormControls form={form} onSubmit={form.onSubmit} label='CREDIT_DEBIT.CREATE.BUTTON.CREATE' />
    </div>
}

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any
};

export default defaultTemplate(CreditDebitCreateTemplate);
