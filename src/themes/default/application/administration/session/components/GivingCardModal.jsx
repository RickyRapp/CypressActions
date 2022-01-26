import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    NumericInput,
    BaasicButton,
    BaasicInput,
    BasicInput,
    NumberFormatInputField,
    NumericInputField,
    BaasicFieldDropdown
} from 'core/components'

const GivingCardModal = function ({ modalParams, t }) {
    const {
        title,
        form,
        processCard,
        charityDropdownStore
    } = modalParams.data;

    return (
        <section>
            <h3 className="u-mar--bottom--med">{title}</h3>
            <div className="row">
                <div className="form__group col col-lrg-12 col-xxlrg-12 col-xlrg-12">
                    <div>
                        {/* <label className="form__group__label">Card Number</label> */}
                        <BasicInput field={form.$('cardNumber')} />
                        {/* <NumberFormatInputField field={form.$('taxId')} /> */}
                        <BaasicFieldDropdown
											field={form.$('charityId')}
											store={charityDropdownStore}
											additionalLabel="My Favorite Charities"
										/>
                        <BasicInput field={form.$('note')} />
                        <NumericInputField label='Grant Amount' showLabel={true} field={form.$('amount')} />
                        
                        {/* <label className="form__group__label">Tax Id</label> */}
                        {/* <BaasicInput value={cardNumber}></BaasicInput>
                        <label className="form__group__label">Amount</label>
                        <BaasicInput value={cardNumber}></BaasicInput>
                        <label className="form__group__label">Description</label>
                        <BaasicInput value={cardNumber}></BaasicInput> */}
                        <BaasicButton className="btn btn--base btn--secondary u-mar--top--sml" label="Process Card" onClick={processCard}></BaasicButton>
                        {/* {certificate &&
                            <span className={"input input--lrg input--text input--disabled"}>{certificate.bookletCode}-{certificate.certificateCode}</span>} */}
                    </div>
                </div>
                {/* <div className="form__group col col-lrg-12">
                    <NumericInput
                        value={certificate.denominationTypeValue}
                        onChange={(event) => certificate.certificateValue = event.target.value}
                        label='SESSION.CREATE.STEP3.CERTIFICATE_VALUE_LABEL'
                        placeholder='SESSION.CREATE.STEP3.CERTIFICATE_VALUE_PLACEHOLDER'
                        showLabel={true}
                        required={true}>
                    </NumericInput>
                </div>
                <div className="form__group col col-lrg-12 u-mar--top--med">
                    <BaasicButton
                        className="btn btn--base btn--primary"
                        label='SESSION.CREATE.STEP3.SET_BLANK_CERTIFICATE_VALUE'
                        onClick={() => onClick(certificate)}
                        disabled={certificate.certificateValue < 1 ? true : false}>
                    </BaasicButton>
                </div> */}
            </div>
        </section>
    )
}

GivingCardModal.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(GivingCardModal);
