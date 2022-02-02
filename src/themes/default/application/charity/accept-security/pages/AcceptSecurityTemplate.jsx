import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    NumericInputField,
    //SimpleBaasicTable,
    FormatterResolver,
    BaasicButton,
    BasicInput,
    BaasicModal,
    BaasicDropdown
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { Content, EditFormLayout } from 'core/layouts';
import { TransferConfirmTemplate } from '../components';

const AcceptSecurityTemplate = function ({ acceptSecurityCreateViewStore, t }) {
    const {
        form,
        summaryInfo,
        brokerageInstitutionDropdownStore,
        searchDonorDropdownStore,
        securityTypeDropdownStore,
        balance,
        confirmModal,
        onSubmitClick
    } = acceptSecurityCreateViewStore;

    return (
        <React.Fragment>
            <EditFormLayout store={acceptSecurityCreateViewStore} loading={false} layoutFooterVisible={false}>
                <Content >
                    {!summaryInfo && <div className="row row--form">
                        <div className="col col-sml-12 col-xxlrg-6">
                            <div className="card--primary card--med u-mar--bottom--med">
                                <h2>{t('DONOR-DONOR.CREATE.FROM_TITLE')}</h2>
                                <h4 className=" u-mar--bottom--lrg">{t('DONOR-DONOR.CREATE.TITLE_LABEL')}</h4>
                                <div className="row row--form u-mar--bottom--sml">
                                    <div className="form__group col col-sml-12">
                                        <div className="type--center">
                                            <div className="dashboard-card__body--amount">
                                                {balance && (
                                                    <FormatterResolver
                                                        item={{ balance: balance }}
                                                        field="balance"
                                                        format={{ type: 'currency' }}
                                                    />
                                                )} 
                                            </div>
                                            <p className="type--uppercase">{t('DONOR-DONOR.CREATE.BALANCE')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card--primary card--med u-mar--bottom--med">
                                <h2>{t('ACCEPT-SECURITY.CREATE.DONOR_INFO')}</h2>
                                <h4 className=" u-mar--bottom--med">{t('ACCEPT-SECURITY.CREATE.DONOR_INFO_DESCRIPTION')}</h4>
                                <div className="row row--form">
                                    <div className="col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                                        <div className="form__group__label">Donor<span className="type--color--note u-mar--left--tny">*</span></div>
                                        <BaasicDropdown store={searchDonorDropdownStore} />
                                    </div>
                                </div>
                                
                                <div className="row row--form">
                                    <div className="form__group col col-sml-12">
                                        <BaasicFieldDropdown field={form.$('brokerageInstitutionId')} store={brokerageInstitutionDropdownStore} />
                                    </div>
                                </div>
                                <div className="row row--form">
                                    <div className="form__group col col-sml-12">
                                        <BaasicFieldDropdown field={form.$('securityTypeId')} store={securityTypeDropdownStore} />
                                    </div>
                                </div>
                                <div className="row row--form">
                                    <div className="form__group col col-sml-12 col-lrg-12">
                                        <BasicInput field={form.$('securitySymbol')} />
                                    </div>
                                </div>
                                <div className="row row--form">
                                    <div className="form__group col col-sml-12 col-lrg-12">
                                        <NumericInputField field={form.$('numberOfShares')} />
                                    </div>
                                </div>

                                <div className="row row--form">
                                    <div className="form__group col col-sml-12 col-lrg-12">
                                        <NumericInputField field={form.$('amount')} />
                                    </div>
                                </div>

                                <div className="type--right">
                                    <BaasicButton
                                        type="button"
                                        className="btn btn--med btn--med--wide btn--secondary"
                                        icon={form.validating ? 'synchronize-arrows-1 rotate' : ''}
                                        form={form} onSubmit={onSubmitClick}
                                        onClick={onSubmitClick}
                                        label="ACCEPT-SECURITY.CREATE.BUTTON_CREATE" />
                                </div>
                            </div>
                        </div>
                        <div className="col col-sml-12 col-xxlrg-6 u-hide--to--med">
                            <div className="card--primary card--med u-mar--bottom--med">
                                <h3 className=" u-mar--bottom--med">{t('ACCEPT-SECURITY.CREATE.STOCKS_AND_SECURITIES')}</h3>
                                <div className="row row--form u-mar--bottom--med">
                                    <div className="col col-sml-12 col-lrg-12">
                                        <div className="card--med card--primary">
                                            <h4 className="type--base type--wgt--medium u-mar--bottom--med">
                                                {t('ACCEPT-SECURITY.CREATE.RECENT_SECURITIES')}
                                            </h4>
                                            <div className="card--primary card--med type--center">
                                                <i className="u-icon u-icon--rounded u-icon--rounded--coming-soon"></i>
                                                <p className="type--lrg type--wgt--medium type--color--opaque u-mar--top--sml">Coming Soon</p>
                                            </div>
                                            {/* <SimpleBaasicTable tableStore={recentTransfersTableStore} /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                    {summaryInfo &&
                        <div>
                            <div className="row">
                                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--lrg">
                                    <h3 className=" type--color--note">{t('DONOR-DONOR.CONFIRMATION.SUCCESS')}</h3>
                                </div>
                            </div>
                            <div className="card--primary card--med u-mar--bottom--med">
                                <div>
                                    <h4 className="u-mar--bottom--sml">{t('DONOR-DONOR.CONFIRMATION.GIFT_SUMMARY')}</h4>

                                    <div className="card--tny card--secondary u-mar--bottom--sml">
                                        <div className="row">
                                            <div className="col col-sml-12 col-lrg-6">
                                                <span className="type--base type--wgt--medium type--color--opaque">
                                                    {t('DONOR-DONOR.CONFIRMATION.RECIPIENT_INFO')}
                                                </span>
                                            </div>
                                            <div className="col col-sml-12 col-lrg-6 type--right--from--med">
                                                <span className="type--base type--wgt--bold">
                                                    {form.$('emailOrAccountNumber').value}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card--tny card--secondary u-mar--bottom--sml">
                                        <div className="row">
                                            <div className="col col-sml-12 col-lrg-6">
                                                <span className="type--base type--wgt--medium type--color--opaque">
                                                    {t('DONOR-DONOR.CONFIRMATION.RECIPIENT_NAME')}
                                                </span>
                                            </div>
                                            <div className="col col-sml-12 col-lrg-6 type--right--from--med">
                                                <span className="type--base type--wgt--bold">
                                                    {form.$('contactInformationName').value}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {form.$('emailOrAccountNumberAnother').value &&
                                        <div className="card--tny card--secondary u-mar--bottom--sml">
                                            <div className="row">
                                                <div className="col col-sml-12 col-lrg-6">
                                                    <span className="type--base type--wgt--medium type--color--opaque">
                                                        {t('DONOR-DONOR.CONFIRMATION.ANOTHER_RECIPIENT')}
                                                    </span>
                                                </div>
                                                <div className="col col-sml-12 col-lrg-6 type--right--from--med">
                                                    <span className="type--base type--wgt--bold">
                                                        {form.$('emailOrAccountNumberAnother').value}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {form.$('contactInformationNameAnother').value &&
                                        <div className="card--tny card--secondary u-mar--bottom--sml">
                                            <div className="row">
                                                <div className="col col-sml-12 col-lrg-6">
                                                    <span className="type--base type--wgt--medium type--color--opaque">
                                                        {t('DONOR-DONOR.CONFIRMATION.ANOTHER_RECIPIENT_NAME')}
                                                    </span>
                                                </div>
                                                <div className="col col-sml-12 col-lrg-6 type--right--from--med">
                                                    <span className="type--base type--wgt--bold">
                                                        {form.$('contactInformationNameAnother').value}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <div className="card--tny card--secondary">
                                        <div className="row">
                                            <div className="col col-sml-12 col-lrg-6">
                                                <span className="type--base type--wgt--medium type--color--opaque">
                                                    {t('DONOR-DONOR.CONFIRMATION.AMOUNT')}
                                                </span>
                                            </div>
                                            <div className="col col-sml-12 col-lrg-6 type--right--from--med">
                                                <span className="type--base type--wgt--bold">
                                                    <FormatterResolver
                                                        item={{ amount: form.$('amount').value }}
                                                        field="amount"
                                                        format={{ type: 'currency' }}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    }
                </Content>
            </EditFormLayout>
            <BaasicModal modalParams={confirmModal}>
                <TransferConfirmTemplate form={form} />
            </BaasicModal>
        </React.Fragment>
    );
};

AcceptSecurityTemplate.propTypes = {
    acceptSecurityCreateViewStore: PropTypes.object.isRequired,
    confirmModal: PropTypes.any,
    form: PropTypes.object,
    //onSubmitClick: PropTypes.func,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(AcceptSecurityTemplate);
