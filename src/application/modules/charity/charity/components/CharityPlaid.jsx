import React, { Component } from "react";
import {PlaidLink} from "react-plaid-link";
import axios from 'axios';
import { BaasicButton } from 'core/components';

class CharityPlaid extends Component {
  constructor() {
    super();
    this.state = {
      linkToken: "",
    };
  }

  componentDidMount = async () =>{
    const body = {
        client_id: ApplicationSettings.plaidClientId,
	    secret: ApplicationSettings.plaidSecret,
        user: {
            client_user_id: "unique_user_id",
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
    } else {
        //ToDo - add logic for update user info - for example, set bool checkBankAcc on true...
        //to do set accessToken into sessionStorage then move onto UI calls in other components.
        sessionStorage.setItem("plaidAccessToken", response.data["access_token"]);
    }
  }
  handleOnExit() {
    // handle the case when your user exits Link 
    //ToDo - handling when close Plaid window and other errors...
  }

  render() {
    const {linkToken} = this.state

    return (
      <div>
       {linkToken.toString !== 'undefined' ? 
       <PlaidLink 
       token={linkToken.toString()} 
       env={ApplicationSettings.env} 
       onSuccess={this.handleOnSuccess}
       onExit={this.handleOnExit}>
         <BaasicButton className="btn btn--med btn--100 btn--primary--light" label="Verify Bank Account" />
         </PlaidLink> 
         : null
        }
      </div>
    );
  }
}

export default CharityPlaid;