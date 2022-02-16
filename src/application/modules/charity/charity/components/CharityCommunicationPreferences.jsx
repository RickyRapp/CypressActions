import React from 'react';
import { defaultTemplate } from 'core/hoc';
import {
    CharityCardPreferences,
    CharityChecksPreferences,
    CharityWebsiteDonationsPreferences,
    CharityGeneralNotifications,
    CharityInvestmentNotifications
} from 'application/charity/charity/components';


function CharityCommunicationPreferences() {
    return (
        <div className="u-mar--bottom--med">
            <div className="row">
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <div className="card--primary card--med">
                        <CharityCardPreferences />
                    </div>
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <div className="card--primary card--med">
                        <CharityChecksPreferences />
                    </div>
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <div className="card--primary card--med">
                        <CharityWebsiteDonationsPreferences />
                    </div>
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <div className="card--primary card--med">
                        <CharityGeneralNotifications />
                    </div>
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <div className="card--primary card--med">
                        <CharityInvestmentNotifications />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default defaultTemplate(CharityCommunicationPreferences);