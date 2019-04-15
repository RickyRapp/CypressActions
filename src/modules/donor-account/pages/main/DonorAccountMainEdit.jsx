import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { DonorAccountProfileMainEdit, DonorAccountSettingMainPreview } from 'modules/donor-account/pages'
import { Page } from 'core/layouts';
import { DonorAccountAddressEdit } from 'modules/address/pages';
import { DonorAccountEmailAddressEdit } from 'modules/email-address/pages';
import { DonorAccountPhoneNumberEdit } from 'modules/phone-number/pages';
import { DonorAccountBankAccountEdit } from 'modules/bank-account/pages'

@observer
class DonorAccountMainEdit extends React.Component {
    @observable showBankAccounts = false;
    @observable showAddresses = false;
    @observable showEmailAddresses = false;
    @observable showPhoneNumbers = false;

    render() {
        return (
            <Page>
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="f-row">
                            <div className="form__group f-col f-col-lrg-12">
                                <DonorAccountProfileMainEdit />
                            </div>
                            <div className="form__group f-col f-col-lrg-12">
                                <DonorAccountSettingMainPreview />
                            </div>
                        </div>
                    </div>

                    <div className="form__group f-col f-col-lrg-6">
                        <div className="f-row">
                            <div className="form__group f-col f-col-lrg-12">
                                <div className="group">
                                    <div className="display--b pull">{this.showBankAccounts ? 'Hide' : 'Show'} Bank Informations</div>
                                    <div className="display--b pull spc--left--sml">
                                        <input
                                            type="checkbox"
                                            onChange={(event) => this.showBankAccounts = event.target.checked}
                                            checked={this.showBankAccounts}
                                        />
                                    </div>
                                </div>
                                {this.showBankAccounts &&
                                    <DonorAccountBankAccountEdit />}
                            </div>
                            <div className="form__group f-col f-col-lrg-12">
                                <div className="group">
                                    <div className="display--b pull">{this.showAddresses ? 'Hide' : 'Show'} Address Informations</div>
                                    <div className="display--b pull spc--left--sml">
                                        <input
                                            type="checkbox"
                                            onChange={(event) => this.showAddresses = event.target.checked}
                                            checked={this.showAddresses}
                                        />
                                    </div>
                                </div>
                                {this.showAddresses &&
                                    <DonorAccountAddressEdit />}
                            </div>
                            <div className="form__group f-col f-col-lrg-12">
                                <div className="group">
                                    <div className="display--b pull">{this.showEmailAddresses ? 'Hide' : 'Show'} Email Address Informations</div>
                                    <div className="display--b pull spc--left--sml">
                                        <input
                                            type="checkbox"
                                            onChange={(event) => this.showEmailAddresses = event.target.checked}
                                            checked={this.showEmailAddresses}
                                        />
                                    </div>
                                </div>
                                {this.showEmailAddresses &&
                                    <DonorAccountEmailAddressEdit />
                                }
                            </div>
                            <div className="form__group f-col f-col-lrg-12">
                                <div className="group">
                                    <div className="display--b pull">{this.showPhoneNumbers ? 'Hide' : 'Show'} Phone Number Informations</div>
                                    <div className="display--b pull spc--left--sml">
                                        <input
                                            type="checkbox"
                                            onChange={(event) => this.showPhoneNumbers = event.target.checked}
                                            checked={this.showPhoneNumbers}
                                        />
                                    </div>
                                </div>
                                {this.showPhoneNumbers &&
                                    <DonorAccountPhoneNumberEdit />}
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}


export default DonorAccountMainEdit;