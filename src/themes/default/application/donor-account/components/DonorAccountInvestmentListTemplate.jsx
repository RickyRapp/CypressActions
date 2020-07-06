import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    EmptyState,
    FormatterResolver
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';

const DonorAccountInvestmentListTemplate = function ({ donorAccountInvestmentListViewStore }) {
    const {
        investments,
        investmentPoolsOverview
    } = donorAccountInvestmentListViewStore

    function renderFormatedValue(value, type) {
        return <FormatterResolver
            item={{ value: value }}
            field='value'
            format={{ type: type }}
        />
    }

    return (
        <div className="row">
            {investmentPoolsOverview && investments &&
                investmentPoolsOverview.map(lastPoolHistory => {
                    const donorInvestment = investments.find((item) => item.investmentPoolId === lastPoolHistory.investmentPoolId)

                    return <div
                        key={lastPoolHistory.id}
                        className="col col-lrg-3 card--form card--primary card--med u-mar--left--sml u-mar--bottom--sml"
                        style={{ backgroundColor: donorInvestment.balance === 0 ? "lightslategrey" : "lightgreen" }}>
                        <div><strong>{lastPoolHistory.investmentPool.name}</strong>({renderFormatedValue(lastPoolHistory.change, 'percentage')})</div>
                        <div>{renderFormatedValue(donorInvestment.balance, 'currency')}</div>
                    </div>
                })
            }
        </div>
    )
};


DonorAccountInvestmentListTemplate.propTypes = {
    donorAccountInvestmentListViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorAccountInvestmentListTemplate);

