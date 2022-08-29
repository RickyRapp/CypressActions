import React from 'react';
import { defaultTemplate } from 'core/hoc';
import {
    CharityPaymentOptions,
    CharityChangeUsername,
    CharityResetPassword
} from 'application/charity/charity/components';


function CharitySecurityAndPreferencesData() {
    return (
        <div className="u-mar--bottom--med">
            <div className="u-mar--bottom--med">
                <div className="card--primary card--med">
                    <CharityPaymentOptions />
                </div>
            </div>
            <div className="u-mar--bottom--med">
                <div className="card--primary card--med">
                    <CharityChangeUsername />
                </div>
            </div>
            <div className="u-mar--bottom--med">
                <div className="card--primary card--med">
                    <CharityResetPassword />
                </div>
            </div>
        </div>
    )
}

export default defaultTemplate(CharitySecurityAndPreferencesData);