import React from 'react';
import { Page } from 'core/layouts';
import { BaasicButton } from 'core/components';

function DashboardTemplate() {
    return (
        <Page >
            <div className="row">
                <div className="col col-sml-12 col-lrg-6">
                    <div className="card card--form card--primary card--med u-mar--bottom--med u-mar--right--sml u-mar--top--med">
                        <h3>Your Funds</h3>
                    </div>
                </div>
                <div className="col col-sml-12 col-lrg-6 card card--form">
                    <div className="card card--form card--primary card--med u-mar--bottom--med u-mar--left--sml u-mar--top--med">
                        <h3>Your Giving</h3>
                    </div>
                </div>
                <div className="col col-sml-12 col-lrg-12">
                    <div className="card card--form card--primary card--med u-mar--bottom--med u-mar--top--med">
                        <h3 className="u-mar--bottom--med">Finish setting up your account</h3>
                        <div className="row">
                            <div className="col col-sml-12 col-lrg-3">
                                <BaasicButton
                                    className="btn btn--base btn--primary"
                                    icon='u-icon u-icon--arrow-right u-icon--sml'
                                    label='View investment options'
                                />
                            </div>
                            <div className="col col-sml-12 col-lrg-3">
                                <BaasicButton
                                    className="btn btn--base btn--primary"
                                    icon='u-icon u-icon--arrow-right u-icon--sml'
                                    label='Order certificates'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-sml-12 col-lrg-12">
                    <div className="card card--form card--primary card--med u-mar--bottom--med u-mar--top--med">
                        <h3 className="u-mar--bottom--med">Recent Activity</h3>
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default DashboardTemplate;
