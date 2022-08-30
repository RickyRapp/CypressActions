import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEmptyState, FormatterResolver, SimpleBaasicTable } from 'core/components';
import { PreviewLayout } from 'core/layouts';
import { SessionPreviewDetailsCardTemplate, SessionPreviewDetailsLoaderTemplate } from '../components';

function SessionPreviewTemplate({ sessionPreviewViewStore, t }) {
	const {
		item,
		tableStore,
		loaderStore,
		discardedTableStore,
		pendingTableStore,
		donorReviewTableStore,
		adminReviewTableStore,
		checksOnHoldTableStore,
	} = sessionPreviewViewStore;

	return (
		<PreviewLayout
			store={sessionPreviewViewStore}
			emptyRenderer={<ApplicationEmptyState />}
			loading={false}
			layoutFooterVisible={false}
		>
			{loaderStore.loading ? <SessionPreviewDetailsLoaderTemplate /> : <SessionPreviewDetailsCardTemplate item={item} t={t} />}

			<div className="card--primary card--med u-mar--bottom--med">
				<h3 className="u-mar--bottom--med">Approved Certificates</h3>
				<SimpleBaasicTable tableItems={4} loading={loaderStore.loading} tableStore={tableStore} />
				<h3 className="u-mar--bottom--med u-mar--top--med">Disapproved Certificates</h3>
				<SimpleBaasicTable tableItems={4} loading={loaderStore.loading} tableStore={discardedTableStore} />
				<h3 className="u-mar--bottom--med u-mar--top--med">Certificates on Admin Review</h3>
				<SimpleBaasicTable tableItems={4} loading={loaderStore.loading} tableStore={adminReviewTableStore} />
				<h3 className="u-mar--bottom--med u-mar--top--med">Certificates on Donor Review</h3>
				<SimpleBaasicTable tableItems={4} loading={loaderStore.loading} tableStore={donorReviewTableStore} />
				<h3 className="u-mar--bottom--med u-mar--top--med">Checks on Hold</h3>
				<SimpleBaasicTable tableItems={4} loading={loaderStore.loading} tableStore={checksOnHoldTableStore} />
				<h3 className="u-mar--bottom--med u-mar--top--med">Pending Certificates</h3>
				<SimpleBaasicTable tableItems={4} loading={loaderStore.loading} tableStore={pendingTableStore} />
				<div className="row u-mar--top--lrg">
					<div className="form__group col col-lrg-12">
						{t('SESSION.EDIT.TOTAL_AMOUNT')}{' '}
						<FormatterResolver item={{ amount: item && item.amount }} field="amount" format={{ type: 'currency' }} />
					</div>
					<div className="form__group col col-lrg-12">
						{t('SESSION.EDIT.TOTAL_AMOUNT_AFTER_FEE')}{' '}
						<FormatterResolver
							item={{ amount: item && item.totalAmountForCharity }}
							field="amount"
							format={{ type: 'currency' }}
						/>
					</div>
					<div className="form__group col col-lrg-12">
						{t('SESSION.EDIT.TOTAL_COUNT')} {item && item.grants.length}
					</div>
					<div className="form__group col col-lrg-12">
						{t('SESSION.EDIT.TOTAL_CHECKS_ON_HOLD')}{' '}
						<FormatterResolver
							item={{ amount: item && item.totalPending }}
							field="amount"
							format={{ type: 'currency' }}
						/>
					</div>
				</div>
			</div>
		</PreviewLayout>
	);
}

SessionPreviewTemplate.propTypes = {
	sessionPreviewViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(SessionPreviewTemplate);
