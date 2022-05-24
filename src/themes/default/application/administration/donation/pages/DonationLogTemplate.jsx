import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicFormControls,
    EditFormContent,
    NumericInputField,
} from 'core/components';
import { Content } from 'core/layouts';

function DonationLogTemplate({ donationLogViewStore, t }) {
    const {
    } = donationLogViewStore;

    return (
        <Content>
            <div>
                OK
            </div>
        </Content>
    )
}

DonationLogTemplate.propTypes = {
    donationLogViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(DonationLogTemplate);
