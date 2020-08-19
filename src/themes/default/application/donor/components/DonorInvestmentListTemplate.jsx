import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    FormatterResolver,
    BaasicModal,
    BaasicButton
} from 'core/components';
import { DonorInvestmentEditForm, DonorInvestmentPoolHistory } from 'application/donor/components';

const DonorInvestmentListTemplate = function ({ donorInvestmentListViewStore }) {
    const {
        investments,
        investmentPoolsOverview,
        investmentModal,
        openInvestmentModal,
        openHistory,
        donorInvestmentIdForHistory
    } = donorInvestmentListViewStore

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
                            const donorInvestment = investments.find((item) => item.investmentPoolId === lastPoolHistory.investmentPoolId)

                            return <div
                                key={lastPoolHistory.investmentPoolId}
                                className="col col-lrg-3 card--form card--primary card--med u-mar--left--sml u-mar--bottom--sml"
                                style={{ backgroundColor: donorInvestment.balance === 0 ? "#607d8b26" : "#90ee909e" }}>
                                <strong>{lastPoolHistory.investmentPool.name}</strong>
                                <div>
                                    {renderFormatedValue(donorInvestment.balance, 'currency')}
                                    <BaasicButton
                                        className="btn btn--icon"
                                        icon='u-icon u-icon--reset-pass u-icon--sml'
                                        label='DONOR_INVESTMENT.LIST.BUTTON.INVEST'
                                        onlyIcon={true}
                                        onClick={() => openInvestmentModal(donorInvestment, lastPoolHistory.investmentPool)}>
                                    </BaasicButton>
                                    <BaasicButton
                                        className="btn btn--icon"
                                        icon='u-icon u-icon--preview u-icon--sml'
                                        label='DONOR_INVESTMENT.LIST.BUTTON.HISTORY'
                                        onlyIcon={true}
                                        onClick={() => openHistory(donorInvestment)}>
                                    </BaasicButton>
                                </div>
                            </div>
                        })
                    }
                </div>

                {donorInvestmentIdForHistory &&
                    <DonorInvestmentPoolHistory key={donorInvestmentIdForHistory} id={donorInvestmentIdForHistory} />
                }
            </div>

            <BaasicModal modalParams={investmentModal}>
                <DonorInvestmentEditForm />
            </BaasicModal>
        </React.Fragment >
    )
};

DonorInvestmentListTemplate.propTypes = {
    donorInvestmentListViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorInvestmentListTemplate);

