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
    //var response = await axios.post("/create_link_token")
    var path = "https://sandbox.plaid.com/api/create_link_token";
    const response = await fetch(path, {
      method: "POST",
    });
    this.setState({linkToken: response.data["link_token"]});
  }

  handleOnSuccess = async (public_token, metadata) => {
    // send token to client server
    var data = {
      public_token: public_token
    }
    var response = await axios.post("/exchange_public_token", data);
    console.log(response)
    //to do set accessToken into sessionStorage then move onto UI calls in other components.
    sessionStorage.setItem("accessToken", response.data["access_token"]);

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