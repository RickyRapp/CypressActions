import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { DonorAccountProfileAdministrationEdit } from 'modules/donor-account/pages'
import { Page, PageContentHeader } from 'core/layouts';
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

    render() {
        return (
            <Page>
                <PageContentHeader>
                    <DonorAccountHeaderDetails userId={this.props.rootStore.routerStore.routerState.params.id} type='donor-account' />
                </PageContentHeader>
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="f-row">
                            <div className="form__group f-col f-col-lrg-12">
                                <DonorAccountProfileAdministrationEdit />
                            </div>
                            <div className="form__group f-col f-col-lrg-12">
                                <DonorAccountSettingAdministrationEdit />
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
                </div>
            </Page>
        )
    }
}


export default DonorAccountAdministrationEdit;