import React from 'react';
import { defaultTemplate } from 'core/hoc';
import CharityPaymentOptions from './CharityPaymentOptions';


function CharitySecurityAndPreferencesData() {
    return (
        <div className="u-mar--bottom--med">
            <div className="row">
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <div className="card--primary card--med">
                        <CharityPaymentOptions />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default defaultTemplate(CharitySecurityAndPreferencesData);