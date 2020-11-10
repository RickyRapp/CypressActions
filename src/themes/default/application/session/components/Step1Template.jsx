import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton } from 'core/components'

const Step1Template = function ({ onNextStepClick, t }) {
    return (
        <div className="card--primary card--med card--session type--center">
            <div className="u-mar--bottom--tny">
                {t('SESSION.CREATE.STEP1.SELECT_LANGUAGE_ENG')}
            </div>
            <div className="u-mar--bottom--sml">
                {t('SESSION.CREATE.STEP1.SELECT_LANGUAGE_HEB')}
            </div>
            <div>
                <BaasicButton
                    className="btn btn--base btn--ghost u-mar--right--sml"
                    label='SESSION.CREATE.STEP1.ENG_LANGUAGE'
                    onClick={() => onNextStepClick('eng')}
                />
                <BaasicButton
                    className="btn btn--base btn--ghost"
                    label='SESSION.CREATE.STEP1.HEB_LANGUAGE'
                    onClick={() => onNextStepClick('heb')}
                />
            </div>
        </div>
        )
}

Step1Template.propTypes = {
    onNextStepClick: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(Step1Template);
