import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicFormControls,
    EditFormContent,
    NumberFormatInputField
} from 'core/components';
import { Page } from 'core/layouts';
import {
    CharityAddressListTable,
    CharityBankAccountEdit
} from 'application/charity/components';
import NumberFormat from 'react-number-format';

const CharityEditTemplate = function ({ charityEditViewStore }) {
    const {
        form,
        item,
        loaderStore,
        charityTypeDropdownStore,
        charityStatusDropdownStore
    } = charityEditViewStore;

    return (
        <Page loading={loaderStore.loading} >
            <EditFormContent form={form}>
                <div className="card card--form card--primary card--med u-mar--bottom--med">
                    <div className="row">
                        <div className="col col-sml-12 col-lrg-12">
                            <div className="u-mar--bottom--sml">
                                <h3 className="u-mar--bottom--med">General data</h3>
                                <div className="row">
                                    <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                                        <BasicInput field={form.$('name')} />
                                    </div>
                                    <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                                        <BasicInput field={form.$('dba')} />
                                    </div>
                                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                        <div>
                                            <label className="form__group__label">Tax Id</label>
                                            {item &&
                                                <span className={"input input--med input--text input--disabled"}>
                                                    <NumberFormat format="##-#######" displayType="text" value={item.taxId} />
                                                </span>}
                                        </div>
                                    </div>
                                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                        <BaasicFieldDropdown field={form.$('charityTypeId')} store={charityTypeDropdownStore} />
                                    </div>
                                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                        <BaasicFieldDropdown field={form.$('charityStatusId')} store={charityStatusDropdownStore} />
                                    </div>
                                </div>
                            </div>
                            <div className="u-mar--bottom--sml">
                                <h3 className="u-mar--bottom--med">Contact info</h3>
                                <div className="row">
                                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                        <BasicInput field={form.$('contactInformation.name')} />
                                    </div>
                                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                        <BasicInput field={form.$('contactInformation.emailAddress.email')} />
                                    </div>
                                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                        <NumberFormatInputField field={form.$('contactInformation.phoneNumber.number')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {renderEditLayoutFooterContent({ form })}
                </div>
            </EditFormContent>

            {item &&
                <div className="row">
                    <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                        <CharityBankAccountEdit id={item.bankAccountId} charityId={item.id} />
                    </div>
                    <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                        <CharityAddressListTable />
                    </div>
                </div>}
        </Page >
    )
};

CharityEditTemplate.propTypes = {
    charityEditViewStore: PropTypes.object.isRequired
};

function renderEditLayoutFooterContent({ form }) {
    return <div className="u-mar--bottom--med">
        <BaasicFormControls form={form} onSubmit={form.onSubmit} />
    </div>
}

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any
};

export default defaultTemplate(CharityEditTemplate);
