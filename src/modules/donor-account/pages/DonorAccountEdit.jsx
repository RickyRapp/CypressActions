import React from 'react';
import { DonorAccountProfileEdit } from 'modules/donor-account/pages'
import { Page } from 'core/layouts';
import { DonorAccountAddressEdit } from 'modules/address/pages';
import { DonorAccountEmailAddressEdit } from 'modules/email-address/pages';
import { DonorAccountPhoneNumberEdit } from 'modules/phone-number/pages';

class DonorAccountEdit extends React.Component {
    render() {
        return (
            <Page>
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-6">
                        <DonorAccountProfileEdit {...this.props} />
                    </div>
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="f-row">
                            <div className="form__group f-col f-col-lrg-12">
                                <DonorAccountAddressEdit />
                            </div>
                            <div className="form__group f-col f-col-lrg-12">
                                <DonorAccountEmailAddressEdit />
                            </div>
                            <div className="form__group f-col f-col-lrg-12">
                                <DonorAccountPhoneNumberEdit />
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}

export default DonorAccountEdit;