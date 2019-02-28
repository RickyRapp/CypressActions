import React from 'react';
import { DonorAccountProfileEdit, DonorAccountSettingEdit } from 'modules/donor-account/pages'
import { Page } from 'core/layouts';
import { DonorAccountAddressEdit } from 'modules/address/pages';

class DonorAccountEdit extends React.Component {
    render() {
        return (
            <Page>
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-6">
                        <DonorAccountProfileEdit {...this.props} />
                    </div>
                    <div className="form__group f-col f-col-lrg-6">
                        <DonorAccountAddressEdit />
                    </div>
                </div>
            </Page>
        )
    }
}

export default DonorAccountEdit;