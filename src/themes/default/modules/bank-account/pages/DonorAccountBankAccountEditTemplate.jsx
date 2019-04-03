import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BankAccountEdit, BankAccountCreate } from 'modules/bank-account/pages';

function DonorAccountBankAccountEditTemplate({ donorAccountBankAccountEditViewStore }) {
    const {
        items,
        getResource
    } = donorAccountBankAccountEditViewStore;

    return (
        <React.Fragment>
            {items && items.map((donorAccountBankAccount, i) =>
                <React.Fragment key={donorAccountBankAccount.id} >
                    <BankAccountEdit
                        id={donorAccountBankAccount.bankAccountId}
                        title={i === 0 ? 'Oldest Bank Account' : ''}
                        item={donorAccountBankAccount.bankAccount}
                    ></BankAccountEdit>
                </React.Fragment>
            )}

            <BankAccountCreate title={items && items.length !== 0 ? 'You can add another bank account' : 'Add bank account'} onAfterCreate={getResource} />
        </React.Fragment>
    );
}

export default defaultTemplate(DonorAccountBankAccountEditTemplate);
