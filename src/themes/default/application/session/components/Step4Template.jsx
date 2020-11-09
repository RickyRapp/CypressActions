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
        <div className="u-display--flex u-display--flex--justify--center">
            <div className="container--sml card--primary card--med u-mar--bottom--sml">
                <div className="row">
                    <div className="form__group col col-lrg-12">
                        <span className="type--base type--wgt--regular">{t('SESSION.CREATE.STEP4.SESSION_NUMBER')}:<span className="type--color--success type--wgt--medium u-mar--left--sml">{session && session.confirmationNumber}</span></span>

                        <span className="type--base type--wgt--regular">{t('SESSION.CREATE.STEP4.TOTAL')}: <span className="type--color--success type--wgt--medium u-mar--left--sml u-push">{session && session.amount}</span></span>
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
                <div className="card--tertiary card--med u-mar--bottom--sml w--300--px">
                    <span>{t('SESSION.CREATE.STEP4.AUTOCLOSE_MESSAGE')}{currentCount}</span>
                </div>
            </div>
        </div>
    )
}

Step4Template.propTypes = {
    step4ViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(Step4Template);
