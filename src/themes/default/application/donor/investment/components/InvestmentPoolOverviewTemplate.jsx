import React from 'react';
import { BasicCheckbox } from 'core/components';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const InvestmentPoolOverviewTemplate = function ({ pool, t }) {

    return (
        <div key={pool.id} className="row u-mar--bottom--sml u-display--flex--align--center">
            <div className="col col-sml-8">
                <div className="card--primary card--med u-mar--bottom--med">
                    <div className="row u-mar--bottom--sml">
                        <div className="col col-sml-12">
                            <h4>
                                <BasicCheckbox
                                    id={`chk_${pool.id}`}
                                    checked={pool.checked}
                                    label={pool.name}
                                    onChange={event => pool.checked = event.target.checked} /></h4>
                        </div>
                        <div className="col col-sml-12">
                            <small>{'Short description of when this pool is a good idea'}</small>
                        </div>
                        <div className="col col-sml-12">
                            <div><span className="counter--prepaid">LONG TERM GROWTH</span> | Expense ration 0.35%</div>
                            <div className="row u-mar--bottom--sml u-display--flex--align--center">
                                <div className="col col-sml-4">Target allocation:</div>
                                <div className="col col-sml-4">Risk:</div>
                                <div className="col col-sml-4">Performance:</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

InvestmentPoolOverviewTemplate.propTypes = {
    pool: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(InvestmentPoolOverviewTemplate);
