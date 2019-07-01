import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicFieldDropdown, BasicFormatFieldInput } from 'core/components';
import { NonMemberTemplate } from 'themes/modules/common/non-member/components';
import { BaasicFormControls, BaasicButton, EditFormContent } from 'core/components';
import { Page, PageContentHeader } from 'core/layouts';
import { BankAccountTemplate } from 'themes/modules/common/bank-account/components';
import { AddressEdit, AddressCreate } from 'modules/common/address/pages';
import { CharityHeaderDetails } from 'modules/administration/charity/components';
import _ from 'lodash';

function CharityEditTemplate({ charityEditViewStore, t }) {
    const {
        form,
        charity,
        imgPreview,
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
            <PageContentHeader>
                <CharityHeaderDetails userId={id} type='charity' />
            </PageContentHeader>

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

                                <div className="f-row card card--sml card--primary">
                                    <NonMemberTemplate
                                        form={form.$('contactInformation')}
                                        title="Contact Informations"
                                        clearable={true}
                                        nameColumn={6}
                                        addressLine1Column={6} addressLine2Column={6} cityColumn={4} stateColumn={4} zipCodeColumn={4}
                                        emailColumn={6}
                                        numberColumn={6}
                                    />
                                </div>

                                <div className="f-row card card--sml card--primary">
                                    <BankAccountTemplate form={form.$('bankAccount')} imgPreview={imgPreview} />
                                </div>

                                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                                <BaasicButton
                                    className="btn btn--med btn--primary display--ib"
                                    label={t('Cancel')}
                                    onClick={() => rootStore.routerStore.goBack()}
                                />
                            </EditFormContent>
                        </div>

                        <div className="form__group f-col f-col-lrg-6">
                            {charity && charity.charityAddresses && charity.charityAddresses.sort((x, y) => { return (x.primary === y.primary) ? 0 : x.primary ? -1 : 1; }).map((charityAddress) =>
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
