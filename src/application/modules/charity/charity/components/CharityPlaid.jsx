import React, { Component } from "react";
import { PlaidLink } from "react-plaid-link";
import axios from 'axios';
import { inject } from 'mobx-react';
import { localStorageProvider } from "core/providers";
import { PlaidService } from "common/services";
import { async } from "rxjs/internal/scheduler/async";

@inject(i => ({
  notificationStore: i.rootStore.notificationStore,
  application: i.rootStore.application,
  routerStore: i.rootStore.routerStore
}))

class CharityPlaid extends Component {
  constructor(props) {
    super(props);
    this.notificationStore = this.props.notificationStore;
    this.plaidService = new PlaidService(this.props.application.baasic.apiClient);
    this.state = {
      linkToken: "",
      bankAccount: this.props.bankAccount
    };
  }

  getLinkToken = async () => {
    var r = await this.plaidService.getLinkToken();
    this.setState({ linkToken: r.data.response });
  }

  handleOnSuccess = async (public_token) => {
    // send token to client server
    var accountId = this.props.bankAccount && this.props.bankAccount.id;
    var response = await this.plaidService.validateAccount(public_token, accountId); //validate primary account
    var b = this.state.bankAccount;

    if (response.data) {
      this.props.changeToPlaidSucessful();
      this.notificationStore.success('Verification successful!');
    } else {
      this.props.changeToPlaidUnsucessful();
      this.notificationStore.error('Verification unsuccessful!');
    }
  }

  handleOnExit = async () => {
    // handle the case when your user exits Link 
    //ToDo - handling when close Plaid window and other errors... 
    if (this.props.entityType === 'donor') {
      if (!this.notificationStore.rootStore.userStore.applicationUser.donor.verifiedByPlaid)
        this.notificationStore.error('Verification unsuccessful, you have closed Plaid!');
    } else {
      if (!this.notificationStore.rootStore.userStore.applicationUser.charity.verifiedByPlaid)
        this.notificationStore.error('Verification unsuccessful, you have closed Plaid!');
    }

  }

  render() {
    const { linkToken } = this.state
    if (!(this.props.bankAccount && this.props.bankAccount.isVerifiedByPlaid) && !linkToken) {
      this.getLinkToken();
    }

    return (
      this.props.bankAccount ? (
        !this.props.bankAccount.isVerifiedByPlaid ?
          <div>
            {linkToken && linkToken.toString() !== 'undefined' ?
              <PlaidLink
                token={linkToken.toString()}
                env={ApplicationSettings.env}
                onSuccess={this.handleOnSuccess}
                onExit={this.handleOnExit}
                style={{ background: 'transparent', border:"0px solid rgba(0, 0, 0, .4)" }}
              >
                <span className="btn btn--med btn--secondary u-mar--bottom--med" onClick={this.getLinkToken}>Verify bank account electronically</span>
              </PlaidLink>
              : null
            }
          </div> :
          <div>
            <p className="type--tny">
              Account verified by Plaid: <i className="u-icon u-icon--approve u-icon--base"></i>
            </p>
          </div>
      ) : (
        <div>
          {linkToken && linkToken.toString() !== 'undefined' ?
            <PlaidLink
              token={linkToken.toString()}
              env={ApplicationSettings.env}
              onSuccess={this.handleOnSuccess}
              onExit={this.handleOnExit}
              style={{ background: 'transparent', border:"0px solid rgba(0, 0, 0, .4)" }}
            >
              <span className="btn btn--med btn--secondary u-mar--bottom--med" onClick={this.getLinkToken}>Create bank account electronically</span>
            </PlaidLink>
            : null
          }
        </div>
      )
    );

  }
}

export default CharityPlaid;