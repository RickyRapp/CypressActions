import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { DonorAccountEdit } from 'modules/administration/donor-account/pages'
import { Page, PageContentHeader } from 'core/layouts';
import { DonorAccountService } from "common/data";
import { DonorAccountAddressEdit } from 'modules/common/address/pages';
import { DonorAccountEmailAddressEdit } from 'modules/common/email-address/pages';
import { DonorAccountPhoneNumberEdit } from 'modules/common/phone-number/pages';
import { DonorAccountBankAccountEdit } from 'modules/common/bank-account/pages'
import { DonorNoteList } from 'modules/administration/donor-note/pages'
import { DonorAccountHeaderDetails } from 'modules/administration/donor-account/components'

@observer
class DonorAccountOverview extends React.Component {
    @observable showBankAccounts = false;
    @observable showAddresses = false;
    @observable showEmailAddresses = false;
    @observable showPhoneNumbers = false;

    constructor(props) {
        super();
        this.donorAccountService = new DonorAccountService(props.rootStore.app.baasic.apiClient);
        this.userId = props.rootStore.routerStore.routerState.params.userId;
    }

    render() {
        return (
            <Page>
                <PageContentHeader>
                    <DonorAccountHeaderDetails userId={this.userId} type='donor-account' />
                </PageContentHeader>
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="f-row">
                            <div className="form__group f-col f-col-lrg-12">
                                <DonorAccountEdit userId={this.userId} />
                            </div>
                            <div className="form__group f-col f-col-lrg-12">
                                <DonorNoteList userId={this.userId} />
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