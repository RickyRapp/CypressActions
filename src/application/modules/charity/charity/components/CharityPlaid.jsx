import React, { Component } from "react";
import {PlaidLink} from "react-plaid-link";
import axios from 'axios';
import {inject} from 'mobx-react';
import { localStorageProvider } from "core/providers";

@inject(i => ({
  notificationStore: i.rootStore.notificationStore
}))

class CharityPlaid extends Component {
  constructor(rootStore) {
    super(rootStore);
    this.notificationStore = rootStore.notificationStore;
    this.state = {
      linkToken: "",
    };
  }

  componentDidMount = async () =>{
    var userInfo = localStorageProvider.get("baasic-user-info-thedonorsfund");
    const body = {
        client_id: ApplicationSettings.plaidClientId,
	    secret: ApplicationSettings.plaidSecret,
        user: {
            client_user_id: userInfo.id != null ? userInfo.id : "unique_user_id",
          },
          client_name: ApplicationSettings.plaidClientName,
          products: ["auth"],
          country_codes: ['US'],
          language: 'en'
    }
    var path = ApplicationSettings.plaidPath+"/link/token/create";
    await axios.post(path,body).then(res=> {
        this.setState({linkToken: res.data["link_token"]});
    });
  }

  handleOnSuccess = async (public_token) => {
    // send token to client server
    var data = {
      client_id: ApplicationSettings.plaidClientId,
      secret: ApplicationSettings.plaidSecret,
      public_token: public_token
    }
    var response = await axios.post(ApplicationSettings.plaidPath+"/item/public_token/exchange", data);
    if(response.data["access_token"] == null || response.data["access_token"] == undefined) {
        //ToDo - access_token = null/undefined
        this.notificationStore.err('Access token error');
    } else {
        //ToDo - add logic for update user info - for example, set bool checkBankAcc on true...
        //to do set accessToken into sessionStorage then move onto UI calls in other components.
        sessionStorage.setItem("plaidAccessToken", response.data["access_token"]);
        this.notificationStore.success('Access token response is not null, the response is ok');
    }
  }
  handleOnExit() {
    // handle the case when your user exits Link 
    //ToDo - handling when close Plaid window and other errors...
    this.notificationStore.err('Close Plaid window and other errors');
  }

  render() {
    const {linkToken} = this.state
    return (
      !this.notificationStore.rootStore.userStore.applicationUser.charity.verifiedByPlaid ?
      <div>
       {linkToken.toString !== 'undefined' ? 
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