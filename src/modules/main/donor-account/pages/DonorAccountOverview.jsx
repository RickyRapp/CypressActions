import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { DonorAccountEdit } from 'modules/main/donor-account/pages'
import { Page } from 'core/layouts';
import { DonorAccountService } from "common/data";
import { DonorAccountAddressEdit } from 'modules/common/address/pages';
import { DonorAccountEmailAddressEdit } from 'modules/common/email-address/pages';
import { DonorAccountPhoneNumberEdit } from 'modules/common/phone-number/pages';
import { DonorAccountBankAccountEdit } from 'modules/common/bank-account/pages'

@observer
class DonorAccountOverview extends React.Component {
    @observable showBankAccounts = false;
    @observable showAddresses = false;
    @observable showEmailAddresses = false;
    @observable showPhoneNumbers = false;

    constructor(props) {
        super();
        this.donorAccountService = new DonorAccountService(props.rootStore.app.baasic.apiClient);
        this.userId = props.rootStore.authStore.user.id;
    }

    render() {
        return (
            <Page>
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="f-row">
                            <div className="form__group f-col f-col-lrg-12">
                                <DonorAccountEdit userId={this.userId} />
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
                                    <DonorAccountBankAccountEdit userId={this.userId} />}
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
                                    <DonorAccountAddressEdit userId={this.userId} />}
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
                                    <DonorAccountEmailAddressEdit userId={this.userId} />
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
                                    <DonorAccountPhoneNumberEdit userId={this.userId} />}
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}


export default DonorAccountOverview;