import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFormControls,
    EditFormContent,
    BaasicButton,
    NumberFormatInputField,
    BaasicFieldDropdown
} from 'core/components';

function Step2Template({ step2ViewStore }) {
    const {
        form,
        loadExistingSession,
        previousStep,
        loadingExistingSession,
        charityDropdownStore
    } = step2ViewStore;

    return (
        <EditFormContent form={form}>
            <h3 className="u-mar--bottom--med">General Data</h3>
            <div className="row">
                <div className="form__group col col-lrg-3">
                    <BasicInput field={form.$('fullName')} />
                </div>
                <div className="form__group col col-lrg-3">
                    <NumberFormatInputField field={form.$('phoneNumber')} />
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
            {renderEditLayoutFooterContent({
                form,
                loadExistingSession,
                previousStep,
                loadingExistingSession
            })}
        </EditFormContent>
    )
}

Step2Template.propTypes = {
    step2ViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderEditLayoutFooterContent({ form, loadExistingSession, previousStep, loadingExistingSession }) {
    return (
        <div className="u-mar--bottom--med">
            <BaasicButton
                className="btn btn--base btn--ghost u-mar--right--sml"
                onClick={previousStep}
                label='SESSION.CREATE.STEP2.BUTTONS.BACK'
            />
            <BaasicFormControls
                form={form}
                onSubmit={form.onSubmit}
                label='SESSION.CREATE.STEP2.BUTTONS.SAVE' />
            <div className="row">
                <div className="form__group col col-lrg-2">
                    <BasicInput field={form.$('key')} />
                </div>
                <div className="form__group col col-lrg-2">
                    <BaasicButton
                        className="btn btn--base btn--ghost u-mar--top--med"
                        icon={`u-icon u-icon--${loadingExistingSession ? 'locked' : 'unlocked'} u-icon--sml`}
                        onClick={() => loadExistingSession()}
                        label='SESSION.CREATE.STEP2.BUTTONS.SEARCH'
                    />
                </div>
            </div>
        </div>
    )
}

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any.isRequired,
    loadExistingSession: PropTypes.func.isRequired,
    previousStep: PropTypes.func.isRequired,
    loadingExistingSession: PropTypes.func.isRequired,
};

export default defaultTemplate(Step2Template);
