import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicModal } from 'core/components'
import { GivingCardModal } from '.';

const Step1Template = function ({ onNextStepClick, createGivingCardGrant, t, givingCardModal, isCharityAccount }) {
    return (
        <div className="card--med type--center">
            <div className="u-mar--bottom--tny">
                {t('SESSION.CREATE.STEP1.SELECT_TYPE_SCANNER')}
            </div>
            {/* <div className="u-mar--bottom--sml">
                {t('SESSION.CREATE.STEP1.SELECT_LANGUAGE_HEB')}
            </div> */}
            <div className="u-display--flex u-display--flex--justify--center u-mar--top--lrg">
                <BaasicButton
                    className="btn btn--med btn--med--wide btn--secondary u-mar--right--sml"
                    label='SESSION.CREATE.STEP1.DEPOSIT_CHECKS'
                    onClick={() => onNextStepClick('eng')}
                />
                {
                    !isCharityAccount && 
                    <BaasicButton
                        className="btn btn--med btn--med--wide btn--secondary"
                        label='SESSION.CREATE.STEP1.ACCEPT_CARD'
                        onClick={() => createGivingCardGrant()}
                    />
                }
                
            </div>
            <BaasicModal modalParams={givingCardModal} showClose={true} modalClassName={"modal__content--sml"}>
				<GivingCardModal />
			</BaasicModal>
        </div>
        )
}

Step1Template.propTypes = {
    onNextStepClick: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(Step1Template);
