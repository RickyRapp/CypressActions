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
import { CharityBankAccountList, 
        CharityAddressListTable, 
        CharityDescription, 
        CharityUploadLogo ,
        CharityUploadPhoto
} from 'application/charity/charity/components';
import { CharityWithdrawFund } from 'application/administration/charity/components';

function CharityGeneralDataTemplate({ charityGeneralDataViewStore, t }) {
    const {
        form,
        item,
        charityTypeDropdownStore,
        charityStatusDropdownStore,
        withdrawFundModalParams,
        openWithdrawFundModalClick,
        isEditEnabled,
        onEnableEditClick
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
                                        <BasicInput field={form.$('name')} disabled={true} />
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
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Tax Id:</p>
									<p className="type--base type--wgt--bold">
										{item && item.taxId}
									</p>
								</div>
								<div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Api Key:</p>
									<p className="type--base type--wgt--bold"> {item && item.apiKey}&nbsp; </p>
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
                </div><div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                     <CharityUploadLogo />
                </div><div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                     <CharityUploadPhoto />
                </div><div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <CharityAddressListTable />
                </div><div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <CharityBankAccountList />
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
