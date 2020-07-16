import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    FormatterResolver,
    BaasicModal,
    BaasicButton
} from 'core/components';
import { DonorAccountInvestmentEditForm, DonorAccountInvestmentPoolHistory } from 'application/donor-account/components';

const DonorAccountInvestmentListTemplate = function ({ donorAccountInvestmentListViewStore }) {
    const {
        investments,
        investmentPoolsOverview,
        investmentModal,
        openInvestmentModal,
        openHistory,
        donorAccountInvestmentIdForHistory
    } = donorAccountInvestmentListViewStore

    function renderFormatedValue(value, type) {
        return <FormatterResolver
            item={{ value: value }}
            field='value'
            format={{ type: type }}
        />
    }

    return (
        <React.Fragment>
            <div className="card--form card--primary card--med">
                <div className="row">
                    {investmentPoolsOverview && investments &&
                        investmentPoolsOverview.map(lastPoolHistory => {
                            const donorAccountInvestment = investments.find((item) => item.investmentPoolId === lastPoolHistory.investmentPoolId)

                            return <div
                                key={lastPoolHistory.id}
                                className="col col-lrg-3 card--form card--primary card--med u-mar--left--sml u-mar--bottom--sml"
                                style={{ backgroundColor: donorAccountInvestment.balance === 0 ? "#607d8b26" : "#90ee909e" }}>
                                <div><strong>{lastPoolHistory.investmentPool.name}</strong>({renderFormatedValue(lastPoolHistory.change, 'percentage')})</div>
                                <div>
                                    {renderFormatedValue(donorAccountInvestment.balance, 'currency')}
                                    <BaasicButton
                                        className="btn btn--icon"
                                        icon='u-icon u-icon--reset-pass u-icon--sml'
                                        label='DONOR_ACCOUNT_INVESTMENT.LIST.BUTTON.INVEST'
                                        onlyIcon={true}
                                        onClick={() => openInvestmentModal(donorAccountInvestment, lastPoolHistory.investmentPool)}>
                                    </BaasicButton>
                                    <BaasicButton
                                        className="btn btn--icon"
                                        icon='u-icon u-icon--preview u-icon--sml'
                                        label='DONOR_ACCOUNT_INVESTMENT.LIST.BUTTON.HISTORY'
                                        onlyIcon={true}
                                        onClick={() => openHistory(donorAccountInvestment)}>
                                    </BaasicButton>
                                </div>
                            </div>
                        })
                    }
                </div>

                {donorAccountInvestmentIdForHistory &&
                    <DonorAccountInvestmentPoolHistory key={donorAccountInvestmentIdForHistory} id={donorAccountInvestmentIdForHistory} />
                }
            </div>

            <BaasicModal modalParams={investmentModal}>
                <DonorAccountInvestmentEditForm />
            </BaasicModal>
        </React.Fragment >
    )
};

DonorAccountInvestmentListTemplate.propTypes = {
    donorAccountInvestmentListViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorAccountInvestmentListTemplate);

