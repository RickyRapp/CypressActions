/* eslint-disable react/prop-types */
import React from 'react';
import { FormatterResolver, Date } from 'core/components';
import { addressFormatter } from 'core/utils';
import _ from 'lodash';

const GrantsPreviewCardTemplate = ({ item, t }) => {
	return (
		<div>
			<div className="u-mar--bottom--sml">
				<div className="type--base type--wgt--medium type--color--note">
					{t('GRANT.PREVIEW.FIELDS.DONOR_NAME_LABEL')}
				</div>
				<span className="input--preview">{item && <React.Fragment>{item.donor.donorName}</React.Fragment>}</span>
			</div>
			<div className="u-mar--bottom--sml">
				<div className="type--base type--wgt--medium type--color--note">{t('GRANT.PREVIEW.FIELDS.CHARITY_LABEL')}</div>
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
			<div className="u-mar--bottom--sml">
				<div className="type--base type--wgt--medium type--color--note">
					{t('GRANT.PREVIEW.FIELDS.DATE_CREATED_LABEL')}
				</div>
				<span className="input--preview">{item && <Date format="full" value={item.dateCreated} />}</span>
			</div>
			<div className="u-mar--bottom--sml">
				<div className="type--base type--wgt--medium type--color--note">{t('GRANT.PREVIEW.FIELDS.AMOUNT_LABEL')}</div>
				<span className="input--preview">
					{item && <FormatterResolver item={{ amount: item.amount }} field="amount" format={{ type: 'currency' }} />}
				</span>
			</div>
			<div className="u-mar--bottom--sml">
				<div className="type--base type--wgt--medium type--color--note">
					{t('GRANT.PREVIEW.FIELDS.CONFIRMATION_NUMBER_LABEL')}
				</div>
				<span className="input--preview">{item && <React.Fragment>{item.confirmationNumber}</React.Fragment>}</span>
			</div>
			<div className="u-mar--bottom--sml">
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
			<div className="u-mar--bottom--sml">
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
			{item && (item.url || item.thirdPartyWebsite) && (
				<div className="u-mar--bottom--sml">
					<div className="type--base type--wgt--medium type--color--note">
						{t('GRANT.PREVIEW.FIELDS.CHARITY_WEBSITE_LABEL')}
					</div>
					<span className="input--preview">
						{item && (
							<React.Fragment>
								{item.thirdPartyWebsite && item.thirdPartyWebsite.name + '-'}{' '}
								{item.url ? item.url : item.thirdPartyWebsite.url}
							</React.Fragment>
						)}
					</span>
				</div>
			)}
			{item && item.grantScheduledPayment && (
				<div className="u-mar--bottom--sml">
					<div className="type--base type--wgt--medium type--color--note">
						{t('GRANT.PREVIEW.FIELDS.SCHEDULED_LABEL')}
					</div>
					<span className="input--preview">
						{item && <Date format="full" value={item.grantScheduledPayment.dateCreated} />}
					</span>
				</div>
			)}
			<div className="u-mar--bottom--sml">
				<div className="type--base type--wgt--medium type--color--note">{t('GRANT.PREVIEW.FIELDS.ADDRESS')}</div>
				<span className="input--preview">
					{item && (
						<React.Fragment>{`${item.addressLine1}, ${item.addressLine2 ? item.addressLine2 + ', ' : ''} ${
							item.city
						}, ${item.state}, ${item.zipCode}`}</React.Fragment>
					)}
				</span>
			</div>
			<div className="u-mar--bottom--sml">
				<div className="type--base type--wgt--medium type--color--note">
					{t('GRANT.PREVIEW.FIELDS.DECLINATION_REASON')}
				</div>
				<span className="input--preview">
					{item && <React.Fragment>{`${item.checkDeclinationReason}`}</React.Fragment>}
				</span>
			</div>
		</div>
	);
};

export default GrantsPreviewCardTemplate;
