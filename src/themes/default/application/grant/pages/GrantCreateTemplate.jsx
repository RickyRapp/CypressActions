import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    DatePickerField,
    NumericInputField,
    BasicInput,
    BasicFieldCheckbox,
    Scanner,
    BaasicButton,
    BaasicModal,
    SimpleBaasicTable,
    FormatterResolver
} from 'core/components';
import { defaultTemplate, withAuth } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { GrantPurposeTypeForm } from 'themes/application/grant/components';
import { DonorPageHeaderOverview } from 'application/donor/components';
import { addressFormatter } from 'core/utils';
import _ from 'lodash';
import { CharityAdvancedSearch } from 'application/charity/components';

const GrantCreateTemplate = function ({ grantCreateViewStore, t }) {
    const {
        contentLoading,
        form,
        grantPurposeTypeDropdownStore,
        grantAcknowledgmentTypeDropdownStore,
        grantScheduleTypeDropdownStore,
        charityDropdownStore,
        donorId,
        donor,
        monthlyGrantId,
        annualGrantId,
        onBlurAmount,
        amountWithFee,
        onChangeEndDate,
        onChangeNumberOfPayments,
        onChangeNoEndDate,
        onScanned,
        onCharitySelected,
        advancedSearchModal,
        openAdvancedSearchModal,
        tableStore
    } = grantCreateViewStore;

    return (
        <React.Fragment>
            <ApplicationEditLayout store={grantCreateViewStore}>
                <AuthPageHeader donorId={donorId} type={2} authorization='theDonorsFundAdministrationSection.read' />
                <Content loading={contentLoading} >
                    <div className="row">
                        <div className="col col-sml-12 col-lrg-6">
                            <div className="card card--form card--primary card--med u-mar--bottom--med">
                                <h3 className="u-mar--bottom--med">General Data</h3>
                                <div className="row">
                                    <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                                        <BaasicFieldDropdown field={form.$('charityId')} store={charityDropdownStore} />
                                        {!form.$('charityId').disabled && <BaasicButton
                                            className="btn btn--icon"
                                            icon={`u-icon u-icon--preview u-icon--sml`} //TODO: advanced search icon
                                            label={t('GRANT.CREATE.ADVANCED_CHARITY_FILTER_BUTTON')}
                                            onlyIcon={true}
                                            onClick={openAdvancedSearchModal}
                                        />}
                                    </div>
                                    {!form.$('charityId').disabled &&
                                        <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                                            <Scanner onBarcodeDetected={onScanned} />
                                        </div>}
                                </div>
                                <div className="row">
                                    <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                        <BaasicFieldDropdown field={form.$('grantScheduleTypeId')} store={grantScheduleTypeDropdownStore} />
                                    </div>
                                    <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                        <DatePickerField field={form.$('startFutureDate')} />
                                    </div>
                                    {form.$('grantScheduleTypeId').value && form.$('startFutureDate').value &&
                                        <React.Fragment>
                                            {form.$('startFutureDate').value > new Date() &&
                                                <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                    <BasicInput field={form.$('name')} />
                                                </div>}
                                            {(form.$('grantScheduleTypeId').value === monthlyGrantId || form.$('grantScheduleTypeId').value === annualGrantId) &&
                                                <React.Fragment>
                                                    <div className="form__group col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                                        <NumericInputField field={form.$('numberOfPayments')} onChange={onChangeNumberOfPayments} />
                                                    </div>
                                                    <div className="form__group col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                                        <DatePickerField field={form.$('endDate')} onChange={onChangeEndDate} />
                                                    </div>
                                                    <div className="form__group col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                                        <BasicFieldCheckbox field={form.$('noEndDate')} onChange={onChangeNoEndDate} />
                                                    </div>
                                                </React.Fragment>}
                                        </React.Fragment>}
                                </div>
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
                                                `${donor.donorName} - ${donor.fundName} - ${addressFormatter.format(_.find(donor.donorAddresses, { isPrimary: true }), 'full')}`}
                                            {grantAcknowledgmentTypeDropdownStore.value.abrv === 'fund-name-and-address' &&
                                                `${donor.fundName} - ${addressFormatter.format(_.find(donor.donorAddresses, { isPrimary: true }), 'full')}`}
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
                            </div>
                        </div>
                        {form.$('charityId').value &&
                            <div className="col col-sml-12 col-lrg-6">
                                <div className="card card--form card--primary card--med u-mar--bottom--med">
                                    <SimpleBaasicTable tableStore={tableStore} />
                                </div>
                            </div>}
                    </div>
                </Content>
            </ApplicationEditLayout >
            <BaasicModal modalParams={advancedSearchModal}>
                <CharityAdvancedSearch onSelected={onCharitySelected} />
            </BaasicModal>
        </React.Fragment>
    )
};

const AuthPageHeader = withAuth(DonorPageHeaderOverview);

GrantCreateTemplate.propTypes = {
    grantCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(GrantCreateTemplate);
