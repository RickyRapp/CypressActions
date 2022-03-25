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
    BaasicModal
} from 'core/components';
import NumberFormat from 'react-number-format';
import { BarcodeFormat } from '@zxing/library';
import { charityFormatter } from 'core/utils';
import {
    CharityBankAccountList,
    CharityAddressListTable,
    CharityDescription,
    CharityUploadLogo,
    CharityUploadPhoto
} from 'application/charity/charity/components';
import { CharityWithdrawFund } from 'application/administration/charity/components';
import QRCode from 'qrcode.react';

function CharityGeneralDataTemplate({ charityGeneralDataViewStore, t }) {
    const {
        form,
        item,
        charityTypeDropdownStore,
        charityStatusDropdownStore,
        withdrawFundModalParams,
        openWithdrawFundModalClick,
        isEditEnabled,
        onEnableEditClick,
        downloadQrCode,
        copyToClipboard
    } = charityGeneralDataViewStore;

    return (
        <div className="card--primary card--med u-mar--bottom--sml">
            <EditFormContent form={form}>
                <div className="row">
                    <div className="col col-sml-12 col-lrg-3">
                        <h3 className=" u-mar--bottom--med">
                            {t('CHARITY.EDIT.FIELDS.TITLE')}
                        </h3>
                    </div>
                    {isEditEnabled ? (
                        <React.Fragment>
                            <div className='col col-sml-12 col-lrg-12'>
                                <div className='card--med card--primary'>
                                    {item && item.availableBalance > 0 &&
                                        <BaasicButton
                                            authorization={'theDonorsFundAdministrationSection.update'}
                                            className="btn btn--sml btn--sml--wide btn--primary u-push"
                                            label="CHARITY.EDIT.BUTTON.WITHDRAW_FUNDS"
                                            onClick={openWithdrawFundModalClick}
                                        />}
                                    <div className="row row--form u-mar--bottom--med">
                                        <div className="form__group col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                            <div>
                                                <div className="u-mar--bottom--sml">
                                                    <label className="form__group__label u-mar--right--tny">{t('CHARITY.EDIT.FIELDS.CHARITY_ACCOUNT_NUMBER')}</label>
                                                    <p>
                                                        {item &&
                                                            <NumberFormat displayType="text" value={item.charityAccountNumber} />}
                                                    </p>
                                                </div>

                                                <div className="u-mar--bottom--sml">
                                                    <label className="form__group__label u-mar--right--tny">{t('CHARITY.EDIT.FIELDS.CHARITY_TAX_ID')}</label>
                                                    <p>
                                                        {item &&
                                                            <NumberFormat format="##-#######" displayType="text" value={item.taxId} />}
                                                    </p>
                                                </div>

                                                <div className="u-mar--bottom--sml">
                                                    <label className="form__group__label">
                                                        {t('CHARITY.EDIT.FIELDS.CHARITY_API_KEY')}
                                                        {item && item.apiKey && <BaasicButton
                                                            className="btn btn--icon"
                                                            onlyIconClassName="u-mar--left--tny"
                                                            icon="u-icon u-icon--clipboard u-icon--base"
                                                            label="Copy to clipboard"
                                                            onlyIcon={true}
                                                            onClick={copyToClipboard}
                                                            ></BaasicButton>} </label>
                                                    <p className="type--break--word">
                                                        {item && item.apiKey}
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                            <label className="form__group__label ">
                                                {t('CHARITY.EDIT.FIELDS.CHARITY_QR_CODE')}
                                                <BaasicButton
                                                type="button"
                                                onlyIconClassName="u-mar--left--tny"
                                                className="btn btn--icon"
                                                onClick={downloadQrCode}
                                                onlyIcon={true}
                                                label="Download"
                                                icon="u-icon u-icon--download u-icon--base"
                                                />

                                            </label>
                                            <div className="u-mar--top--sml">
                                                {item &&
                                                    <QRCode
                                                        id='charity-qr'
                                                        value={charityFormatter.format(item.taxId, { value: 'tax-id' })}
                                                        size={70}
                                                        includeMargin={false}
                                                    />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row row--form u-mar--bottom--med">
                                        <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
                                            <BasicInput field={form.$('name')} disabled={true} />
                                        </div>
                                        <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
                                            <BasicInput field={form.$('dba')} />
                                        </div>
                                        <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
                                            <BaasicFieldDropdown field={form.$('charityTypeId')} store={charityTypeDropdownStore} />
                                        </div>
                                        <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
                                            <BaasicFieldDropdown field={form.$('charityStatusId')} store={charityStatusDropdownStore} />
                                        </div>
                                        <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
                                            <BasicInput field={form.$('url')} />
                                        </div>
                                    </div>
                                    <div className="u-mar--bottom--sml">
                                        <h3 className="type--med type--wgt--medium">Contact info</h3>
                                        <div className="row row--form">
                                            <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
                                                <BasicInput field={form.$('contactInformationName')} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
                                                <BasicInput field={form.$('contactInformationEmail')} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
                                                <NumberFormatInputField field={form.$('contactInformationNumber')} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col col-sml-12 info-card--footer">
                                        <BaasicButton
                                            type="button"
                                            className="btn btn--med btn--med--wide btn--ghost u-mar--right--sml"
                                            onClick={onEnableEditClick}
                                            label="Cancel"
                                        />
                                        <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    ) : (
                        <div className="col col-sml-12 col-lrg-9" title="Click to edit" onClick={onEnableEditClick}>
                            <div className="row info-card--scale">
                                <div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
                                    <p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Name:</p>
                                    <p className="type--base type--wgt--bold">
                                        {item ? `${item.name}` : ''}
                                    </p>
                                </div>
                                <div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
                                    <p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">{t('CHARITY.EDIT.FIELDS.CHARITY_ACCOUNT_NUMBER')}</p>
                                    <p className="type--base type--wgt--bold">
                                        {item && item.charityAccountNumber}
                                    </p>
                                </div>
                                <div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
                                    <p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">{t('CHARITY.EDIT.FIELDS.CHARITY_TAX_ID')}</p>
                                    <p className="type--base type--wgt--bold"> {item && item.taxId}&nbsp; </p>
                                </div>
                                <div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
                                    <p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Contact Name:</p>
                                    <p className="type--base type--wgt--bold">{item && item.contactInformationName}</p>
                                </div>
                                <div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
                                    <p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Contact Email:</p>
                                    <p className="type--base type--wgt--bold">{item && item.contactInformationEmail}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </EditFormContent>

            <BaasicModal modalParams={withdrawFundModalParams}>
                <CharityWithdrawFund />
            </BaasicModal>

            <div className="row row__align--end">
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <CharityDescription />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <CharityAddressListTable />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <CharityBankAccountList />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <CharityUploadLogo />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <CharityUploadPhoto />
                </div>
            </div>

        </div>

    )
}

CharityGeneralDataTemplate.propTypes = {
    charityGeneralDataViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(CharityGeneralDataTemplate);
