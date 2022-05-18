import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicTable,
	TableFilter,
	BaasicDropdown,
	DateRangeQueryPicker,
	BaasicModal,
} from 'core/components';
import { ApplicationListLayout, Content, PageHeader } from 'core/layouts';
import { SelectDonor } from 'application/administration/donor/components';

const CreditDebitListTemplate = function ({ creditDebitViewStore }) {
	const {
		routes,
		tableStore,
		queryUtility,
		authorization,
		searchDonorDropdownStore,
		dateCreatedDateRangeQueryStore,
		selectDonorModal,
		searchCharityDropdownStore,
		userTypeDropdownStore
	} = creditDebitViewStore;

	return (
		<ApplicationListLayout store={creditDebitViewStore} authorization={authorization}>
			<PageHeader routes={routes}></PageHeader>
			<Content>
				<div className="card--tertiary card--med u-mar--bottom--sml">
					<div className="u-mar--bottom--med">
						<TableFilter colClassName={"col col-sml-12 col-lrg-8"} queryUtility={queryUtility} visibleByDefault={false}>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicDropdown store={searchDonorDropdownStore} />
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicDropdown store={searchCharityDropdownStore} />
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicDropdown store={userTypeDropdownStore} />
							</div>
							<div className="col col-sml-12 u-mar--bottom--sml">
								<div className="row row--form">
									<div className="col col-sml-8">
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

					<BaasicTable authorization={authorization} tableStore={tableStore} />
				</div>
			</Content>
			<BaasicModal modalParams={selectDonorModal}>
				<SelectDonor />
			</BaasicModal>
		</ApplicationListLayout>
	);
};

CreditDebitListTemplate.propTypes = {
	creditDebitViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(CreditDebitListTemplate);
