import React from "react";
import PropTypes from "prop-types";
import { defaultTemplate } from "core/hoc";
import {
    BaasicButton,
    BaasicTable,
    BaasicInput,
    BaasicDropdown,
    NumberFormatInput,
    DateRangeQueryPicker,
    TableFilter,
    EmptyState,
    SimpleBaasicTable,
    FormatterResolver
} from "core/components";
import { isSome } from "core/utils";
import { ApplicationListLayout, Content, PageHeader } from "core/layouts";

const RemoteDepositListTemplate = function({ remoteDepositsViewStore }) {
    const { tableStore, routes, queryUtility, authorization, checksOnHoldTableStore, onExpandChecksOnHoldClick, isChecksOnHoldVisible,
        searchDonorDropdownStore, donationStatusDropdownStore, dateCreatedDateRangeQueryStore } = remoteDepositsViewStore;
    return (
            <Content>
            <div className="col-sml-12 u-mar--bottom--sml">
					<div className="transaction__show">
						<div className="transaction__show--body">
							<span className="type--base type--wgt--medium type--color--text">
								Checks on Hold:{' '}
								{checksOnHoldTableStore.data.length > 0 && (
									<FormatterResolver
										item={{
											balance: checksOnHoldTableStore.data
												.map(c => c.certificate.openCertificateAmount ? c.certificate.openCertificateAmount : c.certificate.denominationType.value)
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
								icon={`u-icon ${isChecksOnHoldVisible ? 'u-icon--close' : 'u-icon--arrow-down--primary'
									} u-icon--base`}
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
                {/* <div className="u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility}></TableFilter>
                </div> */}
                <div className="u-mar--bottom--med">
						<TableFilter colClassName={"col col-sml-12 col-lrg-12"} queryUtility={queryUtility}>
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
								<BaasicDropdown store={searchDonorDropdownStore} />
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicDropdown
									store={donationStatusDropdownStore}
									placeholder="SESSION.LIST.FILTER.SESSION_STATUS_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<NumberFormatInput
									className="input input--lrg"
									value={queryUtility.filter.bookletCertificateCode}
									onChange={event => (queryUtility.filter.bookletCertificateCode = event.formattedValue)}
									format="#####-##"
                                    placeholder="Check Number"
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
                            <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                                <BaasicInput
                                    id="fundraiserName"
                                    value={queryUtility.filter.fundraiserName || ''}
                                    onChange={event => (queryUtility.filter.fundraiserName = event.target.value)}
                                    placeholder="SESSION.LIST.FILTER.FUNDRAISER_NAME_PLACEHOLDER"
                                />
                            </div>
                            <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                                <NumberFormatInput
                                    id="phoneNumber"
                                    value={queryUtility.filter.phoneNumber}
                                    onChange={event => (queryUtility.filter.phoneNumber = event.formattedValue)}
                                    placeholder="SESSION.LIST.FILTER.PHONE_NUMBER_PLACEHOLDER"
                                    format="(###)(###)-(####)"
                                />
                            </div>
							<div className="col col-sml-12 col-med-6 col-lrg-8 u-mar--bottom--sml">
                                <div className="col col-sml-12">
                                    <DateRangeQueryPicker
                                        queryUtility={queryUtility}
                                        store={dateCreatedDateRangeQueryStore}
                                        fromPropertyName="dateCreatedFrom"
                                        toPropertyName="dateCreatedTo"
                                    />
								</div>
							</div>
						</TableFilter>
					</div>
                <div className="card--primary card--med">
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
						actionsComponent={renderActions}
                    />
                </div>
            </Content>
    );
};

function renderEmpty(routes) {
    return (
        <EmptyState
            title="REMOTEDEPOSIT.LIST.EMPTY_STATE.TITLE"
            actionLabel="REMOTEDEPOSIT.LIST.EMPTY_STATE.ACTION"
            callToAction={routes.create}
        />
    );
}

function renderActions({ item, actions, authorization }) {
    if (!isSome(actions)) return null;

    const {
        onEdit,
        onPreview
    } = actions;
    if (
        !isSome(onEdit) &&
        !isSome(onPreview) 
    )
        return null;

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onPreview) ? (
                    <BaasicButton
                        authorization={
                            authorization ? authorization.read : null
                        }
                        className="btn btn--icon"
                        icon="u-icon u-icon--preview u-icon--med"
                        label="Preview"
                        onlyIcon={true}
                        onClick={() => onPreview(item)}
                    ></BaasicButton>
                ) : null}
                {isSome(onEdit) ? (
                    <BaasicButton
                        authorization={
                            authorization ? authorization.update : null
                        }
                        className="btn btn--icon"
                        icon="u-icon u-icon--edit u-icon--sml"
                        label="REMOTEDEPOSIT.LIST.BUTTON.EDIT"
                        onlyIcon={true}
                        onClick={() => onEdit(item)}
                    ></BaasicButton>
                ) : null}
            </div>
        </td>
    );
}

renderActions.propTypes = {
    item: PropTypes.object,
    actions: PropTypes.object,
    authorization: PropTypes.any
};

RemoteDepositListTemplate.propTypes = {
    remoteDepositsViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(RemoteDepositListTemplate);