import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const GrantDetailTemplate = function ({ item, t }) {
    const grant = item.grants[0];

    return (
        <div className="row">
            <div className="col col-sml-5 col-lrg-5">
                <label className="form__group__label">{t('DONOR')}</label>
                <span className={"input input--med input--text input--disabled"}>
                    {grant.donorAccount.donorName}
                </span>
            </div>
            <div className="col col-sml-5 col-lrg-5">
                <label className="form__group__label">{t('AMOUNT')}</label>
                <span className={"input input--med input--text input--disabled"}>
                    {grant.amount}
                </span>
            </div>
        </div>
    )
};

GrantDetailTemplate.propTypes = {
    item: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(GrantDetailTemplate);
