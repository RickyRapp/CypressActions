import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    NumericInputField,
    SimpleBaasicTable,
    FormatterResolver,
    BaasicButton,
    BasicInput,
    BaasicModal
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { Content, EditFormLayout } from 'core/layouts';
import { TransferConfirmTemplate } from 'themes/application/donor/donor-donor/components';

const DonorDonorCreateTemplate = function ({ donorDonorCreateViewStore, t }) {
    const {
        contentLoading,
        form,
        grantAcknowledgmentTypeDropdownStore,
        //donor,
        donorBalance,
        recentTransfersTableStore,
        loaderStore,
        grantAcknowledgmentName,
        onSubmitClick,
        confirmModal
    } = donorDonorCreateViewStore;

    return (
        <React.Fragment>
            <EditFormLayout store={donorDonorCreateViewStore} loading={loaderStore.loading} layoutFooterVisible={false}>
                <Content loading={contentLoading}>
                    <div className="row row--form">
                        <div className="col col-sml-12 col-xxlrg-6">
                            <div className="card--primary card--med u-mar--bottom--med">
                                <h2>{t('DONOR-DONOR.CREATE.FROM_TITLE')}</h2>
                                <h4 className=" u-mar--bottom--lrg">{t('DONOR-DONOR.CREATE.TITLE_LABEL')}</h4>

                                <div className="row row--form u-mar--bottom--sml">
                                    <div className="form__group col col-sml-12">

                                        <span className="type--base type--wgt--medium type--color--text">
                                            {t('DONOR-DONOR.CREATE.BALANCE')}:{' '}
                                            {donorBalance && (
                                                <FormatterResolver
                                                    item={{ balance: donorBalance.availableBalance }}
                                                    field="balance"
                                                    format={{ type: 'currency' }}
                                                />
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <h2>{t('DONOR-DONOR.CREATE.SEND_TO')}:</h2>
                                <h4 className=" u-mar--bottom--med">{t('DONOR-DONOR.CREATE.SEND_TO_INFO_TITLE')}</h4>
                                <div className="row row--form">
                                    <div className="col col-sml-7 col-med-9 col-xlrg-7 u-mar--bottom--sml">
                                        <BasicInput field={form.$('contactInformationEmail')} />
                                    </div>
                                    <div className="col col-sml-5 col-med-3 col-xlrg-5 u-mar--bottom--sml">
                                        <BasicInput field={form.$('contactInformationName')} />
                                    </div>
                                    <div className="u-mar--bottom--med">
                                        <div className="col col-sml-12 col-med-12 col-xlrg-12 u-mar--bottom--sml">
                                            <h4>+ {t('DONOR-DONOR.CREATE.ADD_ANOTHER_RECIPIENT')}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="row row--form">
                                    <div className="form__group col col-sml-12">
                                        <BaasicFieldDropdown
                                            field={form.$('grantAcknowledgmentTypeId')}
                                            store={grantAcknowledgmentTypeDropdownStore}
                                        />
                                    </div>
                                    {grantAcknowledgmentName && (
                                        <div className="form__group col col-sml-12">
                                            <div className="charity-information__card charity-information__card--secondary">
                                                {grantAcknowledgmentName}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="row row--form">
                                    <div className="form__group col col-sml-12 col-lrg-6">
                                        <NumericInputField field={form.$('amount')} />
                                    </div>
                                </div>
                                <div className="u-mar--top--sml u-mar--bottom--sml type--right">
                                    <BaasicButton                                             
                                            type="button"
                                            className="btn btn--med btn--med--wide btn--secondary"
                                            onClick={onSubmitClick}
                                            icon={form.validating ? 'synchronize-arrows-1 rotate' : ''} 
                                            form={form} onSubmit={onSubmitClick} 
                                            label="DONOR-DONOR.CREATE.BUTTON.CREATE" />
                                </div>
                            </div>
                        </div>
                        <div className="col col-sml-12 col-xxlrg-6 u-hide--to--med">
                            <div className="card--primary card--med u-mar--bottom--med">
                                <h3 className=" u-mar--bottom--med">{t('DONOR-DONOR.CREATE.TRANSFERS')}</h3>
                                <div className="row row--form u-mar--bottom--med">
                                    <div className="col col-sml-12 col-lrg-12">
                                        <div className="card--med card--primary">
                                            <h4 className="type--base type--wgt--medium u-mar--bottom--med">
                                                {t('DONOR-DONOR.CREATE.RECENT_TRANSFERS')}
                                            </h4>
                                            <SimpleBaasicTable tableStore={recentTransfersTableStore} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row row--form u-mar--bottom--med">
                                    <div className="col col-sml-12 col-lrg-12">
                                        <div className="card--primary card--med">
                                            <h4 className="type--base type--wgt--medium u-mar--bottom--med type--color--note">
                                                {t('DONOR-DONOR.CREATE.FAQ')}
                                            </h4>
                                            <div className="u-mar--bottom--med">
                                                <h4>{t('DONOR-DONOR.CREATE.FAQ_WHAT_IS_GIFT')}</h4>
                                                <span>{t('DONOR-DONOR.CREATE.FAQ_WHAT_IS_GIFT_ANSWER')}</span>
                                            </div>
                                            <div className="u-mar--bottom--med">
                                                <h4>{t('DONOR-DONOR.CREATE.FAQ_NON_EXISTING_DONOR')}</h4>
                                                <span>{t('DONOR-DONOR.CREATE.FAQ_NON_EXISTING_DONOR_ANSWER')}</span>
                                            </div>
                                            <div className="u-mar--bottom--med">
                                                <h4>{t('DONOR-DONOR.CREATE.FAQ_WRONG_EMAIL_ADDRESS')}</h4>
                                                <span>{t('DONOR-DONOR.CREATE.FAQ_WRONG_EMAIL_ADDRESS_ANSWER')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </Content>
            </EditFormLayout>
            <BaasicModal modalParams={confirmModal}>
                <TransferConfirmTemplate form={form} />
            </BaasicModal>
        </React.Fragment>

    );
};

DonorDonorCreateTemplate.propTypes = {
    donorDonorCreateViewStore: PropTypes.object.isRequired,
    confirmModal: PropTypes.any,
    form: PropTypes.object,
    onSubmitClick: PropTypes.func,
    t: PropTypes.func.isRequired,
};

// function renderEditLayoutFooterContent({ form }) {
//     return (
//         <div className="u-mar--top--sml u-mar--bottom--sml type--right">
//             <BaasicFormControls form={form} onSubmit={onSubmitClick} label="DONOR-DONOR.CREATE.BUTTON.CREATE" />
//         </div>
//     );
// }

// renderEditLayoutFooterContent.propTypes = {
//     form: PropTypes.any,
// };

export default defaultTemplate(DonorDonorCreateTemplate);
