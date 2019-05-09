import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BankAccountEdit, BankAccountCreate } from 'modules/common/bank-account/pages';

function DonorAccountBankAccountEditTemplate({ donorAccountBankAccountEditViewStore }) {
    const {
        items,
        getResource,
        userId
    } = donorAccountBankAccountEditViewStore;

    return (
        <React.Fragment>
            {items && items.map((bankAccount, i) =>
                <React.Fragment key={bankAccount.dateUpdated} >
                    <BankAccountEdit
                        id={bankAccount.id}
                        title={i === 0 ? 'Oldest Bank Account' : ''}
                        item={bankAccount}
                        onAfterUpdate={getResource}
                    ></BankAccountEdit>
                </React.Fragment>
            )}

            <BankAccountCreate title={items && items.length !== 0 ? 'You can add another bank account' : 'Add bank account'} onAfterCreate={getResource} userId={userId} />
        </React.Fragment>
    );
}

export default defaultTemplate(DonorAccountBankAccountEditTemplate);
