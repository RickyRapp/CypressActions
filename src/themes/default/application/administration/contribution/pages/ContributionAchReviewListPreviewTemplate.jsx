import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicButton,
	BaasicTable,
	BasicInput,
} from 'core/components';
import { ApplicationListLayout, Content, PageHeader } from 'core/layouts';

const ContributionAchReviewListPreviewTemplate = function ({ contributionViewStore, t }) {
	const {
		routes,
		tableStore,
		authorization,
		selectedItemsSum,
		submitPending,
		onAchNextPaymentNumberClick,
		achBatchCurrentNumber,
		form
	} = contributionViewStore;

	return (
		<React.Fragment>
			<ApplicationListLayout store={contributionViewStore} authorization={authorization}>
				<Content>
					<div className="card--tertiary card--med u-mar--bottom--sml">
						<div className="row u-mar--bottom--med">
							<div className="col col-sml-6 col-lrg-2">
								
								<div> 
									<BaasicButton
										className="btn btn--med btn--med--med btn--ghost"
										label={t('ACTIVITY.DEPOSIT_TAB.CSV_BUTTON')}
										onClick={submitPending}
									/>
								</div>
							</div>
							<div className="col col-sml-12 col-lrg-3">
								<BasicInput field={form.$('paymentNumber')} />
								<div>
									Next ACH batch number: <span className='btn btn--sml btn--link' onClick={onAchNextPaymentNumberClick}>{achBatchCurrentNumber + 1}</span>
								</div>
							</div>
							<div className="col col-sml-12 col-lrg-3">
								<p>Sum of selected items: {selectedItemsSum} $</p>
							</div>
						</div>
						<BaasicTable authorization={authorization} tableStore={tableStore} />
					</div>
				</Content>
			</ApplicationListLayout>
		</React.Fragment>
	);
};

ContributionAchReviewListPreviewTemplate.propTypes = {
	contributionViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};


export default defaultTemplate(ContributionAchReviewListPreviewTemplate);
