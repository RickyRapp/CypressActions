import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicModal, FormatterResolver, SimpleBaasicTable } from 'core/components';
import { MonthlyFeeJsonTemplate } from 'themes/application/donor/activity/transaction/components';
import { isSome } from 'core/utils';
import { TransactionInfoCard } from 'application/donor/activity/transaction/components';
import { TransactionInfoCardLoader } from './content-loader';

const TransactionDonorTemplate = function({ transactionDonorViewStore, t }) {
	const {
		donor,
		isPendingTransactionVisible,
		pendingTransactionTableStore,
		onExpandPendingTransactionClick,
		previewFeesModal,
		isChecksOnHoldVisible,
		checksOnHoldTableStore,
		onExpandChecksOnHoldClick,
	} = transactionDonorViewStore;

	return (
		<React.Fragment>
			<div className="row">
				<div className="col col-sml-12 u-mar--bottom--sml">
					{/* <h3 className="type--med type--wgt--medium u-mar--bottom--med">{t('DASHBOARD.YOUR_FUNDS')}</h3> */}
					<div className="card--tertiary">
						<div className="row row--form">
							<div className="col col-sml-4">
								{donor ? (
									<TransactionInfoCard
										donor={donor}
										balance={donor.availableBalance}
										title={t('DASHBOARD.AVAILABLE_BALANCE')}
									/>
								) : (
									<TransactionInfoCardLoader customClassName={'transaction__card u-padd--right--sml'} />
								)}
							</div>
							<div className="col col-sml-4">
								{donor ? (
									<TransactionInfoCard
										donor={donor}
										balance={donor.presentBalance}
										title={t('DASHBOARD.PRESENT_BALANCE')}
										customClassName={'transaction__card--center'}
									/>
								) : (
									<TransactionInfoCardLoader customClassName={'transaction__card u-padd--right--sml'} />
								)}
							</div>
							<div className="col col-sml-4">
								{donor ? (
									<TransactionInfoCard
										donor={donor}
										balance={0}
										title={t('DASHBOARD.INVESTMENTS_BALANCE')}
										customClassName={'transaction__card--last'}
									/>
								) : (
									<TransactionInfoCardLoader customClassName={'transaction__card--last'} />
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="col col-sml-12 u-mar--bottom--sml">
					<div className="transaction__show">
						<div className="transaction__show--body">
							<span className="type--base type--wgt--medium type--color--text">
								Pending Transaction:{' '}
								{pendingTransactionTableStore.data.length > 0 && (
									<FormatterResolver
										item={{
											balance: pendingTransactionTableStore.data
												.map(c =>
													c.paymentTransaction.paymentTransactionType.abrv == 'credit'
														? c.paymentTransaction.amount * -1
														: c.paymentTransaction.amount
												)
												.reduce((t, a) => t + a),
										}}
										field="balance"
										format={{ type: 'currency' }}
									/>
								)}
							</span>
							<BaasicButton
								className="btn btn--icon"
								onlyIconClassName="u-mar--right--sml"
								icon={`u-icon ${
									isPendingTransactionVisible ? 'u-icon--close' : 'u-icon--arrow-down--primary'
								} u-icon--base`}
								label="EXPAND"
								onlyIcon={true}
								onClick={() => onExpandPendingTransactionClick()}
							></BaasicButton>
						</div>

						{isPendingTransactionVisible && (
							<div className="row">
								<div className="col col-sml-12 u-mar--top--sml">
									<SimpleBaasicTable
										className="table--transaction"
										tableStore={pendingTransactionTableStore}
										actionsComponent={renderActions}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className="col col-sml-12 u-mar--bottom--sml">
					<div className="transaction__show">
						<div className="transaction__show--body">
							<span className="type--base type--wgt--medium type--color--text">
								Checks on Hold:{' '}
								{checksOnHoldTableStore.data.length > 0 && (
									<FormatterResolver
										item={{
											balance: checksOnHoldTableStore.data
												.map(c =>
													c.certificate.openCertificateAmount
														? c.certificate.openCertificateAmount
														: c.certificate.denominationType.value
												)
												.reduce((t, a) => t + a),
										}}
										field="balance"
										format={{ type: 'currency' }}
									/>
								)}
							</span>
							<BaasicButton
								className="btn btn--icon"
								onlyIconClassName="u-mar--right--sml"
								icon={`u-icon ${isChecksOnHoldVisible ? 'u-icon--close' : 'u-icon--arrow-down--primary'} u-icon--base`}
								label="EXPAND"
								onlyIcon={true}
								onClick={() => onExpandChecksOnHoldClick()}
							></BaasicButton>
						</div>

						{isChecksOnHoldVisible && (
							<div className="row">
								<div className="col col-sml-12 u-mar--top--sml">
									<SimpleBaasicTable tableStore={checksOnHoldTableStore} />
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<BaasicModal modalParams={previewFeesModal}>
				<MonthlyFeeJsonTemplate />
			</BaasicModal>
		</React.Fragment>
	);
};

TransactionDonorTemplate.propTypes = {
	transactionDonorViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
};

function renderActions({ item, actions, actionsRender }) {
	if (!isSome(actions)) return null;

	const { onPreview } = actions;
	if (!isSome(onPreview)) return null;

	let previewRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onPreviewRender) {
			previewRender = actionsRender.onPreviewRender(item);
		}
	}

	return (
		<td>
			<div className="type--right">
				{isSome(onPreview) && previewRender ? (
					<BaasicButton
						className="btn btn--icon"
						icon="u-icon u-icon--preview u-icon--base"
						label="TEST.SCHEDULED_SETTING.LIST.BUTTON.RUN"
						onlyIcon={true}
						onClick={() => onPreview(item)}
					></BaasicButton>
				) : null}
			</div>
		</td>
	);
}

renderActions.propTypes = {
	item: PropTypes.object,
	actions: PropTypes.object,
	actionsRender: PropTypes.object,
};

export default defaultTemplate(TransactionDonorTemplate);
