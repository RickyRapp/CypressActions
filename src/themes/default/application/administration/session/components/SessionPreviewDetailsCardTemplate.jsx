import React from 'react';
import PropTypes from 'prop-types';
import { FormatterResolver, Date } from 'core/components';

const SessionPreviewDetailsCardTemplate = ({ item, t }) => {
	return (
		<div className="card--primary card--med u-mar--bottom--med">
			<div className="row">
				<div className="col col-sml-12 col-lrg-4 u-mar--bottom--med">
					<div className="type--med type--wgt--medium">{t('SESSION.PREVIEW.FIELDS.CHARITY_LABEL')}</div>
					<span className="type--base type--color--opaque">
						{item && item.charity && (
							<FormatterResolver
								item={{ charity: item.charity }}
								field="charity"
								format={{ type: 'charity', value: 'charity-name-display' }}
							/>
						)}
					</span>
				</div>
				<div className="col col-sml-12 col-lrg-4 u-mar--bottom--med">
					<div className="type--med type--wgt--medium">{t('SESSION.PREVIEW.FIELDS.FULL_NAME_LABEL')}</div>
					<span className="type--base type--color--opaque">{item && item.fullName}</span>
				</div>
				<div className="col col-sml-12 col-lrg-4 u-mar--bottom--med">
					<div className="type--med type--wgt--medium">{t('SESSION.PREVIEW.FIELDS.PHONE_NUMBER_LABEL')}</div>
					<span className="type--base type--color--opaque">{item && item.phoneNumber}</span>
				</div>
				<div className="col col-sml-12 col-lrg-4 u-mar--bottom--med">
					<div className="type--med type--wgt--medium">{t('SESSION.PREVIEW.FIELDS.EMAIL_LABEL')}</div>
					{item && item.sessionEmails &&  item.sessionEmails[0] ? (
						item.sessionEmails.map( (item, index) => {
							return (
								<div>
								<span key={index} className="type--base type--color--opaque">{item && item.email}</span> <br></br>
								</div>
							)
						})
					):(
						<span className="type--base type--color--opaque">{item && item.email}</span>
					) }
					
				</div>
				<div className="col col-sml-12 col-lrg-4 u-mar--bottom--med">
					<div className="type--med type--wgt--medium">{t('SESSION.PREVIEW.FIELDS.CONFIRMATION_NUMBER_LABEL')}</div>
					<span className="type--base type--color--opaque">{item && item.confirmationNumber}</span>
				</div>
				<div className="col col-sml-12 col-lrg-4 u-mar--bottom--med">
					<div className="type--med type--wgt--medium">
						{t('SESSION.PREVIEW.FIELDS.ORIGINAL_CONFIRMATION_NUMBER_LABEL')}
					</div>
					<span className="type--base type--color--opaque">{item && item.originalConfirmationNumber}</span>
				</div>
				<div className="col col-sml-12 col-lrg-4 u-mar--bottom--med">
					<div className="type--med type--wgt--medium">{t('SESSION.PREVIEW.FIELDS.NEW_CONFIRMATION_NUMBER_LABEL')}</div>
					<span className="type--base type--color--opaque">{item && item.newConfirmationNumbers}</span>
				</div>
				<div className="col col-sml-12 col-lrg-4 u-mar--bottom--med">
					<div className="type--med type--wgt--medium">{t('SESSION.PREVIEW.FIELDS.DATE_CREATED_LABEL')}</div>
					<span className="type--base type--color--opaque">
						{item && <Date format="full" value={item.dateCreated} />}
					</span>
				</div>
				<div className="col col-sml-12 col-lrg-4 u-mar--bottom--med">
					<div className="type--med type--wgt--medium">{t('SESSION.PREVIEW.FIELDS.CHECK_COUNT_LABEL')}</div>
					<span className="type--base type--color--opaque">{item && item.checkCount}</span>
				</div>
				<div className="col col-sml-12 col-lrg-4 u-mar--bottom--med">
					<div className="type--med type--wgt--medium">{t('SESSION.PREVIEW.FIELDS.ESTIMATED_AMOUNT_LABEL')}</div>
					<span className="type--base type--color--opaque">
						<FormatterResolver
							item={{ amount: item && item.estimatedAmount }}
							field="amount"
							format={{ type: 'currency' }}
						/>
						<b>
							&nbsp;
							{item &&
								item.estimatedAmount &&
								(item.amount - item.estimatedAmount > 0
									? '(↑)'
									: item.amount - item.estimatedAmount == 0
									? '(=)'
									: '(↓)')}
						</b>
					</span>
				</div>
			</div>
		</div>
	);
};

SessionPreviewDetailsCardTemplate.propTypes = {
    item: PropTypes.any,
    t: PropTypes.func
};

export default SessionPreviewDetailsCardTemplate;
