import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const ContributionCreateStep1Template = function ({ paymentTypes, step, onSelectPaymentType, paymentTypeId, t }) {

    return (
        <React.Fragment>
            <div className="row u-display--none--xlrg">
                <div className="col col-sml-3">
                    <div className="card--sml type--med type--wgt--medium type--color--note type--center">Overview</div>
                </div>
                <div className="col col-sml-2">
                    <div className="card--sml type--med type--wgt--medium type--color--opaque type--center">Timeline</div>
                </div>
                <div className="col col-sml-2">
                    <div className="card--sml type--med type--wgt--medium type--color--opaque type--center">
                        Deductible eligibility
							</div>
                </div>
                <div className="col col-sml-2">
                    <div className="card--sml type--med type--wgt--medium type--color--opaque type--center">
                        Minimum Deposit
							</div>
                </div>
                <div className="col col-sml-3">
                    <div className="card--sml type--med type--wgt--medium type--color--opaque type--center">More</div>
                </div>
            </div>

            {paymentTypes &&
                paymentTypes.map(c => {
                    const json = JSON.parse(c.json);
                    return (
                        <div key={c.id} className="row">
                            <div className="col col-sml-12 col-xxlrg-3">
                                <div
                                    className="card--contribution card--contribution--primary"
                                    onClick={() => onSelectPaymentType(c.id)}
                                >
                                    <div className="col col-sml-4 col-lrg-2">
                                        <i
                                            className={`u-icon u-icon--med u-icon--${c.abrv} ${c.id === paymentTypeId && 'checked'}`}
                                        ></i>
                                    </div>
                                    <div className="col col-sml-8 col-lrg-10">
                                        <h5 className="type--base type--color--text type--wgt--medium">{c.name}</h5>
                                    </div>
                                </div>
                            </div>
                            {step === 1 && (
                                <React.Fragment>
                                    <div className="col col-sml-12 col-lrg-6 col-xxlrg-2">
                                        <div className="card--contribution">
                                            <p className="type--base type--color--text type--wgt--regular">{json.timeline}</p>
                                        </div>
                                    </div>
                                    <div className="col col-sml-12 col-lrg-6 col-xxlrg-2">
                                        <div className="card--contribution">
                                            <p className="type--base type--color--text type--wgt--regular">
                                                {json.deductibleEligibility}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col col-sml-12 col-lrg-6 col-xxlrg-2">
                                        <div className="card--contribution">
                                            <p className="type--base type--color--text type--wgt--regular">{json.minimumDeposit}</p>
                                        </div>
                                    </div>
                                    <div className="col col-sml-12 col-lrg-6 col-xxlrg-3">
                                        <div className="card--contribution">
                                            <p className="type--base type--color--text type--wgt--regular type--center">{json.more}</p>
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
