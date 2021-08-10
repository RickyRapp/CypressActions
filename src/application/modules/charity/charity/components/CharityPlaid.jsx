import React from 'react';
import { PlaidLink } from 'react-plaid-link';

const CharityPlaid = props => {
  const onSuccess = (token, metadata) => {
    // send token to server
  };

  return (
    <PlaidLink
      clientName="Your app name"
      env="sandbox"
      product={['auth', 'transactions']}
      publicKey="<YOUR_PLAID_PUBLIC_KEY>"
      onSuccess={onSuccess}
    //   {...}
    >
      Connect a bank account
    </PlaidLink>
  );
};
export default CharityPlaid;