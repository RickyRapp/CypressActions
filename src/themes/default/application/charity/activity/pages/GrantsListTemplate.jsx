import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicTable,
	TableFilter,
	BaasicDropdown,
	BaasicInput,
	BaasicModal,
	DateRangeQueryPicker,
} from 'core/components';
import { Content } from 'core/layouts';
import { SelectDonor } from 'application/administration/donor/components';

const GrantListTemplate = function ({ grantsViewStore }) {
	const {
		tableStore,
		queryUtility,
		authorization,
		searchDonorDropdownStore,
		donationStatusDropdownStore,
		selectDonorModal,
		donationTypeDropdownStore,
		dateCreatedDateRangeQueryStore,
	} = grantsViewStore;
 
	return (
		<Content>
			<div className="card--tertiary card--med u-mar--bottom--sml">
				<div className="row row--form u-mar--bottom--med">
					<div className="col col-sml-12 col-xxlrg-12">
						<TableFilter colClassName={"col col-sml-12 col-xxlrg-9"} btnClassName={"col col-sml-6 col-med-4 col-xxlrg-3"} queryUtility={queryUtility}>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicDropdown store={searchDonorDropdownStore} />
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicInput
									id="confirmationNumber"
									className="input input--lrg"
									value={queryUtility.filter.confirmationNumber || ''}
									onChange={event => (queryUtility.filter.confirmationNumber = event.target.value)}
									placeholder="GRANT.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicInput
									id="checkNumber"
									className="input input--lrg"
									value={queryUtility.filter.checkNumber || ''}
									onChange={event => (queryUtility.filter.checkNumber = event.target.value)}
									placeholder="GRANT.LIST.FILTER.CHECK_NUMBER_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicInput
									id="dollarRange"
									className="input input--lrg"
									value={queryUtility.filter.dollarRange || ''}
									onChange={event => (queryUtility.filter.dollarRange = event.target.value)}
									placeholder="GRANT.LIST.FILTER.DOLLAR_RANGE_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicDropdown
									store={donationStatusDropdownStore}
									placeholder="GRANT.LIST.FILTER.GRANT_STATUS_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicDropdown
									store={donationTypeDropdownStore}
									placeholder="GRANT.LIST.FILTER.GRANT_TYPE_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicInput
									id="purposeNote"
									className="input input--lrg"
									value={queryUtility.filter.purposeNote || ''}
									onChange={event => (queryUtility.filter.purposeNote = event.target.value)}
									placeholder="GRANT.LIST.FILTER.INFORMATION_FROM_GRANT_PURPOSE_FIELDS"
								/>
							</div>
							<div className="col col-sml-12 u-mar--bottom--sml">
								<div className="row row--form">
									<div className="col col-sml-12 col-lrg-8">
										<DateRangeQueryPicker
											queryUtility={queryUtility}
											store={dateCreatedDateRangeQueryStore}
											fromPropertyName="dateCreatedFrom"
											toPropertyName="dateCreatedTo"
										/>
									</div>
								</div>
							</div>
						</TableFilter>
					</div>
				</div>

				<BaasicTable authorization={authorization} tableStore={tableStore}/>
			</div>

			<BaasicModal modalParams={selectDonorModal}>
				<SelectDonor />
			</BaasicModal>
		</Content>
	);
};

GrantListTemplate.propTypes = {
	grantsViewStore: PropTypes.object.isRequired,
	onDeclineClick: PropTypes.func,
	t: PropTypes.func,
};


export default defaultTemplate(GrantListTemplate);
