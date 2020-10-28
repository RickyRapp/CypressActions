import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicButton,
    BaasicFieldDropdown
} from 'core/components';

function Step2Template({
    form,
    onPreviousStepClick,
    onNextStepClick,
    charityDropdownStore
}) {
    return (
        <React.Fragment>
            <h3 className="u-mar--bottom--med">General Data</h3>
            <div className="row">
                <div className="form__group col col-lrg-3">
                    <BasicInput field={form.$('fullName')} />
                </div>
                <div className="form__group col col-lrg-3">
                    <BasicInput field={form.$('phoneNumber')} />
                </div>
                <div className="form__group col col-lrg-3">
                    <BasicInput field={form.$('email')} />
                </div>
            </div>
            <div className="row">
                <div className="form__group col col-lrg-6">
                    <BaasicFieldDropdown field={form.$('charityId')} store={charityDropdownStore} />
                </div>
                <div className="form__group col col-lrg-3">
                    <BasicInput field={form.$('description')} />
                </div>
            </div>

            <div className="u-mar--bottom--med">
                <BaasicButton
                    className="btn btn--base btn--primary u-mar--right--sml"
                    onClick={onNextStepClick}
                    label='SESSION.CREATE.STEP2.BUTTONS.SAVE'
                />
                <BaasicButton
                    className="btn btn--base btn--ghost"
                    onClick={onPreviousStepClick}
                    label='SESSION.CREATE.STEP2.BUTTONS.BACK'
                />
            </div>
        </React.Fragment>
    )
}

Step2Template.propTypes = {
    form: PropTypes.object.isRequired,
    onPreviousStepClick: PropTypes.func.isRequired,
    onNextStepClick: PropTypes.func.isRequired,
    charityDropdownStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(Step2Template);
