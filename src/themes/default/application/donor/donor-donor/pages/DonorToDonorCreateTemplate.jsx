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

const DonorToDonorCreateTemplate = function ({ donorToDonorCreateViewStore, t }) {
    const {
        contentLoading,
        form,
        grantAcknowledgmentTypeDropdownStore,
        donorBalance,
        recentTransfersTableStore,
        loaderStore,
        grantAcknowledgmentName,
        onSubmitClick,
        addAnotherRecipient,
        confirmModal
    } = donorToDonorCreateViewStore;

    return (
        <React.Fragment>
            <EditFormLayout store={donorToDonorCreateViewStore} loading={loaderStore.loading} layoutFooterVisible={false}>
                <Content loading={contentLoading}>
                    <div className="row row--form">
                        <div className="col col-sml-12 col-xxlrg-6">
                            <div className="card--primary card--med u-mar--bottom--med">
                                <h2>{t('DONOR-DONOR.CREATE.FROM_TITLE')}</h2>
                                <h4 className=" u-mar--bottom--lrg">{t('DONOR-DONOR.CREATE.TITLE_LABEL')}</h4>

                                <div className="row row--form u-mar--bottom--sml">
                                    <div className="form__group col col-sml-12">
                                    <div className="type--center">
                                        <div className="dashboard-card__body--amount">
                                        {donorBalance && (
                                                <FormatterResolver
                                                    item={{ balance: donorBalance.availableBalance }}
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
                                <h2>{t('DONOR-DONOR.CREATE.SEND_TO')}:</h2>
                                <h4 className=" u-mar--bottom--med">{t('DONOR-DONOR.CREATE.SEND_TO_INFO_TITLE')}</h4>
                                <div className="row row--form">
                                    <div className="col col-sml-7 col-med-12 col-lrg-6 u-mar--bottom--sml">
                                        <BasicInput field={form.$('emailOrAccountNumber')} />
                                    </div>
                                    <div className="col col-sml-5 col-med-12 col-lrg-6 u-mar--bottom--sml">
                                        <BasicInput field={form.$('contactInformationName')} />
                                    </div>
                                    <div>
                                        <div className="col col-sml-12 col-med-12 col-xlrg-12 u-mar--bottom--sml">
                                            <a onClick={() => addAnotherRecipient(true)}>+ {t('DONOR-DONOR.CREATE.ADD_ANOTHER_RECIPIENT')}</a>
                                        </div>
                                    </div>
                                </div>
                                {/* {addAnotherRecipientForm && (
                                    <div className="row row--form u-mar--bottom--med">
                                        <div className="col col-sml-7 col-med-9 col-xlrg-7 u-mar--bottom--sml">
                                            <BasicInput field={form.$('emailOrAccountNumberAnother')} />
                                        </div>
                                        <div className="col col-sml-5 col-med-3 col-xlrg-5 u-mar--bottom--sml">
                                            <BasicInput field={form.$('contactInformationNameAnother')} />
                                        </div>
                                    </div>
                                )} */}
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
                                    <div className="form__group col col-sml-12 col-lrg-12">
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
                                        <div className="card--enh card--med">
                                        <h4 className="type--base type--wgt--medium u-mar--bottom--med type--color--note">
                                                {t('DONOR-DONOR.CREATE.FAQ')}
                                            </h4>
                                            <ul className="list--faq">
                                                <li className="list--faq__item js-faq-item">
                                                    <i className="list--faq__icon js-faq-icon is-expanded"></i>
                                                    <div className="list--faq__text">
                                                        <h4>{t('DONOR-DONOR.CREATE.FAQ_WHAT_IS_GIFT')}</h4>
                                                        <span className="js-faq-hidden list--faq__answer is-expanded">{t('DONOR-DONOR.CREATE.FAQ_WHAT_IS_GIFT_ANSWER')}</span>
                                                    </div>
                                                </li>

                                                <li className="list--faq__item js-faq-item">
                                                    <i className="list--faq__icon js-faq-icon"></i>
                                                    <div className="list--faq__text">
                                                        <h4>{t('DONOR-DONOR.CREATE.FAQ_NON_EXISTING_DONOR')}</h4>
                                                        <span className="js-faq-hidden list--faq__answer">{t('DONOR-DONOR.CREATE.FAQ_NON_EXISTING_DONOR_ANSWER')}</span>
                                                    </div>
                                                </li>

                                                <li className="list--faq__item js-faq-item">
                                                    <i className="list--faq__icon js-faq-icon"></i>
                                                    <div className="list--faq__text">
                                                        <h4>{t('DONOR-DONOR.CREATE.FAQ_WRONG_EMAIL_ADDRESS')}</h4>
                                                        <span className="js-faq-hidden list--faq__answer">{t('DONOR-DONOR.CREATE.FAQ_WRONG_EMAIL_ADDRESS_ANSWER')}</span>
                                                    </div>
                                                </li>
                                            </ul>
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

DonorToDonorCreateTemplate.propTypes = {
    donorToDonorCreateViewStore: PropTypes.object.isRequired,
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

export default defaultTemplate(DonorToDonorCreateTemplate);
