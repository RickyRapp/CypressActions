import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountProfileEdit, DonorAccountSettingPreview } from 'modules/donor-account/pages'
import { Page } from 'core/layouts';
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
    render() {
        return (
            <Page>
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
                                    <div className="display--b pull">Hide Bank Informations</div>
                                    <div className="display--b pull spc--left--sml">
                                        <input
                                            type="checkbox"
                                            onChange={this.props.donorAccountProfileViewStore.onShowHideBankAccountChange}
                                            checked={this.props.donorAccountProfileViewStore.hideBankAccount}
                                        />
                                    </div>
                                </div>
                                {!this.props.donorAccountProfileViewStore.hideBankAccount &&
                                    <DonorAccountBankAccountEdit />}
                            </div>
                            <div className="form__group f-col f-col-lrg-12">
                                <div className="group">
                                    <div className="display--b pull">Hide Address Informations</div>
                                    <div className="display--b pull spc--left--sml">
                                        <input
                                            type="checkbox"
                                            onChange={this.props.donorAccountProfileViewStore.onShowHideAddressChange}
                                            checked={this.props.donorAccountProfileViewStore.hideAddress}
                                        />
                                    </div>
                                </div>
                                {!this.props.donorAccountProfileViewStore.hideAddress &&
                                    <DonorAccountAddressEdit />}
                            </div>
                            <div className="form__group f-col f-col-lrg-12">
                                <div className="group">
                                    <div className="display--b pull">Hide Email Address Informations</div>
                                    <div className="display--b pull spc--left--sml">
                                        <input
                                            type="checkbox"
                                            onChange={this.props.donorAccountProfileViewStore.onShowHideEmailAddressChange}
                                            checked={this.props.donorAccountProfileViewStore.hideEmailAddress}
                                        />
                                    </div>
                                </div>
                                {!this.props.donorAccountProfileViewStore.hideEmailAddress &&
                                    <DonorAccountEmailAddressEdit />
                                }
                            </div>
                            <div className="form__group f-col f-col-lrg-12">
                                <div className="group">
                                    <div className="display--b pull">Hide Phone Number Informations</div>
                                    <div className="display--b pull spc--left--sml">
                                        <input
                                            type="checkbox"
                                            onChange={this.props.donorAccountProfileViewStore.onShowHidePhoneNumberChange}
                                            checked={this.props.donorAccountProfileViewStore.hidePhoneNumber}
                                        />
                                    </div>
                                </div>
                                {!this.props.donorAccountProfileViewStore.hidePhoneNumber &&
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