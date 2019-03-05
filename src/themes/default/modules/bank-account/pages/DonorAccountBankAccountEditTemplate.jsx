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
                    ></BankAccountEdit>
                </React.Fragment>
            )}

            {items && items.length > 0 && <BankAccountCreate title={'You can add another bank account'} onAfterCreate={getResource} />}
            {(!items || items.length === 0) && <BankAccountCreate title={'Add bank account'} onAfterCreate={getResource} />}
        </React.Fragment>
    );
}

export default defaultTemplate(DonorAccountBankAccountEditTemplate);
