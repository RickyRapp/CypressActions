import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    DatePickerField,
    NumericInputField,
    BasicFieldCheckbox,
    BaasicButton,
    BaasicModal,
    SimpleBaasicTable,
    FormatterResolver,
    BasicInput,
    NumberFormatInputField,
    BaasicFieldToggle,
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { Content, EditFormLayout } from 'core/layouts';
import { addressFormatter, charityFormatter, isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { CharityAdvancedSearch } from 'application/administration/charity/components';
import logo from 'themes/assets/img/logo.svg';
import { CharityShortInformationTemplate, GrantPurposeTypeTemplate } from 'themes/application/common/grant/components';
import { GrantConfirmTemplate } from '../components';

const GrantCreateTemplate = function ({ grantCreateViewStore, t }) {
    const {
        contentLoading,
        form,
        grantPurposeTypeDropdownStore,
        grantAcknowledgmentTypeDropdownStore,
        grantScheduleTypeDropdownStore,
        charityDropdownStore,
        charityTypeDropdownStore,
        confirmModal,
        donor,
        onCharitySelected,
        advancedSearchModal,
        openAdvancedSearchModal,
        onSubmitClick,
        previousGrantsTableStore,
        similarGrantsTableStore,
        loaderStore,
        grantAcknowledgmentName,
        isChangedDefaultAddress,
        onChangeDefaultAddressClick,
        grantRequestId,
        getNumberOfReocurrency,
        grantPurposeTypes
    } = grantCreateViewStore;

    return (
        <React.Fragment>
            <EditFormLayout store={grantCreateViewStore} loading={loaderStore.loading} layoutFooterVisible={false}>
                <Content loading={contentLoading} >
                    <div className="row row--form">
                        <div className="col col-sml-12 col-xxlrg-6">
                            <div className="card--primary card--med u-mar--bottom--med">
                                <h3 className=" u-mar--bottom--med">{t('GRANT.CREATE.FROM_TITLE')}</h3>
                                <div className="row row--form">
                                    <div className="form__group col col-sml-12">
                                        <BaasicFieldDropdown
                                            field={form.$('charityId')}
                                            store={charityDropdownStore}
                                            additionalLabel='My Favorite Charities'
                                        />

                                    </div>
                                </div>
                                {isNullOrWhiteSpacesOrUndefinedOrEmpty(grantRequestId) &&
                                    <div className="row row--form row__align--center">
                                        <div className="col col-sml-12 col-lrg-6 u-mar--bottom--sml type--color--note">
                                            <BasicFieldCheckbox field={form.$('isNewCharity')} />
                                        </div>
                                        <div className="col col-sml-12 col-med-6 u-mar--bottom--sml">
                                            <div className="u-push--from--med">
                                                <BaasicButton
                                                    className="advanced-search"
                                                    icon="u-icon u-icon--arrow-down--primary u-icon--sml u-mar--left--sml"
                                                    disabled={form.$('isNewCharity').value}
                                                    label="GRANT.CREATE.ADVANCED_CHARITY_FILTER_BUTTON"
                                                    onClick={openAdvancedSearchModal}
                                                />
                                            </div>
                                        </div>
                                    </div>}

                                {form.$('isNewCharity').value &&
                                    <div className="card--form card--med u-mar--bottom--med">
                                        <h4 className="">{t('GRANT.CREATE.NEW_CHARITY_TITLE')}</h4>
                                        <div className="row row--form">
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <BasicInput field={form.$('charityName')} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <NumberFormatInputField field={form.$('charityTaxId')} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <BasicInput field={form.$('charityDba')} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <BaasicFieldDropdown field={form.$('charityTypeId')} store={charityTypeDropdownStore} />
                                            </div>
                                            <div className="form__group col col-sml-12">
                                                <BasicInput field={form.$('charityAddressLine1')} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <BasicInput field={form.$('charityAddressLine2')} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <BasicInput field={form.$('charityCity')} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <BasicInput field={form.$('charityState')} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <BasicInput field={form.$('charityZipCode')} />
                                            </div>
                                        </div>
                                        <h4 className="">{t('GRANT.CREATE.NEW_CHARITY_CONTACT_TITLE')}</h4>
                                        <div className="row row--form">
                                            <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                                                <BasicInput field={form.$('charityContactName')} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                                                <BasicInput field={form.$('charityContactEmail')} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                                                <NumberFormatInputField field={form.$('charityContactNumber')} />
                                            </div>
                                        </div>
                                    </div>}

                                {charityDropdownStore.value &&
                                    <CharityShortInformationTemplate
                                        charity={charityDropdownStore.value.item}
                                        onChangeDefaultAddressClick={onChangeDefaultAddressClick}
                                        isChangedDefaultAddress={isChangedDefaultAddress}
                                        grantRequestId={grantRequestId}
                                    />}

                                {isChangedDefaultAddress &&
                                    <div className="card--secondary card--med u-mar--bottom--sml">
                                        <div className="row row--form">
                                            <div className="form__group col col-sml-12">
                                                <BasicInput field={form.$('addressLine1')} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <BasicInput field={form.$('addressLine2')} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <BasicInput field={form.$('city')} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <BasicInput field={form.$('state')} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <BasicInput field={form.$('zipCode')} />
                                            </div>
                                        </div>
                                    </div>}

                                <div className="row row--form">
                                    <div className="form__group col col-sml-12">
                                        <NumericInputField field={form.$('amount')} />
                                    </div>
                                </div>
                                <div className="row row--form">
                                    <div className="form__group col col-sml-12">
                                        <DatePickerField field={form.$('startFutureDate')} />
                                    </div>
                                </div>
                                {isNullOrWhiteSpacesOrUndefinedOrEmpty(grantRequestId) &&
                                    <div className="row row--form">
                                        <div className="form__group col col-sml-12 type--color--note u-mar--bottom--sml">
                                            <BaasicFieldToggle field={form.$('isRecurring')} showLabel={true} />
                                        </div>
                                    </div>}
                                {form.$('isRecurring').value &&
                                    <div className="card--form card--med u-mar--bottom--med">
                                        <div className="row row--form">
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <DatePickerField field={form.$('recurringDate')} showLabel={false} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <BaasicFieldDropdown field={form.$('grantScheduleTypeId')} store={grantScheduleTypeDropdownStore} showLabel={false} />
                                            </div>
                                        </div>
                                        <div className="row row--form">
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <NumericInputField field={form.$('numberOfPayments')} showLabel={false} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <BaasicFieldToggle field={form.$('noEndDate')} showLabel={true} />
                                            </div>
                                        </div>
                                        {form.$('amount').value && form.$('noEndDate').value === false && (form.$('numberOfPayments').value || form.$('endDate').value) &&
                                            <div className="row">
                                                <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                    Accumulated amount:
													{form.$('numberOfPayments').value &&
                                                        <FormatterResolver
                                                            item={{ amount: form.$('amount').value * form.$('numberOfPayments').value }}
                                                            field="amount"
                                                            format={{ type: 'currency' }}
                                                        />}
                                                    {form.$('endDate').value &&
                                                        <FormatterResolver
                                                            item={{ amount: form.$('amount').value * getNumberOfReocurrency(form.$('recurringDate').value, form.$('endDate').value, form.$('grantScheduleTypeId').value) }}
                                                            field="amount"
                                                            format={{ type: 'currency' }}
                                                        />}
                                                </div>
                                            </div>}
                                    </div>}
                                <div className="row row--form">
                                    <div className="form__group col col-sml-12">
                                        <BaasicFieldDropdown field={form.$('grantAcknowledgmentTypeId')} store={grantAcknowledgmentTypeDropdownStore} />
                                    </div>
                                    {grantAcknowledgmentName &&
                                        <div className="form__group col col-sml-12 u-mar--bottom--med">
                                            {grantAcknowledgmentName}
                                        </div>}
                                </div>
                                <div className="row row--form">
                                    <div className="form__group col col-sml-12">
                                        <BaasicFieldDropdown field={form.$('grantPurposeTypeId')} store={grantPurposeTypeDropdownStore} />
                                    </div>
                                </div>
                                <div className="row row--form">
                                    <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                                        {form.$('grantPurposeTypeId').value &&
                                            <GrantPurposeTypeTemplate form={form} grantPurposeType={grantPurposeTypes.find(c => c.id === form.$('grantPurposeTypeId').value)} />}
                                    </div>
                                </div>

                                <div className="u-mar--top--sml u-mar--bottom--sml type--right">
                                    <BaasicButton form={form} onClick={onSubmitClick} label='GRANT.CREATE.BUTTON.CREATE' />
                                </div>
                                
                            </div>
                        </div>
                        <div className="col col-sml-12 col-xxlrg-6">
                            <div className="card--primary card--med u-mar--bottom--med">
                                <h3 className=" u-mar--bottom--med">{t('GRANT.CREATE.INSIGHTS')}</h3>
                                <div className="row row--form">
                                    <div className="col col-sml-12 col-lrg-6 u-mar--bottom--med">
                                        <div className="card--secondary card--med type--center">
                                            <div className="type--xxlrg type--wgt--medium type--color--text">
                                                {donor && <FormatterResolver
                                                    item={{ balance: donor.presentBalance }}
                                                    field='balance'
                                                    format={{ type: 'currency' }}
                                                />}
                                            </div>
                                            <p className="type--xsml type--wgt--medium type--color--text">{t('GRANT.CREATE.CURRENT_BALANCE')}</p>
                                        </div>
                                    </div>
                                    <div className="col col-sml-12 col-lrg-6 u-mar--bottom--med">
                                        <div className="card--secondary--light card--med type--center">
                                            <div className="type--xxlrg type--wgt--medium type--color--note">
                                                {donor && <FormatterResolver
                                                    item={{ balance: donor.upcomingGrantsThisYear }}
                                                    field='balance'
                                                    format={{ type: 'currency' }}
                                                />}
                                            </div>
                                            <p className="type--xsml type--wgt--medium type--color--note">{t('GRANT.CREATE.UPCOMING_GRANTS_THIS_YEAR')}</p>
                                        </div>
                                    </div>

                                    {charityDropdownStore && charityDropdownStore.value &&
                                        <div className="card--secondary card--med col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                            <div className="row row--form">
                                                <div className="col col-sml-12 col-lrg-6">
                                                    <h4 className=" u-mar--bottom--med">{t('GRANT.CREATE.PROFILE_INFO')}</h4>
                                                </div>
                                            </div>
                                            <div className="row row--form u-display--flex u-display--flex--align--center u-display--flex--wrap">
                                                <div className="col col-sml-12 col-lrg-4">
                                                    <img src={logo} alt={"logo"} />
                                                </div>
                                                <div className="col col-sml-12 col-lrg-4">
                                                    {charityDropdownStore.value.item.name}
                                                </div>
                                            </div>
                                            <div className="row row--form u-padd--top--med">
                                                <div className="col col-sml-12 col-lrg-4">
                                                    <div className="u-separator--primary u-mar--bottom--sml"></div>
                                                    <strong>{t('GRANT.CREATE.RULLING_YEAR')}</strong>
                                                    <p>{charityDropdownStore.value.item.rullingYear}</p>
                                                </div>
                                                <div className="col col-sml-12 col-lrg-4">
                                                    <div className="u-separator--primary u-mar--bottom--sml"></div>
                                                    <strong>{t('GRANT.CREATE.EIN')}</strong>
                                                    <p>{charityFormatter.format(charityDropdownStore.value.item.taxId, { value: 'tax-id' })}</p>
                                                </div>
                                                <div className="col col-sml-12 col-lrg-4">
                                                    <div className="u-separator--primary u-mar--bottom--sml"></div>
                                                    <strong>{t('GRANT.CREATE.IRS_FILING_REQUIREMENT')}</strong>
                                                    <p>{charityDropdownStore.value.item.irsFilingRequirement}</p>
                                                </div>
                                            </div>
                                            <div className="row row--form u-padd--top--med">
                                                <div className="col col-sml-12 col-lrg-4">
                                                    <strong>{t('GRANT.CREATE.PRINCIPAL_OFFICER')}</strong>
                                                    <p>{charityDropdownStore.value.item.principalOfficer}</p>
                                                </div>
                                                <div className="col col-sml-12 col-lrg-4">
                                                    <strong>{t('GRANT.CREATE.CAUSE_AREA')}</strong>
                                                    <p>{charityDropdownStore.value.item.nteeCode}</p>
                                                </div>
                                                <div className="col col-sml-12 col-lrg-4">
                                                    <strong>{t('GRANT.CREATE.DOWNLOAD_TAX_FORMS')}</strong>
                                                    <p>{charityDropdownStore.value.item.irsFilingRequirement}</p>
                                                </div>
                                            </div>
                                            <div className="row row--form u-padd--top--med">
                                                <div className="col col-sml-12 col-lrg-4">
                                                    <strong>{t('GRANT.CREATE.MAIN_ADDRESS')}</strong>
                                                    <p>{addressFormatter.format(charityDropdownStore.value.item.charityAddresses.filter(c => c.isPrimary === true), 'full')}</p>
                                                </div>
                                            </div>
                                        </div>}
                                </div>

                                <div className="row row--form u-mar--bottom--med">
                                    <div className="col col-sml-12 col-lrg-12">
                                        <h4 className=" u-mar--bottom--med">{t('GRANT.CREATE.PREVIOUS_GRANTS')}</h4>
                                        <SimpleBaasicTable tableStore={previousGrantsTableStore} />
                                    </div>
                                </div>

                                <div className="row row--form">
                                    <div className="col col-sml-12 col-lrg-12">
                                        <h4 className=" u-mar--bottom--med">{t('GRANT.CREATE.SIMILAR_GRANTS')}</h4>
                                        <div className={grantPurposeTypeDropdownStore && grantPurposeTypeDropdownStore.value && grantPurposeTypeDropdownStore.value.name && "card--primary card--med"}>
                                            <h5 className="type--med type--wgt--medium type--color--note u-mar--bottom--med">{grantPurposeTypeDropdownStore && grantPurposeTypeDropdownStore.value && grantPurposeTypeDropdownStore.value.name}</h5>
                                            <SimpleBaasicTable tableStore={similarGrantsTableStore} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
            </EditFormLayout >
            <BaasicModal modalParams={advancedSearchModal}>
                <CharityAdvancedSearch onSelected={onCharitySelected} />
            </BaasicModal>
            <BaasicModal modalParams={confirmModal}>
                <GrantConfirmTemplate form={form} />
            </BaasicModal>
        </React.Fragment >
    )
};

GrantCreateTemplate.propTypes = {
    grantCreateViewStore: PropTypes.object.isRequired,
    onSubmitClick: PropTypes.func,
    form: PropTypes.object,
    confirmModal: PropTypes.any,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(GrantCreateTemplate);
