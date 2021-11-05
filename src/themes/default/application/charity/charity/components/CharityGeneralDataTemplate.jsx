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
import { CharityWithdrawFund } from 'application/charity/charity/components';

function CharityGeneralDataTemplate({ charityGeneralDataViewStore, t }) {
    const {
        form,
        item,
        charityTypeDropdownStore,
        charityStatusDropdownStore,
        withdrawFundModalParams,
        openWithdrawFundModalClick
    } = charityGeneralDataViewStore;

    return (
        <React.Fragment>
            <EditFormContent form={form}>
                <div className="card--primary card--med u-mar--bottom--sml u-mar--top--sml">
                    <div className="row row--form">
                        <div className="col col-sml-12 col-lrg-12">
                            <div className="u-mar--bottom--lrg">
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
                                <div className="row row--form">
                                    <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-2 u-mar--bottom--sml">
                                        <div className="">
                                            <label className="form__group__label u-mar--right--tny">Tax ID:</label>
                                            {item &&
                                                <NumberFormat format="##-#######" displayType="text" value={item.taxId} />}
                                            <br />
                                            <label className="form__group__label">Api Key: </label>
                                            {item && item.apiKey}&nbsp;
                                            {item && item.apiKey && <BaasicButton
                                                className="btn btn--icon"
                                                onlyIconClassName="u-mar--right--tny"
                                                icon="u-icon u-icon--clipboard u-icon--base"
                                                label="Copy to clipboard"
                                                onlyIcon={true}
                                                onClick={() => navigator.clipboard.writeText(item.apiKey)}
                                            ></BaasicButton>}
                                        </div>
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-2 u-mar--bottom--sml">
                                        {item &&
                                            <Barcode
                                                type={BarcodeFormat.QR_CODE}
                                                value={charityFormatter.format(item.taxId, { value: 'tax-id' })}
                                                height={100}
                                                width={100}
                                            />}
                                    </div>
                                </div>
                                <div className="row row--form">
                                    <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-3 u-mar--bottom--sml">
                                        <BasicInput field={form.$('name')} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-3 u-mar--bottom--sml">
                                        <BasicInput field={form.$('dba')} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-3 u-mar--bottom--sml">
                                        <BaasicFieldDropdown field={form.$('charityTypeId')} store={charityTypeDropdownStore} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-3 u-mar--bottom--sml">
                                        <BaasicFieldDropdown field={form.$('charityStatusId')} store={charityStatusDropdownStore} />
                                    </div>
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
