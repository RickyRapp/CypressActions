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
	NumberFormatInput,
} from 'core/components';
import { Content } from 'core/layouts';
import { SelectDonor } from 'application/administration/donor/components';

const CharityWithdrawListTemplate = function ({ charityWithdrawListViewStore }) {
	const {
		tableStore,
		queryUtility,
		authorization,
		searchDonorDropdownStore,
		donationStatusDropdownStore,
		selectDonorModal,
		donationTypeDropdownStore,
		dateCreatedDateRangeQueryStore,
	} = charityWithdrawListViewStore;
 
	return (
		<Content>
			<div className="card--tertiary card--med u-mar--bottom--sml">
				<TableFilter colClassName={"u-mar--bottom--sml"} queryUtility={queryUtility}>
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
						<NumberFormatInput
							className="input input--lrg"
							value={queryUtility.filter.bookletCertificateCode}
							onChange={event => (queryUtility.filter.bookletCertificateCode = event.formattedValue)}
							format="######-##"
							placeholder="Check Number"
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
				
				<BaasicTable authorization={authorization} tableStore={tableStore}/>
			</div>

			<BaasicModal modalParams={selectDonorModal}>
				<SelectDonor />
			</BaasicModal>
		</Content>
	);
};

CharityWithdrawListTemplate.propTypes = {
	grantsViewStore: PropTypes.object.isRequired,
	onDeclineClick: PropTypes.func,
	t: PropTypes.func,
};


export default defaultTemplate(CharityWithdrawListTemplate);
