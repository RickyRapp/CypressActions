import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    CharityAddressListTable,
    CharityBankAccount
} from 'application/charity/charity/components';
import axios from 'axios';

function CharityPersonalDataTemplate() {
    
    return (
        <div className="card--primary card--med">
            <div className="row">
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <CharityBankAccount />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <button className='btn btn--med btn--ghost search__wrapper__item' onClick={getBankAccounts}>
                    Get Bank Accounts
                    </button>
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <CharityAddressListTable />
                </div>
            </div>
        </div>
    )
}

function getBankAccounts() {
    const access_token = sessionStorage.getItem("plaidAccessToken");
    //console.log("Access token is", access_token);
    var data = {
      client_id: ApplicationSettings.plaidClientId,
      secret: ApplicationSettings.plaidSecret,
      access_token: access_token
    }
    var response;
    if(access_token != null) {
        response = axios.post(ApplicationSettings.plaidPath+"/auth/get",data).catch((err) => {
            if(err) {
              // handle error
              // access_token is null or ather errors...
            }
          });
          if(response) {
              //handle response data - ToDo
              // const accountData = response.accounts;
              // const numbers = response.numbers;
          }
    } else {
        response = null;
    }
}

CharityPersonalDataTemplate.propTypes = {
    t: PropTypes.func
};

export default defaultTemplate(CharityPersonalDataTemplate);
