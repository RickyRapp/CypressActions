import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    TableFilter,
    BaasicDropdown,
    BaasicButton,
    SimpleBaasicTable,
    FormatterResolver
} from 'core/components';
import { Content } from 'core/layouts';

const AllTransactionListTemplate = function ({ allTransactionViewStore, hideSearch }) {
    const {
        tableStore,
        queryUtility,
        authorization,
        donationTypeDropdownStore,
        donationStatusDropdownStore,
        checksOnHoldTableStore,
        isChecksOnHoldVisible,
        onExpandChecksOnHoldClick,
    } = allTransactionViewStore;

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


            { !hideSearch && (
                <div className="card--tertiary card--med u-mar--bottom--sml">
                <TableFilter queryUtility={queryUtility}>
                    <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                        <BaasicDropdown store={donationTypeDropdownStore} />
                    </div>
                    <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                        <BaasicDropdown store={donationStatusDropdownStore} />
                    </div>
                </TableFilter>
            </div>
            )}
            
            <div className="row">
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <div className="card--primary card--med">
                        <BaasicTable
                            authorization={authorization}
                            tableStore={tableStore}
                        />
                    </div>
                </div>
            </div>
        </Content>
    )
};

AllTransactionListTemplate.propTypes = {
    allTransactionViewStore: PropTypes.object.isRequired,
    t: PropTypes.func,
    hideSearch: PropTypes.bool,
    hideCheckBox: PropTypes.bool
};

export default defaultTemplate(AllTransactionListTemplate);

