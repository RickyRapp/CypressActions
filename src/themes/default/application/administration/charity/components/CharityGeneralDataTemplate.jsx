import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicFormControls,
    EditFormContent,
    NumberFormatInputField,
    Barcode,
    BaasicButton,
    BaasicModal,
    BasicFieldCheckbox,
    BasicCheckbox
} from 'core/components';
import NumberFormat from 'react-number-format';
import { BarcodeFormat } from '@zxing/library';
import { charityFormatter } from 'core/utils';
import { CharityWithdrawFund } from 'application/administration/charity/components';

function CharityGeneralDataTemplate({ charityGeneralDataViewStore, t }) {
    const {
        form,
        item,
        charityTypeDropdownStore,
        charityStatusDropdownStore,
        withdrawFundModalParams,
        openWithdrawFundModalClick,
        regenerateApiKey,
        copyToClipboard
    } = charityGeneralDataViewStore;

    return (
        <React.Fragment>
            <EditFormContent form={form}>
                <div className="card--primary card--med u-mar--bottom--sml u-mar--top--sml">
                    <div className="row">
                        <div className="col col-sml-12 col-lrg-12">
                            <div className="u-mar--bottom--sml">
                                <div className="u-mar--bottom--med">
                                    <h3 className="type--med type--wgt--medium" style={{ display: 'inline' }}>
                                        {t('CHARITY.EDIT.FIELDS.TITLE')}
                                    </h3>
                                    {item && item.availableBalance > 0 &&
                                        <BaasicButton
                                            authorization={'theDonorsFundAdministrationSection.update'}
                                            className="btn btn--sml btn--sml--wide btn--primary u-push"
                                            label="CHARITY.EDIT.BUTTON.WITHDRAW_FUNDS"
                                            onClick={openWithdrawFundModalClick}
                                        />}
                                </div>
                                <div className="flex flex--primary w--100">
                                    <div className="form__group">
                                        <div>
                                            <label className="form__group__label">{t('CHARITY.EDIT.FIELDS.CHARITY_ACCOUNT_NUMBER')} </label>
                                            {item &&
                                                <NumberFormat displayType="text" value={item.charityAccountNumber} />}
                                            <br />
                                            <label className="form__group__label">{t('CHARITY.EDIT.FIELDS.CHARITY_TAX_ID')} </label>
                                            {item &&
                                                <NumberFormat format="##-#######" displayType="text" value={item.taxId} />}
                                            <br />
                                            <label className="form__group__label"> {t('CHARITY.EDIT.FIELDS.CHARITY_API_KEY')} </label>
                                            {item && item.apiKey}&nbsp; 
                                            {item && item.apiKey && <BaasicButton
                                                className="btn btn--icon"
                                                onlyIconClassName="u-mar--right--tny"
                                                icon="u-icon u-icon--clipboard u-icon--base"
                                                label="Copy to clipboard"
                                                onlyIcon={true}
                                                onClick={ copyToClipboard }
                                            ></BaasicButton>}
                                            {item && (item.apiKey && (
                                                <div className="form__group__label">
                                                <BaasicButton
                                                    className="btn btn--secondary btn--sml btn--sml"
                                                    label="Regenerate API Key"
                                                    onClick={ regenerateApiKey }
                                                ></BaasicButton>
                                            </div>
                                            ))}
                                            
                                        </div>
                                    </div>
                                    <div className="form__group">
                                        {item &&
                                            <Barcode
                                                type={BarcodeFormat.QR_CODE}
                                                value={charityFormatter.format(item.taxId, { value: 'tax-id' })}
                                                height={150}
                                                width={150}
                                            />}
                                    </div>
                                </div>
                                <div className="row row--form">
                                    <div className="form__group col col-sml-12 col-med-6 col-lrg-6 u-mar--bottom--sml">
                                        <BasicInput field={form.$('name')} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-med-6 col-lrg-6 u-mar--bottom--sml">
                                        <BasicInput field={form.$('dba')} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                        <BaasicFieldDropdown field={form.$('charityTypeId')} store={charityTypeDropdownStore} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                        <BaasicFieldDropdown field={form.$('charityStatusId')} store={charityStatusDropdownStore} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                        <BasicInput field={form.$('url')} />
                                    </div>
                                </div>
                            </div>
                            <div className="u-mar--bottom--sml ">
                                <h3 className="type--med type--wgt--medium u-mar--bottom--med">Contact info</h3>
                                <div className="row row--form">
                                    <div className="form__group col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                                        <BasicInput field={form.$('contactInformationName')} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                                        <BasicInput field={form.$('contactInformationEmail')} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                                        <NumberFormatInputField field={form.$('contactInformationNumber')} />
                                    </div>
                                </div>
                            </div>
                            <div className="u-mar--bottom--sml ">
                                <h3 className="type--med type--wgt--medium u-mar--bottom--med">Online User</h3>

                                <h3 className=" u-mar--bottom--med">
                                    {item &&
                                        <BasicCheckbox
                                            checked={item.hasCoreUser}
                                            label={t("CHARITY.CREATE.FIELDS.IS_ONLINE_ACCOUNT_ENABLED_LABEL")}
                                            showLabel={true}
                                        />
                                    }
                                    </h3>
                                <div className="row row--form">
                                    <div className="col col-sml-12 col-lrg-4">
                                    <label className="form__group__label" htmlFor="userName">
                                        UserName
                                    </label>
                                    {item && 
                                        <input
                                            className="input input--lrg input--text"
                                            id="userName"
                                            value={item.coreUsername}
                                            disabled={true}
                                        />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="u-mar--bottom--med u-push">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </EditFormContent>
            <BaasicModal modalParams={withdrawFundModalParams}>
                <CharityWithdrawFund />
            </BaasicModal>
        </React.Fragment>
    )
}

CharityGeneralDataTemplate.propTypes = {
    charityGeneralDataViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(CharityGeneralDataTemplate);
