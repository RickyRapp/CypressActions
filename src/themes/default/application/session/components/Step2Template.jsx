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
            <div className="u-display--flex u-display--flex--column u-display--flex--align--center">
                <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">General Data</h3>
                <div className="row">
                    <div className="col col-sml-12 u-mar--bottom--med">
                        <div className="col col-sml-12 u-mar--bottom--sml">
                            <BasicInput field={form.$('fullName')} />
                        </div>
                        <div className="col col-sml-12 u-mar--bottom--sml">
                            <BasicInput field={form.$('phoneNumber')} />
                        </div>
                        <div className="col col-sml-12 u-mar--bottom--sml">
                            <BasicInput field={form.$('email')} />
                        </div>
                        <div className="col col-sml-12 u-mar--bottom--sml">
                            <BaasicFieldDropdown field={form.$('charityId')} store={charityDropdownStore} />
                        </div>
                        <div className="col col-sml-12 u-mar--bottom--med">
                            <BasicInput field={form.$('description')} />
                        </div>
                        <div className="col col-sml-12">
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
                    </div>
                </div>
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
