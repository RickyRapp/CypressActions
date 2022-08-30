import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicButton,
	BaasicTable,
	TableFilter,
	BaasicDropdown,
	BaasicInput,
	Export,
	BaasicModal,
	DateRangeQueryPicker,
} from 'core/components';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';
import { GrantDeclineTemplate } from 'application/administration/grant/components';
import AsyncSelect from 'react-select/async';
import { SelectCharity } from 'application/administration/charity/components';

const WithdrawFundListTemplate = function ({ withdrawFundViewStore }) {
	const {
		tableStore,
		queryUtility,
		authorization,
		donationStatusDropdownStore,
		dateCreatedDateRangeQueryStore,
		declineModal,
		debouncedSearchCharities,
        setCharityId,
		routes,
		selectCharityModal
	} = withdrawFundViewStore;
 
	let promiseOptions = (inputValue) =>
	new Promise(resolve => {
			inputValue.length >= 3 ? debouncedSearchCharities(inputValue, resolve) : resolve(null);
	});

	return (
        <ApplicationListLayout store={withdrawFundViewStore} authorization={authorization}>
            <Content>
			<div className="card--tertiary card--med u-mar--bottom--sml">
				<div className="row row--form u-mar--bottom--med">
					<div className="col col-sml-12 col-xxlrg-9">
						<TableFilter colClassName={"col col-sml-12 col-xxlrg-9"} btnClassName={"col col-sml-6 col-med-4 col-xxlrg-3"} queryUtility={queryUtility}>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								{/* <BaasicDropdown store={searchCharityDropdownStore} /> */}
								<AsyncSelect onChange={e => setCharityId(e.value)} cacheOptions defaultOptions={true} loadOptions={promiseOptions} classNamePrefix="react-select" />
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
								<BaasicDropdown
									store={donationStatusDropdownStore}
									placeholder="GRANT.LIST.FILTER.WITHDRAW_STATUS_PLACEHOLDER"
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
					<div className="col col-sml-12 col-xxlrg-3 type--right">
						<BaasicButton
							className="btn btn--med btn--primary"
							label={'LIST_LAYOUT.CREATE_BUTTON'}
							onClick={routes.create}
						/>
					</div>

				</div>
				<BaasicTable authorization={authorization} tableStore={tableStore} />
			</div>

			<BaasicModal modalParams={selectCharityModal}>
				<SelectCharity />
			</BaasicModal>

			<BaasicModal modalParams={declineModal}>
                <GrantDeclineTemplate />
            </BaasicModal>
		</Content>
    </ApplicationListLayout>

	);
};

WithdrawFundListTemplate.propTypes = {
	withdrawFundViewStore: PropTypes.object.isRequired,
	onDeclineClick: PropTypes.func,
    declineModal: PropTypes.any,
	t: PropTypes.func,
};

export default defaultTemplate(WithdrawFundListTemplate);
