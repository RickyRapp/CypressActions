import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEmptyState, FormatterResolver, Date, BaasicButton } from 'core/components';
import { addressFormatter, isSome } from 'core/utils';
import { PreviewLayout } from 'core/layouts';
import _ from 'lodash';
import { PreviewCardLoaderTemplate, ProgressTimelineLoaderTemplate } from 'themes/components';
import { GrantProgressTimeline } from 'application/administration/grant/components';

function GrantPreviewTemplate({ grantPreviewViewStore, t }) {
	const {
		item,
		loaderStore,
		isEditable,
		cancelGrant,
		newGrant,
		editGrant,
		isCancelable,
		statusList,
	} = grantPreviewViewStore;

	return (
		<PreviewLayout
			store={grantPreviewViewStore}
			emptyRenderer={<ApplicationEmptyState />}
			loading={false}
			layoutFooterVisible={false}
		>
			<div className="container--base">
				{loaderStore.loading ? (
					<ProgressTimelineLoaderTemplate />
				) : (
					item &&
					!(item.donationStatus.abrv === 'processed' && !isSome(item.debitCharityTransaction)) && ( //old grants
						<GrantProgressTimeline item={item} statusList={statusList} />
					)
				)}

				<div className="container--sml card--primary card--med u-mar--bottom--med">
					{loaderStore.loading ? (
						<PreviewCardLoaderTemplate />
					) : (
						<div>
							<div className="u-mar--bottom--med">
								<div className="type--base type--wgt--medium type--color--note">
									{t('GRANT.PREVIEW.FIELDS.CHARITY_LABEL')}
								</div>
								<span className="input--preview">
									{item && (
										<FormatterResolver
											item={{ charity: item.charity }}
											field="charity"
											format={{ type: 'charity', value: 'charity-name-display' }}
										/>
									)}
								</span>
							</div>
							<div className="u-mar--bottom--med">
								<div className="type--base type--wgt--medium type--color--note">
									{t('GRANT.PREVIEW.FIELDS.DATE_CREATED_LABEL')}
								</div>
								<span className="input--preview">{item && <Date format="full" value={item.dateCreated} />}</span>
							</div>
							<div className="u-mar--bottom--med">
								<div className="type--base type--wgt--medium type--color--note">
									{t('GRANT.PREVIEW.FIELDS.AMOUNT_LABEL')}
								</div>
								<span className="input--preview">
									{item && (
										<FormatterResolver item={{ amount: item.amount }} field="amount" format={{ type: 'currency' }} />
									)}
								</span>
							</div>
							<div className="u-mar--bottom--med">
								<div className="type--base type--wgt--medium type--color--note">
									{t('GRANT.PREVIEW.FIELDS.CONFIRMATION_NUMBER_LABEL')}
								</div>
								<span className="input--preview">
									{item && <React.Fragment>{item.confirmationNumber}</React.Fragment>}
								</span>
							</div>
							<div className="u-mar--bottom--med">
								<div className="type--base type--wgt--medium type--color--note">
									{t('GRANT.PREVIEW.FIELDS.PURPOSE_TYPE_LABEL')}
								</div>
								<span className="input--preview">
									{item && (
										<React.Fragment>
											{item.grantPurposeType.name} {`${item.purposeNote ? ' - ' + item.purposeNote : ''}`}
										</React.Fragment>
									)}
								</span>
							</div>
							<div className="u-mar--bottom--med">
								<div className="type--base type--wgt--medium type--color--note">
									{t('GRANT.PREVIEW.FIELDS.ACKNOWLEDGMENT_LABEL')}
								</div>
								<span className="input--preview">
									{item && (
										<React.Fragment>
											{item.grantAcknowledgmentType.abrv === 'name-and-address' &&
												`${item.donor.donorName} - ${addressFormatter.format(
													_.find(item.donor.donorAddresses, { isPrimary: true }),
													'full'
												)}`}
											{item.grantAcknowledgmentType.abrv === 'fund-name-and-address' &&
												`${item.donor.fundName} - ${addressFormatter.format(
													_.find(item.donor.donorAddresses, { isPrimary: true }),
													'full'
												)}`}
											{item.grantAcknowledgmentType.abrv === 'fund-name' && item.donor.fundName}
											{item.grantAcknowledgmentType.abrv === 'remain-anonymous' && 'Anonymous'}
										</React.Fragment>
									)}
								</span>
							</div>
							{item && item.thirdPartyWebsite && (
								<div className="u-mar--bottom--med">
									<div className="type--base type--wgt--medium type--color--note">
										{t('GRANT.PREVIEW.FIELDS.CHARITY_WEBSITE_LABEL')}
									</div>
									<span className="input--preview">
										{item && (
											<React.Fragment>
												{item.thirdPartyWebsite.name} - {item.thirdPartyWebsite.url}
											</React.Fragment>
										)}
									</span>
								</div>
							)}
							{item && item.grantScheduledPayment && (
								<div className="u-mar--bottom--med">
									<div className="type--base type--wgt--medium type--color--note">
										{t('GRANT.PREVIEW.FIELDS.SCHEDULED_LABEL')}
									</div>
									<span className="input--preview">
										{item && <Date format="full" value={item.grantScheduledPayment.dateCreated} />}
									</span>
								</div>
							)}
							<div className="u-mar--bottom--med">
								<div className="type--base type--wgt--medium type--color--note">
									{t('GRANT.PREVIEW.FIELDS.ADDRESS')}
								</div>
								<span className="input--preview">
									{item && (
										<React.Fragment>{`${item.addressLine1}, ${item.addressLine2 ? item.addressLine2 + ', ' : ''} ${
											item.city
										}, ${item.state}, ${item.zipCode}`}</React.Fragment>
									)}
								</span>
							</div>
							{item && item.checkDeclinationReason && (
								<div className="u-mar--bottom--sml">
									<div className="type--base type--wgt--medium type--color--note">
										{t('GRANT.PREVIEW.FIELDS.DECLINATION_REASON')}
									</div>
									<span className="input--preview">
										{item && <React.Fragment>{`${item.checkDeclinationReason}`}</React.Fragment>}
									</span>
								</div>
							)}
						</div>
					)}
				</div>
			</div>

			<div className="c-footer__actions">
				<BaasicButton
					className="btn btn--lrg btn--primary"
					onClick={newGrant}
					icon=""
					label={t('PREVIEW_LAYOUT.NEW_GRANT')}
				/>
				{!isEditable && (
					<BaasicButton
						className="btn btn--lrg btn--primary"
						onClick={editGrant}
						icon=""
						label={t('PREVIEW_LAYOUT.EDIT_BUTTON')}
					/>
				)}
				{isCancelable && (
					<BaasicButton
						className="btn btn--lrg btn--ghost"
						onClick={cancelGrant}
						icon=""
						label={t('PREVIEW_LAYOUT.CANCEL_GRANT_BUTTON')}
					/>
				)}
			</div>
		</PreviewLayout>
	);
}

GrantPreviewTemplate.propTypes = {
	grantPreviewViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(GrantPreviewTemplate);
