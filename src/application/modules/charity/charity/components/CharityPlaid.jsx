import React, { Component } from "react";
import {PlaidLink} from "react-plaid-link";
import axios from 'axios';

class CharityPlaid extends Component {
  constructor() {
    super();
    this.state = {
      linkToken: "",
    };
  }

  componentDidMount = async () =>{
    const body = {
        client_id: "6113918b27beb40012ab1757",
	    secret: "00777a6e53df23607520a7f67b629b",
        user: {
            client_user_id: "unique_user_id",
          },
          client_name: 'The Donors\' Fund',
          products: ["auth"],
          country_codes: ['US'],
          language: 'en'
    }
    var path = "https://sandbox.plaid.com/link/token/create";
    await axios.post(path,body).then(res=> {
            this.setState({linkToken: res.data["link_token"]});
    });
  }

  handleOnSuccess = async (public_token) => {
    // send token to client server
    var data = {
      public_token: public_token
    }
    var response = await axios.post("/exchange_public_token", data);
    //console.log(response);
    //to do set accessToken into sessionStorage then move onto UI calls in other components.
    sessionStorage.setItem("accessToken", response.data["access_token"]);
  }
  handleOnExit() {
    // handle the case when your user exits Link
  }

  render() {
    const {linkToken} = this.state

    return (
      <div>
       {linkToken.toString !== 'undefined' ? 
       <PlaidLink 
       token={linkToken.toString()} 
       env="sandbox" 
       onSuccess={this.handleOnSuccess}
       onExit={this.handleOnExit}>
         Connect Bank Account
         </PlaidLink> 
         : null
        }
      </div>
    );
  }
}

export default CharityPlaid;