import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicTable,
	TableFilter,
	BaasicDropdown,
	BaasicButton,
	SimpleBaasicTable,
	FormatterResolver,
	DateRangeQueryPicker,
	BaasicTableWithRowDetails,
} from 'core/components';

const AllTransactionListTemplate = function({ allTransactionViewStore, removeCardClassName, hideSearch, t }) {
	const {
		tableStore,
		queryUtility,
		authorization,
		checksOnHoldTableStore,
		isChecksOnHoldVisible,
		onExpandChecksOnHoldClick,
		dateCreatedDateRangeQueryStore,
		transactionTypeStore,
		transactionPeriod,
		accountBalance,
	} = allTransactionViewStore;


	const DetailComponent = ({ dataItem }) => { 
        {
            return (
                <table>
                    <thead>
                        <tr>
							<th>{'Donor'}</th>
							<th>{'Date Created'}</th>
							<th>{'Amount'}</th>
                            <th>{'Description'}</th>
                            <th>{'Type'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataItem 
                            && dataItem.grants
                            && dataItem.grants.data.map((item) => { 
                            return (
                                <tr key={item.id}>
									<td>{item.donor}</td>
									<td>
										<FormatterResolver
											item={{ dateCreated: item.dateCreated }}
											field='dateCreated'
											format={{ type: 'date', value: 'short' }}
										/>
									</td>
									<td>
										<FormatterResolver
											item={{amount: item.amount}}
											field='amount'
											format={{type: 'currency'}}
										/>
									</td>
                                    <td>{item.description}</td>
									<td>{item.type}</td>                                    
                                </tr>
                            );
                        })}
                    </tbody>
                </table>)
        }
    }

    DetailComponent.propTypes = {
        dataItem: PropTypes.object.isRequired
    };


	return (
		<React.Fragment>
			{!hideSearch && (
				<div>
					<div className="card--tertiary u-mar--bottom--sml">
						<div className="col col-sml-12 u-mar--bottom--sml">
							<div className="row row--form">
								<div className="col col-sml-4">
									<div className="transaction__card">
										<div className={`transaction__card--amount transaction__card--amount--plus`}>
											<FormatterResolver
												item={{ balance: accountBalance }}
												field="balance"
												format={{ type: 'currency' }}
											/>
										</div>
										<h5 className="transaction__card--title">{t('DASHBOARD.ACCOUNT_BALANCE')}</h5>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-sml-12 u-mar--bottom--sml">
						<div className="transaction__show">
							<div className="transaction__show--body">
								<span className="type--base type--wgt--medium type--color--text">
									Checks on Hold:{' '}
									{checksOnHoldTableStore.data.length > 0 && (
										<FormatterResolver
											item={{
												balance: checksOnHoldTableStore.data
													.map(c =>
														c.certificate.openCertificateAmount
															? c.certificate.openCertificateAmount
															: c.certificate.denominationType.value
													)
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
									icon={`u-icon ${
										isChecksOnHoldVisible ? 'u-icon--close' : 'u-icon--arrow-down--primary'
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

					<div className="card--tertiary card--med u-mar--bottom--sml">
						<div className="row row--form u-mar--bottom--base">
							<div className="col col-sml-12 col-lrg-8 col-xxlrg-9">
								<div>
									<TableFilter queryUtility={queryUtility}>
										<div className="col col-sml-12 col-xxlrg-6 u-mar--bottom--sml">
											<DateRangeQueryPicker queryUtility={queryUtility} store={dateCreatedDateRangeQueryStore} />
										</div>
										<div className="col col-sml-12 col-xxlrg-6">
											<BaasicDropdown store={transactionTypeStore} className="input--dropdown--secondary" />
										</div>
									</TableFilter>
								</div>
							</div>
							<div className="col col-sml-12 col-lrg-4 col-xxlrg-3">
								<BaasicDropdown
									store={transactionPeriod}
									queryUtility={queryUtility}
									placeholder="Recent transactions"
									className="input--dropdown--secondary"
								/>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className={`${!removeCardClassName ? 'card--primary card--med' : ''}`}>
				<BaasicTableWithRowDetails 
					authorization={authorization} 
					tableStore={tableStore} 
					detailComponent={DetailComponent}
                    loading={tableStore.loading}
					/>
			</div>
		</React.Fragment>
	);
};

AllTransactionListTemplate.propTypes = {
	allTransactionViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
	hideSearch: PropTypes.bool,
	hideCheckBox: PropTypes.bool,
	removeCardClassName: PropTypes.bool,
};

export default defaultTemplate(AllTransactionListTemplate);
