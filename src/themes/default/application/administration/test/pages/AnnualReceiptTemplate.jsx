import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
//import { isSome } from 'core/utils';
//import { EditFormContent, BaasicButton, BasicFieldCheckbox, NumericInputField, DatePickerField, BasicInput, BaasicFieldDropdown } from 'core/components';
import { Content } from 'core/layouts';
import { BaasicButton, BaasicDropdown } from 'core/components';
//import moment from 'moment';

function AnnualReceiptTemplate({ annualReceiptViewStore}) {
    const {
        searchDonorDropdownStore,
        donorId
    } = annualReceiptViewStore;

    return (
        <Content>
            <div className="card--primary card--med u-mar--top--med">
                <h3>Generate report</h3>
                <div className="card--primary card--med u-mar--top--med">
                <div className="row">
                    <div className="col col-sml-12 col-xxlrg-6">
                        <label className="form__group__label">For Donor</label>
                        <BaasicDropdown
                            placeholder={'SELECT_DONOR_PLACEHOLDER'}
                            className='input--dropdown'
                            store={searchDonorDropdownStore}
                        />
                        {donorId &&
                        <BaasicButton
                            className="btn btn--med btn--med--wide btn--tertiary u-mar--top--sml"
                            icon='u-icon u-icon--approve u-icon--base'
                            label={`Generate annual receipt for this donor`}
                            onClick={() => console.log(donorId)}>
                        </BaasicButton>}
                    </div>
                    <div className="col col-sml-12 col-xxlrg-4">
                        <label className="form__group__label">Or</label>
                        <BaasicButton
                            className="btn btn--med btn--med--wide btn--secondary u-mar--bottom--sml"
                            icon='u-icon u-icon--approve u-icon--base'
                            label={`Generate annual receipt for all the donors`}
                            onClick={() => console.log("All")}>
                        </BaasicButton>
                    </div>
                </div>
                </div>
            </div>
        </Content >
    )
}

AnnualReceiptTemplate.propTypes = {
    annualReceiptViewStore: PropTypes.object
};

export default defaultTemplate(AnnualReceiptTemplate);
