import React, { Component } from "react";
import { PlaidLink } from "react-plaid-link";
import axios from 'axios';
import { inject } from 'mobx-react';
import { localStorageProvider } from "core/providers";
import { PlaidService } from "common/services";
import { async } from "rxjs/internal/scheduler/async";

@inject(i => ({
  notificationStore: i.rootStore.notificationStore,
  application: i.rootStore.application
}))

class CharityPlaid extends Component {
  constructor(props) {
    super(props);
    this.notificationStore = this.props.notificationStore;
    this.plaidService = new PlaidService(this.props.application.baasic.apiClient);
    this.state = {
      linkToken: "",
      charity: this.props.charity
    };
  }

  getLinkToken = async () => {
    var r = await this.plaidService.getLinkToken();
    this.setState({ linkToken: r.data.response });
  }

  handleOnSuccess = async (public_token) => {
    // send token to client server
    var r = await this.plaidService.validateAccount(public_token, null); //validate primary account
    var c = this.state.charity;
    c.verifiedByPlaid = r.data;
    this.setState({ charity: c });
    this.state.charity.verifiedByPlaid = r.data;
  }

  handleOnExit = async () => {
    // handle the case when your user exits Link 
    //ToDo - handling when close Plaid window and other errors...
    if (!this.notificationStore.rootStore.userStore.applicationUser.charity.verifiedByPlaid)
      this.notificationStore.error('Verification unsuccessful, you have closed Plaid!');
  }

  render() {
    const { linkToken, charity } = this.state
    console.log("render plaid", linkToken, charity);
    if (!charity.verifiedByPlaid && !linkToken) {
      this.getLinkToken();
    }

    return (
      !charity.verifiedByPlaid ?
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