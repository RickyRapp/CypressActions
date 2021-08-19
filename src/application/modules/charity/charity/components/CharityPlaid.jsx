import React, { Component } from "react";
import {PlaidLink} from "react-plaid-link";
import axios from 'axios';
import {inject} from 'mobx-react';
import { localStorageProvider } from "core/providers";

@inject(i => ({
  notificationStore: i.rootStore.notificationStore,
  charityStore: i.rootStore.application.charity.charityStore
}))

class CharityPlaid extends Component {
  constructor(rootStore) {
    super(rootStore);
    this.notificationStore = rootStore.notificationStore;
    this.charityStore = rootStore.charityStore;
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
        if(updateResponse.statusCode == 200) {
          this.notificationStore.rootStore.userStore.applicationUser.charity.verifiedByPlaid = resource.verifiedByPlaid;
          this.notificationStore.rootStore.userStore.applicationUser.charity.accessToken = resource.accessToken;
          this.notificationStore.success('Charity is updated successfully - Bank Account is verified!');
          this.forceUpdate();
        } else if(updateResponse.error != null) {
          this.notificationStore.error('Charity is updated not successfully');
        }
    }
  }
  handleOnExit() {
    // handle the case when your user exits Link 
    //ToDo - handling when close Plaid window and other errors...
    //this.notificationStore.error('Close Plaid window and other errors');
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