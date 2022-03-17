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

  componentDidMount = async () => {
    //initiate link token for later usage
    var r = await this.plaidService.getLinkToken();
    console.log('plaid result: ', r);
    this.setState({ linkToken: JSON.parse(r.data.response)["link_token"] });
  }

  handleOnSuccess = async (public_token) => {
    // send token to client server
    var data = {
      client_id: ApplicationSettings.plaidClientId,
      secret: ApplicationSettings.plaidSecret,
      public_token: public_token
    }
    var response = await axios.post(ApplicationSettings.plaidPath + "/item/public_token/exchange", data);
    if (response.data["access_token"] == null || response.data["access_token"] == undefined) {
      //ToDo - access_token = null/undefined
      this.notificationStore.error('Access token error');
    } else {
      //to do set accessToken into sessionStorage then move onto UI calls in other components.
      sessionStorage.setItem("plaidAccessToken", response.data["access_token"]);

      var userInfo = localStorageProvider.get("baasic-user-info-thedonorsfund");
      var resource = {
        verifiedByPlaid: true,
        accessToken: response.data["access_token"]
      }
      var updateResponse = await this.charityStore.updateWithPlaidCharity({ id: userInfo.id, ...resource });
      if (updateResponse.statusCode == 200) {
        this.notificationStore.rootStore.userStore.applicationUser.charity.verifiedByPlaid = resource.verifiedByPlaid;
        this.notificationStore.rootStore.userStore.applicationUser.charity.accessToken = resource.accessToken;
        this.notificationStore.success('Charity is updated successfully - Bank Account is verified!');
        this.forceUpdate();
      } else if (updateResponse.error != null) {
        this.notificationStore.error('Charity is not updated successfully');
      }
    }
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
              <div className="btn btn--med btn--100 btn--primary--light">Verify Bank Account</div>
            </PlaidLink>
            : null
          }
        </div> :
        <div><br /><small>Account verified by Plaid: <i className="u-icon u-icon--approve u-icon--base"></i></small></div>
    );
  }
}

export default CharityPlaid;