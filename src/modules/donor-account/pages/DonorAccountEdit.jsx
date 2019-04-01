import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountProfileEdit, DonorAccountSettingPreview } from 'modules/donor-account/pages'
import { Page, PageContentHeader } from 'core/layouts';
import { DonorAccountAddressEdit } from 'modules/address/pages';
import { DonorAccountEmailAddressEdit } from 'modules/email-address/pages';
import { DonorAccountPhoneNumberEdit } from 'modules/phone-number/pages';
import { DonorAccountSettingEdit } from 'modules/donor-account/pages'
import { DonorAccountBankAccountEdit } from 'modules/bank-account/pages'
import { DonorNoteList } from 'modules/donor-note/pages'
import { DonorAccountProfileViewStore } from 'modules/donor-account/stores';

@setCurrentView(rootStore => new DonorAccountProfileViewStore(rootStore), 'donorAccountProfileViewStore')
@observer
class DonorAccountEdit extends React.Component {
    @observable showBankAccounts = false;
    @observable showAddresses = false;
    @observable showEmailAddresses = false;
    @observable showPhoneNumbers = false;

    renderShorcuts() {
        return (
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-4">
                    <a className="btn btn--xsml btn--tertiary" onClick={() => this.props.rootStore.routerStore.navigate('master.app.main.contribution.list', { donorAccountId: this.props.donorAccountProfileViewStore.userId })}>Contributions (TODO)</a>
                </div>
                <div className="form__group f-col f-col-lrg-4">
                    <a className="btn btn--xsml btn--tertiary" onClick={() => this.props.rootStore.routerStore.navigate('master.app.main.contribution.setting', { id: this.props.donorAccountProfileViewStore.userId })}>Contribution Settings</a>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Page>
                <PageContentHeader>{this.renderShorcuts()}</PageContentHeader>
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-6">
                        <div className="f-row">
                            <div className="form__group f-col f-col-lrg-12">
                                <DonorAccountProfileEdit />
                            </div>
                            {this.props.donorAccountProfileViewStore.permissions.mainUpdate &&
                                <div className="form__group f-col f-col-lrg-12">
                                    <DonorAccountSettingEdit />
                                </div>}
                            {!this.props.donorAccountProfileViewStore.permissions.mainUpdate &&
                                <div className="form__group f-col f-col-lrg-12">
                                    <DonorAccountSettingPreview />
                                </div>}
                            {this.props.donorAccountProfileViewStore.permissions.administrationRead &&
                                <div className="form__group f-col f-col-lrg-12">
                                    <DonorNoteList />
                                </div>}
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


export default DonorAccountEdit;