import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton } from 'core/components';

function Step4Template({ step4ViewStore, t }) {
    const {
        session,
        currentCount,
        onNextStepClick
    } = step4ViewStore;

    return (
        <div className="card card--form card--primary card--med u-mar--bottom--sml">
            <div className="row">
                <div className="form__group col col-lrg-12">
                    <span>{t('SESSION.CREATE.STEP4.SESSION_NUMBER')}: {session && session.confirmationNumber}   {t('SESSION.CREATE.STEP4.TOTAL')}:{session && session.amount}</span>
                </div>
                <div className="form__group col col-lrg-12 u-mar--top--lrg">
                    {t('SESSION.CREATE.STEP4.FINISH_MESSAGE')}
                </div>
                <div className="form__group col col-lrg-12 u-mar--top--lrg">
                    <BaasicButton
                        className="btn btn--base btn--primary"
                        onClick={onNextStepClick}
                        label='SESSION.CREATE.STEP4.BUTTONS.FINISH'
                    />
                </div>
            </div>
            <div className="card card--form card--primary card--med u-mar--bottom--sml">
                <span>{t('SESSION.CREATE.STEP4.AUTOCLOSE_MESSAGE')}{currentCount}</span>
            </div>
        </div>
    )
}

Step4Template.propTypes = {
    step4ViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(Step4Template);
