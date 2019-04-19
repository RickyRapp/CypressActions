import React from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { DonorAccountProfileAdministrationEdit } from 'modules/donor-account/pages'
import { Page, PageContentHeader } from 'core/layouts';
import { DonorAccountService } from "common/data";
import { DonorAccountAddressEdit } from 'modules/address/pages';
import { DonorAccountEmailAddressEdit } from 'modules/email-address/pages';
import { DonorAccountPhoneNumberEdit } from 'modules/phone-number/pages';
import { DonorAccountSettingAdministrationEdit } from 'modules/donor-account/pages'
import { DonorAccountBankAccountEdit } from 'modules/bank-account/pages'
import { DonorNoteList } from 'modules/donor-note/pages'
import { DonorAccountHeaderDetails } from 'modules/donor-account/components'

@observer
class DonorAccountAdministrationEdit extends React.Component {
    @observable showBankAccounts = false;
    @observable showAddresses = false;
    @observable showEmailAddresses = false;
    @observable showPhoneNumbers = false;
    @observable donorAccount = null;

    constructor(props) {
        super();
        this.donorAccountService = new DonorAccountService(props.rootStore.app.baasic.apiClient);
        this.userId = props.rootStore.routerStore.routerState.params.userId;
        this.load();
    }

    @action.bound async load() {
        let params = {};
        params.embed = ['coreUser,companyProfile,address,emailAddress,phoneNumber'];
        const response = await this.donorAccountService.get(this.userId, params);
        if (response) {
            if (response.coreUser && response.coreUser.json) {
                response.coreUser.middleName = (JSON.parse(response.coreUser.json)).middleName;
                response.coreUser.prefixTypeId = (JSON.parse(response.coreUser.json)).prefixTypeId;
            }
        }
        this.donorAccount = response;
    }

    render() {
        return (
            <Page>
                <PageContentHeader>
                    <DonorAccountHeaderDetails userId={this.userId} type='donor-account' />
                </PageContentHeader>
                {this.donorAccount &&
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-6">
                            <div className="f-row">
                                <div className="form__group f-col f-col-lrg-12">
                                    <DonorAccountProfileAdministrationEdit fetchedDonorAccount={this.donorAccount} />
                                </div>
                                <div className="form__group f-col f-col-lrg-12">
                                    <DonorAccountSettingAdministrationEdit fetchedDonorAccount={this.donorAccount} columns={4} />
                                </div>
                                <div className="form__group f-col f-col-lrg-12">
                                    <DonorNoteList />
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
                    </div>}
            </Page>
        )
    }
}


export default DonorAccountAdministrationEdit;