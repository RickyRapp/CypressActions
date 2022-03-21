import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { Content } from 'core/layouts';
import {
	BaasicButton,
	BaasicTable,
	TableFilter,
	BaasicDropdown,
	BaasicInput,
	NumberFormatInput,
	DateRangeQueryPicker,
    EmptyState

} from 'core/components';
import { isSome } from 'core/utils';
import AsyncSelect from 'react-select/async';

const SessionPendingCertificateListTemplate = function ({ sessionPendingCertificateViewStore }) {
    const {
        tableStore,
        routes,
        authorization,
        queryUtility,
        paymentTypeDropdownStore,
		donationStatusDropdownStore,
		dateCreatedDateRangeQueryStore,
		searchDonorDropdownStore,
        searchCharityDropdownStore
    } = sessionPendingCertificateViewStore;
    return (
        <React.Fragment>
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="card--primary card--med">
                <TableFilter colClassName={"col col-sml-12 col-lrg-8"} queryUtility={queryUtility}>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicDropdown store={searchCharityDropdownStore} />
								{/* <AsyncSelect onChange={e => setCharityId(e.value)} cacheOptions defaultOptions={true} loadOptions={promiseOptions} classNamePrefix="react-select" /> */}
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicInput
									id="confirmationNumber"
									className="input input--lrg"
									value={queryUtility.filter.confirmationNumber || ''}
									onChange={event => (queryUtility.filter.confirmationNumber = event.target.value)}
									placeholder="SESSION.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<NumberFormatInput
									className="input input--lrg"
									value={queryUtility.filter.bookletCertificateCode}
									onChange={event => (queryUtility.filter.bookletCertificateCode = event.formattedValue)}
									format="#####-##"
									mask=""
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                                <BaasicInput
                                    id="dollarRange"
                                    value={queryUtility.filter.dollarRange || ''}
                                    onChange={event => (queryUtility.filter.dollarRange = event.target.value)}
                                    placeholder="SESSION.LIST.FILTER.DOLLAR_RANGE_PLACEHOLDER"
                                />
                            </div>
                            {/* <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                                <BaasicInput
                                    id="usernameCreatedSession"
                                    value={queryUtility.filter.usernameCreatedSession || ''}
                                    onChange={event => (queryUtility.filter.usernameCreatedSession = event.target.value)}
                                    placeholder="SESSION.LIST.FILTER.USERNAME_CREATED_SESSION_PLACEHOLDER"
                                />
                            </div> */}
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicDropdown store={searchDonorDropdownStore} />
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
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                    />
                </div>
            </Content>
        </React.Fragment>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='SESSION.LIST.EMPTY_STATE.TITLE' actionLabel='SESSION.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

SessionPendingCertificateListTemplate.propTypes = {
    sessionPendingCertificateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(SessionPendingCertificateListTemplate);
