import React from 'react';
import { DonorAccountProfileEdit, DonorAccountSettingEdit } from 'modules/donor-account/pages'
import { Page } from 'core/layouts';

class DonorAccountEdit extends React.Component {
    render() {
        return (
            <Page>
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-6">
                        <DonorAccountProfileEdit {...this.props} />
                    </div>
                    <div className="form__group f-col f-col-lrg-6">
                        <DonorAccountSettingEdit {...this.props} />
                    </div>
                </div>
            </Page>
        )
    }
}

export default DonorAccountEdit;