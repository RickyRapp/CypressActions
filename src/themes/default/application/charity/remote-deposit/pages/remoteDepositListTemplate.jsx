import React from "react";
import PropTypes from "prop-types";
import { defaultTemplate } from "core/hoc";
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    EmptyState,
    SimpleBaasicTable,
    FormatterResolver
} from "core/components";
import { isSome } from "core/utils";
import { ApplicationListLayout, Content } from "core/layouts";

const RemoteDepositListTemplate = function({ remoteDepositListViewStore }) {
    const { tableStore, routes, queryUtility, authorization, checksOnHoldTableStore, onExpandChecksOnHoldClick, isChecksOnHoldVisible } = remoteDepositListViewStore;
    return (
        <ApplicationListLayout
            store={remoteDepositListViewStore}
            authorization={authorization}
        >
            <Content emptyRenderer={renderEmpty(routes)}>
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
                <div className="u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility}></TableFilter>
                </div>
                <div className="card--form card--primary card--med">
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                    />
                </div>
            </Content>
        </ApplicationListLayout>
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

RemoteDepositListTemplate.propTypes = {
    remotedepositListViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(RemoteDepositListTemplate);