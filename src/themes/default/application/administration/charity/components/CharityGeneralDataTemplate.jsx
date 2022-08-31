import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicFormControls,
    EditFormContent,
    NumberFormatInputField,
    BaasicButton,
    BaasicModal,
    BasicCheckbox
} from 'core/components';
import { CharityWithdrawFund } from 'application/administration/charity/components';
import CharityBarcodeCardTemplate from './CharityBarcodeCardTemplate';

function CharityGeneralDataTemplate({ charityGeneralDataViewStore, t }) {
    const {
        form,
        item,
        charityTypeDropdownStore,
        charityStatusDropdownStore,
        withdrawFundModalParams,
        openWithdrawFundModalClick,
        url,
        verifyCharityUserAccount
    } = charityGeneralDataViewStore;

    return (
        <React.Fragment>
            <EditFormContent className={"container--sml u-padd--bottom--med"} form={form}>
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
                                
                                <CharityBarcodeCardTemplate charityGeneralDataViewStore={charityGeneralDataViewStore} t={t}  />

                                <div className="row row--form">
                                    <div className="form__group col col-sml-12 col-med-6 col-lrg-6 u-mar--bottom--sml">
                                        <BasicInput field={form.$('name')} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-med-6 col-lrg-6 u-mar--bottom--sml">
                                        <BasicInput field={form.$('dba')} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-med-6 u-mar--bottom--sml">
                                        <BaasicFieldDropdown field={form.$('charityTypeId')} store={charityTypeDropdownStore} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-med-6 u-mar--bottom--sml">
                                        <BaasicFieldDropdown field={form.$('charityStatusId')} store={charityStatusDropdownStore} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-med-6 u-mar--bottom--sml">
                                        <BasicInput field={form.$('url')} />
                                    </div>
                                </div>
                            </div>
                            <div className="u-mar--bottom--sml ">
                                <h3 className="type--med type--wgt--medium u-mar--bottom--med">Contact info</h3>
                                <div className="row row--form">
                                    <div className="form__group col col-sml-12 col-med-6 u-mar--bottom--sml">
                                        <BasicInput field={form.$('contactInformationName')} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-med-6 u-mar--bottom--sml">
                                        <BasicInput field={form.$('contactInformationEmail')} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-med-6 u-mar--bottom--sml">
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
                                    <div className="col col-sml-12 col-lrg-6">
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
                                    <div className="col col-sml-12 col-lrg-6">
                                        {item && item.userVerificatioDocumentId &&
                                            <div>
                                                <label className="type--color--opaque">
                                                    {t('CHARITY.EDIT.FIELDS.CHARITY_USER_VERIFICATION_DOCUMENT')}
                                                </label>
                                                <br></br>
                                                <a href={url+item.userVerificatioDocumentId} target="_blank" className="type--wgt--bold">{item.userVerificatioDocumentName}</a>
                                            </div>
                                        }
                                    </div>
                                    {item && item.coreUsername && item.isUserVerified == false &&
                                        <div className="col col-sml-12 col-lrg-6">
                                            <BaasicButton
                                                authorization={'theDonorsFundAdministrationSection.update'}
                                                className="btn btn--med btn--primary"
                                                label="CHARITY.EDIT.BUTTON.VERIFY_USER_ACCOUNT"
                                                onClick={verifyCharityUserAccount}
                                            />
                                        </div>
                                    }
                                    
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
