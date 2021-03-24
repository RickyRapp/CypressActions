import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const ContributionCreateStep1Template = function ({ paymentTypes, step, onSelectPaymentType, paymentTypeId }) {

    return (
        <React.Fragment>
            <div className="table--payment__header">

                <div className="table--payment">
                    <div className="table--payment__cell is-header is-first">
                        <div className="table--payment__inner">
                            <div className="card--sml type--sml type--wgt--medium type--color--note type--center">Overview</div>
                        </div>
                    </div>

                    <div className="table--payment__cell is-header is-timeline">
                        <div className="table--payment__inner">
                            <div className="card--sml type--sml type--wgt--medium type--color--opaque type--center">Timeline</div>
                        </div>
                    </div>
                    <div className="table--payment__cell is-header is-deductible">
                        <div className="table--payment__inner">
                            <div className="card--sml type--sml type--wgt--medium type--color--opaque type--center">
                                AGI Deductible eligibility
                            </div>
                        </div>
                    </div>
                    <div className="table--payment__cell is-header is-minimum">
                        <div className="table--payment__inner">
                            <div className="card--sml type--sml type--wgt--medium type--color--opaque type--center">
                                Minimum Deposit
                            </div>
                        </div>
                    </div>
                    <div className="table--payment__cell is-header is-last">
                        <div className="table--payment__inner">
                            <div className="card--sml type--sml type--wgt--medium type--color--opaque type--center">More</div>
                        </div>
                    </div>
                </div>
            </div>

            {paymentTypes &&
                paymentTypes.map(c => {
                    const json = JSON.parse(c.json);
                    return (
                        <div key={c.id} className="table--payment">
                            <div className="table--payment__cell is-first">
                                <div
                                    className="card--contribution card--contribution--primary"
                                    onClick={() => onSelectPaymentType(c.id)}
                                >
                                    <div className="card--contribution__inner">
                                        <i
                                            className={`u-icon u-icon--med u-mar--right--med u-icon--${c.abrv} ${c.id === paymentTypeId && 'checked'}`}
                                        ></i>
                                        <h5 className="type--base type--color--text type--wgt--medium">{c.name}</h5>
                                        <i className="u-icon u-icon--sml u-icon--arrow-right--secondary u-mar--left--auto"></i>
                                    </div>
                                </div>
                            </div>
                            {step === 1 && (
                                <React.Fragment>

                                    <div className="table--payment__cell is-timeline">
                                        <div className="table--payment__inner">
                                            <p className="type--small type--color--opaque type--wgt--regular">{json && json.timeline}</p>
                                        </div>
                                    </div>
                                    <div className="table--payment__cell is-deductible">
                                        <div className="table--payment__inner">
                                            <p className="type--small type--color--opaque type--wgt--regular">
                                                {json && json.deductibleEligibility}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="table--payment__cell is-minimum">
                                        <div className="table--payment__inner">
                                            <p className="type--small type--color--opaque type--wgt--regular">${json && json.minimumDeposit}</p>
                                        </div>
                                    </div>
                                    <div className="table--payment__cell is-last">
                                        <div className="table--payment__inner">
                                            <p className="type--small type--color--opaque type--wgt--regular type--center">{json && json.more}</p>
                                        </div>

                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                    );
                })}
        </React.Fragment>
    )
}

ContributionCreateStep1Template.propTypes = {
    paymentTypes: PropTypes.any.isRequired,
    step: PropTypes.number.isRequired,
    onSelectPaymentType: PropTypes.func.isRequired,
    paymentTypeId: PropTypes.string.isRequired,
    t: PropTypes.func,
};

export default defaultTemplate(ContributionCreateStep1Template);
