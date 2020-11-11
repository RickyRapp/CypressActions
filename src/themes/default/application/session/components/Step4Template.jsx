import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton } from 'core/components';

function Step4Template({
    t,
    onNextStepClick,
    currentCount,
    session
}) {
    return (
        <div className="card--primary card--med">
            <div className="row">
                <div className="col col-lrg-12 u-separator--primary u-padd--bottom--sml">
                    <span className="type--med type--wgt--medium">{t('SESSION.CREATE.STEP4.SESSION_NUMBER')}:<span className="type--color--note type--wgt--medium u-mar--left--sml">{session && session.confirmationNumber}</span></span>

                    <span className="type--med type--wgt--medium u-push">{t('SESSION.CREATE.STEP4.TOTAL')}: <span className="type--color--note type--wgt--medium u-mar--left--sml">${session && session.amount}</span></span>
                </div>
                <div className="col col-lrg-12 type--base type--wgt--regular type--center u-mar--top--lrg">
                    {t('SESSION.CREATE.STEP4.FINISH_MESSAGE')}
                </div>
                <div className="col col-lrg-12 type--center u-separator--top--primary u-mar--top--lrg u-mar--bottom--med u-padd--top--med">
                    <BaasicButton
                        className="btn btn--base btn--primary u-padd--left--lrg u-padd--right--lrg"
                        onClick={onNextStepClick}
                        label='SESSION.CREATE.STEP4.BUTTONS.FINISH'
                    />
                </div>
            </div>
            <div className="card--tertiary card--med u-mar--bottom--sml type--centerx">
                <span>{t('SESSION.CREATE.STEP4.AUTOCLOSE_MESSAGE')}{currentCount}</span>
            </div>
        </div>
    )
}

Step4Template.propTypes = {
    step4ViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    onNextStepClick: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired,
    currentCount: PropTypes.number.isRequired
};

export default defaultTemplate(Step4Template);
