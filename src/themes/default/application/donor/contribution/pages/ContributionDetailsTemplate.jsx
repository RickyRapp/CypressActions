import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { PreviewLayout } from 'core/layouts';
import { ApplicationEmptyState, FormatterResolver } from 'core/components';
import { ContributionProgressTimeline } from 'application/administration/contribution/components';
import { DepositGeneralInformationTemplate, DepositPaymentInformation } from 'themes/application/donor/contribution/components';

const ContributionDetailsTemplate = function({ contributionDetailsViewStore, t }) {
	const { item, loaderStore, statusList } = contributionDetailsViewStore;

	return (
		<PreviewLayout
			store={contributionDetailsViewStore}
			emptyRenderer={<ApplicationEmptyState />}
			loading={loaderStore.loading}
			layoutFooterVisible={false}
		>
			<h3 className=" u-mar--bottom--med">{t('CONTRIBUTION.DETAILS.DETAILS')}</h3>
			<div className="container--base">
				{item && !(item.contributionStatus.abrv === 'processed') && (
					<ContributionProgressTimeline item={item} statusList={statusList} />
				)}
			</div>
			<div className="row row--form">
				<div className="col col-sml-12 col-lrg-8">
					<DepositGeneralInformationTemplate item={item} t={t} />
					<DepositPaymentInformation item={item} t={t} />
				</div>

				<div className="col col-sml-12 col-lrg-4">
					<div className="card card--primary card--med u-mar--bottom--med">
						<h3 className="u-mar--bottom--med">{t('CONTRIBUTION.DETAILS.SUMMARY')}</h3>
						<div className="row row--form">
							<div className="col col-sml-12 u-mar--bottom--sml">
								<div className="card--secondary card--med type--center">
									<div className="type--lrg type--wgt--bold type--color--note">
										{item && item.donor && (
											<FormatterResolver
												item={{ amount: item.donor.totalMoneyGiven }}
												field="amount"
												format={{ type: 'currency' }}
											/>
										)}
									</div>
									<div className="type--base type--wgt--medium">{t('CONTRIBUTION.DETAILS.TOTAL_MONEY_GIVEN')}</div>
								</div>
							</div>
							<div className="col col-sml-12">
								<div className="card--secondary--light card--med type--center">
									<div className="type--lrg type--wgt--bold type--color--note">
										{item && item.donor && (
											<FormatterResolver
												item={{ amount: item.donor.totalMoneyUpcoming }}
												field="amount"
												format={{ type: 'currency' }}
											/>
										)}
									</div>
									<div className="type--base type--wgt--medium">{t('CONTRIBUTION.DETAILS.TOTAL_MONEY_UPCOMING')}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PreviewLayout>
	);
};

ContributionDetailsTemplate.propTypes = {
	contributionDetailsViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(ContributionDetailsTemplate);
