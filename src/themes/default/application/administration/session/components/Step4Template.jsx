import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton } from 'core/components';

function Step4Template({ t, onNextStepClick, currentCount, session }) {
	return (
		<React.Fragment>
			<div className="scanner__finish--card">
				<div className="row">
					<div className="col col-lrg-12 u-separator--primary u-padd--bottom--sml">
						<span className="type--med type--wgt--bold">
							{t('SESSION.CREATE.STEP4.SESSION_NUMBER')}:
							<span className="type--wgt--bold u-mar--left--sml">{session && session.confirmationNumber}</span>
						</span>
						<span className="type--med type--wgt--bold u-push">
							{t('SESSION.CREATE.STEP4.TOTAL')}:{' '}
							<span className="type--wgt--bold u-mar--left--sml">${session && session.amount}</span>
						</span>
					</div>
					<div className="col col-lrg-12 type--center u-mar--top--lrg">
						<div className="type--med type--wgt--regular">{t('SESSION.CREATE.STEP4.FINISH_MESSAGE1')}</div>
						<div className="type--med type--wgt--regular">{t('SESSION.CREATE.STEP4.FINISH_MESSAGE2')}</div>
						<div className="type--med type--wgt--regular">{t('SESSION.CREATE.STEP4.FINISH_MESSAGE3')}</div>
					</div>
					<div className="col col-lrg-12 type--center u-mar--top--lrg u-mar--bottom--med">
						<BaasicButton
							className="btn btn--med btn--med--wide btn--secondary"
							onClick={onNextStepClick}
							label="SESSION.CREATE.STEP4.BUTTONS.FINISH"
						/>
					</div>
				</div>
			</div>
			<div className="scanner__finish--counter">
				<span>
					{t('SESSION.CREATE.STEP4.AUTOCLOSE_MESSAGE')}
					{currentCount}
				</span>
			</div>
		</React.Fragment>
	);
}

Step4Template.propTypes = {
	step4ViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
	onNextStepClick: PropTypes.func.isRequired,
	session: PropTypes.object.isRequired,
	currentCount: PropTypes.number.isRequired,
};

export default defaultTemplate(Step4Template);
