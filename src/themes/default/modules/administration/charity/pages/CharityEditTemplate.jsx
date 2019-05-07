import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicFieldDropdown, BasicFormatFieldInput, BasicCheckBox } from 'core/components';
import { ContactInformationTemplate } from 'themes/modules/common/charity/components';
import { BaasicFormControls, BaasicButton, EditFormContent } from 'core/components';
import { Page, PageFooter } from 'core/layouts';
import { CreateBankAccountTemplate } from 'themes/modules/common/bank-account/components';
import { AddressEdit, AddressCreate } from 'modules/common/address/pages';
import _ from 'lodash';

function CharityEditTemplate({ charityEditViewStore, t }) {
    const {
        form,
        charity,
        loaderStore: { loading },
        charityTypeDropdownStore,
        charityStatusDropdownStore,
        rootStore,
        onMarkPrimaryAddress,
        id,
        onAfterAddressCreate
    } = charityEditViewStore;

    return (
        <Page loading={loading}>
            {form &&
                <React.Fragment>
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-6">
                            <EditFormContent form={form}>
                                <div className="f-row">
                                    <div className="form__group f-col f-col-lrg-12">
                                        <h5>Profile Information</h5>
                                    </div>

                                    <div className="form__group f-col f-col-lrg-6">
                                        <BasicInput field={form.$('name')} />
                                    </div>

                                    <div className="form__group f-col f-col-lrg-6">
                                        <BasicInput field={form.$('dba')} />
                                    </div>

                                    <div className="form__group f-col f-col-lrg-6">
                                        <BasicFormatFieldInput field={form.$('taxId')} format="##-#######" mask="*" />
                                    </div>

                                    <div className="form__group f-col f-col-lrg-6">
                                        {charityTypeDropdownStore &&
                                            <BaasicFieldDropdown field={form.$('charityTypeId')} store={charityTypeDropdownStore} />}
                                    </div>

                                    <div className="form__group f-col f-col-lrg-6">
                                        {charityStatusDropdownStore &&
                                            <BaasicFieldDropdown field={form.$('charityStatusId')} store={charityStatusDropdownStore} />}
                                    </div>

                                    <div className="form__group f-col f-col-lrg-6">
                                        <BasicInput field={form.$('emailAddress.email')} />
                                    </div>
                                </div>

                                <ContactInformationTemplate field={form.$('contactInformation')} />

                                <div className="f-row card card--sml card--primary">
                                    <CreateBankAccountTemplate
                                        form={form.$('bankAccount')}
                                    />
                                </div>
                            </EditFormContent>
                        </div>

                        <div className="form__group f-col f-col-lrg-6">
                            {charity && charity.charityAddresses.sort((x, y) => { return (x.primary === y.primary) ? 0 : x.primary ? -1 : 1; }).map((charityAddress, i) =>
                                <React.Fragment key={charityAddress.id} >
                                    <AddressEdit
                                        id={charityAddress.addressId}
                                        key={charityAddress.id}
                                        item={charityAddress.address}
                                        title={charityAddress.primary ? 'Primary Address' : 'Secondary Address'}
                                    >
                                        {!charityAddress.primary && markPrimary(charityAddress.addressId, onMarkPrimaryAddress)}
                                    </AddressEdit>
                                </React.Fragment >
                            )}
                            <AddressCreate
                                route={'charity'}
                                userId={id}
                                onAfterCreate={onAfterAddressCreate}
                            ></AddressCreate>
                        </div>
                    </div>
                    <PageFooter>
                        <div>
                            <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                            <BaasicButton
                                className="btn btn--med btn--primary display--ib"
                                label={t('Cancel')}
                                onClick={() => rootStore.routerStore.goBack()}
                            />
                        </div>
                    </PageFooter>
                </React.Fragment>}
        </Page>
    );
};

function markPrimary(addressId, onMarkPrimaryAddress) {
    return (
        <button
            onClick={() => onMarkPrimaryAddress(addressId)}
            className="btn btn--sml btn--ghost"
            type="button">
            Mark Primary
        </button>
    )
}

CharityEditTemplate.propTypes = {
    charityEditViewStore: PropTypes.object.isRequired
}

export default defaultTemplate(CharityEditTemplate);
