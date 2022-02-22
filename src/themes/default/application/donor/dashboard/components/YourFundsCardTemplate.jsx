import React from 'react';
import { BaasicButton, FormatterResolver } from 'core/components';
import PropTypes from 'prop-types';

const YourFundsCardTemplate = (props) => {
    const { donor, newContributionOnClick, t } = props;
    return (
        <div className="dashboard-card">
            <h3 className="dashboard-card__title u-mar--bottom--sml">
                {t('DASHBOARD.YOUR_FUNDS')}
            </h3>
            <div className="dashboard-card__body">
                {donor && (
                    <p className="dashboard-card__body--amount">
                        <FormatterResolver
                            item={{ balance: donor.presentBalance }}
                            field="balance"
                            format={{ type: 'currency' }}
                        />
                    </p>
                )}

                <p className="dashboard-card__body--title">
                    {t('DASHBOARD.AVAILABLE_BALANCE')}
                </p>
                <div className="dashboard-card__body--amount--secondary">
                    {donor && (
                        <FormatterResolver
                            item={{ balance: donor.availableBalance }}
                            field="balance"
                            format={{ type: 'currency' }}
                        />
                    )}
                </div>
                <p className="dashboard-card__body--title">
                    {t('DASHBOARD.PRESENT_BALANCE')}
                </p>
            </div>

            <div className="row">
                <div className="col col-sml-12 col-med-6">
                    <div className="u-mar--bottom--sml w--100--to-med">
                        <BaasicButton
                            className="btn btn--med btn--100 btn--primary--light"
                            label="DASHBOARD.BUTTON.CONTRIBUTE"
                            onClick={newContributionOnClick}
                        />
                    </div>
                </div>
                <div className="col col-sml-12 col-med-6">
                    <div className="u-mar--bottom--sml w--100--to-med u-position--rel">
                        <BaasicButton
                            className="btn btn--med btn--100 btn--primary--light u-display--flex--column"
                            label="DASHBOARD.BUTTON.INVEST_FUNDS"
                            disabled={true}
                            message={"Coming Soon"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

YourFundsCardTemplate.propTypes = {
    donor: PropTypes.object,
    newContributionOnClick: PropTypes.func,
    t: PropTypes.func,
};

export default YourFundsCardTemplate;

