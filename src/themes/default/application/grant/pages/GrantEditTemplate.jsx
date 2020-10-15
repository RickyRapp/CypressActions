import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    NumericInputField,
    BasicFieldCheckbox,
    BaasicButton,
    BaasicModal,
    SimpleBaasicTable,
    FormatterResolver,
    BasicCheckbox,
    BasicTextArea,
    BaasicFormControls,
    BasicInput,
    NumberFormatInputField
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { Content, EditFormLayout } from 'core/layouts';
import { GrantPurposeTypeForm } from 'themes/application/grant/components';
import { addressFormatter, charityFormatter } from 'core/utils';
import { CharityAdvancedSearch } from 'application/charity/components';
import logo from 'themes/assets/img/logo.svg';

const GrantEditTemplate = function ({ grantEditViewStore, t }) {
    const {
        contentLoading,
        form,
        grantPurposeTypeDropdownStore,
        grantAcknowledgmentTypeDropdownStore,
        charityDropdownStore,
        charityTypeDropdownStore,
        isNoteToAdministratorIncluded,
        onIncludeNoteToAdministratorChange,
        donor,
        onBlurAmount,
        amountWithFee,
        onCharitySelected,
        advancedSearchModal,
        openAdvancedSearchModal,
        previousGrantsTableStore,
        similarGrantsTableStore,
        loaderStore,
        onNewCharityChange
    } = grantEditViewStore;

    return (
        <React.Fragment>
            <EditFormLayout store={grantEditViewStore} loading={loaderStore.loading} layoutFooterVisible={false}>
                <Content loading={contentLoading} >
                    <div className="row">
                        <div className="col col-sml-12 col-lrg-6">
                            <div className="card card--form card--primary card--med u-mar--bottom--med">
                                <h3 className="u-mar--bottom--med">{t('GRANT.CREATE.FROM_TITLE')}</h3>
                                <div className="row">
                                    <div className="form__group col col-sml-11 col-lrg-11 u-mar--bottom--sml">
                                        <BaasicFieldDropdown
                                            field={form.$('charityId')}
                                            store={charityDropdownStore}
                                            additionalLabel='My Favorite Charities'
                                        />
                                    </div>
                                    <div className="col col-sml-1 col-lrg-1 u-mar--bottom--sml">
                                        <BaasicButton
                                            className="btn btn--icon"
                                            icon={`u-icon u-icon--preview u-icon--sml`} //TODO: advanced search icon
                                            label={t('GRANT.CREATE.ADVANCED_CHARITY_FILTER_BUTTON')}
                                            onlyIcon={true}
                                            onClick={openAdvancedSearchModal}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                        <BasicFieldCheckbox field={form.$('isNewCharity')} onChange={onNewCharityChange} />
                                    </div>
                                </div>

                                {form.$('isNewCharity').value &&
                                    <div className="card card--form card--primary card--med u-mar--bottom--med">
                                        <h4>{t('GRANT.CREATE.NEW_CHARITY_TITLE')}</h4>
                                        <div className="row">
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <BasicInput field={form.$('charityName')} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <NumberFormatInputField
                                                    field={form.$('charityTaxId')}
                                                // onChange={taxIdExists}
                                                />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <BasicInput field={form.$('charityDba')} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                {charityTypeDropdownStore &&
                                                    <BaasicFieldDropdown field={form.$('charityTypeId')} store={charityTypeDropdownStore} />}
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
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
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <BasicFieldCheckbox field={form.$('charityIsInternationalCharity')} />
                                            </div>
                                        </div>
                                        <h4>{t('GRANT.CREATE.NEW_CHARITY_CONTACT_TITLE')}</h4>
                                        <div className="row">
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
                                <div className="row">
                                    <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                        <NumericInputField field={form.$('amount')} onBlur={onBlurAmount} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                        {amountWithFee &&
                                            <React.Fragment><label className="form__group__label">Total amount with fee</label>
                                                <span className={"input input--med input--text input--disabled"}>
                                                    <FormatterResolver
                                                        item={{ amount: amountWithFee }}
                                                        field='amount'
                                                        format={{ type: 'currency' }}
                                                    /></span>
                                            </React.Fragment>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                        <BaasicFieldDropdown field={form.$('grantAcknowledgmentTypeId')} store={grantAcknowledgmentTypeDropdownStore} />
                                    </div>
                                    {grantAcknowledgmentTypeDropdownStore.value &&
                                        <div className="form__group col col-sml-12 col-lrg-6 u-mar--top--med">
                                            {grantAcknowledgmentTypeDropdownStore.value.abrv === 'name-fund-name-and-address' &&
                                                `${donor.donorName} - ${donor.fundName} - ${addressFormatter.format(donor.donorAddress, 'full')}`}
                                            {grantAcknowledgmentTypeDropdownStore.value.abrv === 'fund-name-and-address' &&
                                                `${donor.fundName} - ${addressFormatter.format(donor.donorAddress, 'full')}`}
                                            {grantAcknowledgmentTypeDropdownStore.value.abrv === 'fund-name' && donor.fundName}
                                            {grantAcknowledgmentTypeDropdownStore.value.abrv === 'remain-anonymous' && 'Anonymous'}
                                        </div>}
                                </div>
                                <div className="row">
                                    <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                        <BaasicFieldDropdown field={form.$('grantPurposeTypeId')} store={grantPurposeTypeDropdownStore} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                                        {grantPurposeTypeDropdownStore.value &&
                                            <GrantPurposeTypeForm form={form} store={grantPurposeTypeDropdownStore} />}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                        <BasicCheckbox
                                            id='2'
                                            checked={isNoteToAdministratorIncluded}
                                            label='GRANT.CREATE.INCLUDE_NOTE_TO_ADMINISTRATOR'
                                            onChange={event => onIncludeNoteToAdministratorChange(event.target.checked)} />
                                    </div>
                                </div>
                                {isNoteToAdministratorIncluded &&
                                    <div className="row">
                                        <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                                            <BasicTextArea field={form.$('noteToAdministrator')} />
                                        </div>
                                    </div>}
                                {renderEditLayoutFooterContent({ form })}
                            </div>
                        </div>
                        <div className="col col-sml-12 col-lrg-6">
                            <div className="card card--form card--primary card--med u-mar--bottom--med">
                                <h3>{t('GRANT.CREATE.INSIGHTS')}</h3>
                                <div className="row">
                                    <div className="card card--form card--primary card--med col col-sml-12 col-lrg-5 u-mar--bottom--med u-mar--right--med">
                                        {donor && <FormatterResolver
                                            item={{ balance: donor.availableBalance }}
                                            field='balance'
                                            format={{ type: 'currency' }}
                                        />}
                                        <p>{t('GRANT.CREATE.CURRENT_BALANCE')}</p>
                                    </div>
                                    <div className="card card--form card--primary card--med col col-sml-12 col-lrg-5 u-mar--bottom--med u-mar--left--med">
                                        {donor && <FormatterResolver
                                            item={{ balance: donor.upcomingGrantsThisYear }}
                                            field='balance'
                                            format={{ type: 'currency' }}
                                        />}
                                        <p>{t('GRANT.CREATE.UPCOMING_GRANTS_THIS_YEAR')}</p>
                                    </div>
                                    {charityDropdownStore && charityDropdownStore.value &&
                                        <div className="card card--form card--primary card--med col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                            <div className="row">
                                                <div className="col col-sml-12 col-lrg-6">
                                                    <h4>{t('GRANT.CREATE.PROFILE_INFO')}</h4>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col col-sml-12 col-lrg-4">
                                                    <img src={logo} alt={"logo"} />
                                                </div>
                                                <div className="col col-sml-12 col-lrg-4">
                                                    {charityDropdownStore.value.item.name}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col col-sml-12 col-lrg-4">
                                                    <strong>{t('GRANT.CREATE.RULLING_YEAR')}</strong>
                                                    <p>{charityDropdownStore.value.item.rullingYear}</p>
                                                </div>
                                                <div className="col col-sml-12 col-lrg-4">
                                                    <strong>{t('GRANT.CREATE.EIN')}</strong>
                                                    <p>{charityFormatter.format(charityDropdownStore.value.item.taxId, { value: 'tax-id' })}</p>
                                                </div>
                                                <div className="col col-sml-12 col-lrg-4">
                                                    <strong>{t('GRANT.CREATE.IRS_FILING_REQUIREMENT')}</strong>
                                                    <p>{charityDropdownStore.value.item.irsFilingRequirement}</p>
                                                </div>
                                            </div>
                                            <div className="row">
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
                                            <div className="row">
                                                <div className="col col-sml-12 col-lrg-4">
                                                    <strong>{t('GRANT.CREATE.MAIN_ADDRESS')}</strong>
                                                    <p>{addressFormatter.format(charityDropdownStore.value.item.charityAddresses.filter(c => c.isPrimary === true), 'full')}</p>
                                                </div>
                                            </div>
                                        </div>}
                                </div>

                                <div className="row u-mar--bottom--med">
                                    <div className="card card--form card--primary card--med col col-sml-12 col-lrg-12">
                                        <h4>{t('GRANT.CREATE.PREVIOUS_GRANTS')}</h4>
                                        <SimpleBaasicTable tableStore={previousGrantsTableStore} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="card card--form card--primary card--med col col-sml-12 col-lrg-12">
                                        <h4>{t('GRANT.CREATE.SIMILAR_GRANTS')}</h4>
                                        <div className="card card--form card--primary card--med">
                                            <h5>{grantPurposeTypeDropdownStore && grantPurposeTypeDropdownStore.value && grantPurposeTypeDropdownStore.value.name}</h5>
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
        </React.Fragment >
    )
};

GrantEditTemplate.propTypes = {
    grantEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderEditLayoutFooterContent({ form }) {
    return <div className="u-mar--bottom--med">
        <BaasicFormControls form={form} onSubmit={form.onSubmit} label='GRANT.CREATE.BUTTON.CREATE' />
    </div>
}

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any
};

export default defaultTemplate(GrantEditTemplate);
