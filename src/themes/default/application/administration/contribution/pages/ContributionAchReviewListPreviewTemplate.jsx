import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicButton,
	BaasicTable,
	BasicInput,
} from 'core/components';
import { ApplicationListLayout, Content } from 'core/layouts';

const ContributionAchReviewListPreviewTemplate = function ({ contributionAchReviewListPreviewViewStore, t }) {
	const {
		tableStore,
		authorization,
		submitPending,
		onAchNextPaymentNumberClick,
		achBatchCurrentNumber,
		form
	} = contributionAchReviewListPreviewViewStore;

	return (
		<React.Fragment>
				<Content>
					<div className="card--tertiary card--med u-mar--bottom--sml">
						<div className="row u-mar--bottom--med">
							<div className="col col-sml-6 col-lrg-4 u-mar--top--sml">
								<BaasicButton
									className="btn btn--med btn--med--med btn--ghost"
									label={t('ACTIVITY.DEPOSIT_TAB.CSV_BUTTON')}
									onClick={submitPending}
								/>
							</div>
							<div className="col col-sml-6 col-lrg-3">
								<BasicInput field={form.$('paymentNumber')} />
								<div>
									Next ACH batch number: <span className='btn btn--sml btn--link' onClick={onAchNextPaymentNumberClick}>{achBatchCurrentNumber + 1}</span>
								</div>
							</div>
						</div>
						<BaasicTable authorization={authorization} tableStore={tableStore} />
					</div>
				</Content>
		</React.Fragment>
	);
};

ContributionAchReviewListPreviewTemplate.propTypes = {
	contributionAchReviewListPreviewViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};


export default defaultTemplate(ContributionAchReviewListPreviewTemplate);
