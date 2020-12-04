import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicFormControls,
    EditFormContent,
    NumberFormatInputField,
    Barcode
} from 'core/components';
import NumberFormat from 'react-number-format';
import { BarcodeFormat } from '@zxing/library';
import { charityFormatter } from 'core/utils';

function CharityGeneralDataTemplate({ charityGeneralDataViewStore, t }) {
    const {
        form,
        item,
        charityTypeDropdownStore,
        charityStatusDropdownStore
    } = charityGeneralDataViewStore;

    return (
        <EditFormContent form={form}>
            <div className="card--primary card--med u-mar--bottom--sml u-mar--top--sml">
                <div className="row">
                    <div className="col col-sml-12 col-lrg-12">
                        <div className="u-mar--bottom--sml">
                            <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">{t('CHARITY.EDIT.FIELDS.TITLE')}</h3>
                            <div className="row">
                                <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                                    <div>
                                        <label className="form__group__label">Tax Id</label>
                                        {item &&
                                            <NumberFormat format="##-#######" displayType="text" value={item.taxId} />}
                                    </div>
                                </div>
                                <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                                    {item &&
                                        <Barcode
                                            type={BarcodeFormat.QR_CODE}
                                            value={charityFormatter.format(item.taxId, { value: 'tax-id' })}
                                            height={100}
                                            width={100}
                                        />}
                                </div>
                            </div>
                            <div className="row">
                                <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                                    <BasicInput field={form.$('name')} />
                                </div>
                                <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                                    <BasicInput field={form.$('dba')} />
                                </div>
                                <div className="form__group col col-sml-6 col-lrg-3 u-mar--bottom--sml">
                                    <BaasicFieldDropdown field={form.$('charityTypeId')} store={charityTypeDropdownStore} />
                                </div>
                                <div className="form__group col col-sml-6 col-lrg-3 u-mar--bottom--sml">
                                    <BaasicFieldDropdown field={form.$('charityStatusId')} store={charityStatusDropdownStore} />
                                </div>
                            </div>
                        </div>
                        <div className="u-mar--bottom--sml">
                            <h3 className="u-mar--bottom--med">Contact info</h3>
                            <div className="row">
                                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                    <BasicInput field={form.$('contactInformationName')} />
                                </div>
                                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                    <BasicInput field={form.$('contactInformationEmail')} />
                                </div>
                                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
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
    )
}

CharityGeneralDataTemplate.propTypes = {
    charityGeneralDataViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(CharityGeneralDataTemplate);
