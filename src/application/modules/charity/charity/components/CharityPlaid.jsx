import React, { Component } from "react";
import { PlaidLink } from "react-plaid-link";
import axios from 'axios';
import { inject } from 'mobx-react';
import { localStorageProvider } from "core/providers";
import { PlaidService } from "common/services";

@inject(i => ({
  notificationStore: i.rootStore.notificationStore,
  application: i.rootStore.application
}))

class CharityPlaid extends Component {
  constructor(rootStore) {
    super(rootStore);
    this.notificationStore = rootStore.notificationStore;
    this.plaidService = new PlaidService(rootStore.application.baasic.apiClient);
    this.state = {
      linkToken: "",
    };
  }

  getLinkToken = async () => {
    //initiate link token for later usage
    var r = await this.plaidService.getLinkToken();
    console.log('plaid result: ', r);
    this.setState({ linkToken: JSON.parse(r.data.response)["link_token"] });
  }

  handleOnSuccess = async (public_token) => {
    // send token to client server
    var r = await this.plaidService.exchangeToken(public_token);
    console.log("exchange: ", r);

  }

  handleOnExit = async () => {
    // handle the case when your user exits Link 
    //ToDo - handling when close Plaid window and other errors...
    if (!this.notificationStore.rootStore.userStore.applicationUser.charity.verifiedByPlaid)
      this.notificationStore.error('Verification unsuccessful, you have closed Plaid!');
  }

  render() {
    const { linkToken } = this.state

    return (
      !this.notificationStore.rootStore.userStore.applicationUser.charity.verifiedByPlaid ?
        <div>
          {linkToken && linkToken.toString() !== 'undefined' ?
            <PlaidLink
              token={linkToken.toString()}
              env={ApplicationSettings.env}
              onSuccess={this.handleOnSuccess}
              onExit={this.handleOnExit}>
              <div className="btn btn--med btn--100 btn--primary--light" onClick={this.getLinkToken}>Verify Bank Account</div>
            </PlaidLink>
            : null
          }
        </div> :
        <div><br /><small>Account verified by Plaid: <i className="u-icon u-icon--approve u-icon--base"></i></small></div>
    );
  }
}

export default CharityPlaid;