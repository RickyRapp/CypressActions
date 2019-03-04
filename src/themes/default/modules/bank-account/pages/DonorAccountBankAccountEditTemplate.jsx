import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BankAccountEdit, BankAccountCreate } from 'modules/bank-account/pages';

function DonorAccountBankAccountEditTemplate({ donorAccountBankAccountEditViewStore }) {
    const {
        items,
        getResource,
        hide,
        onShowHideChange
    } = donorAccountBankAccountEditViewStore;

    return (
        <React.Fragment>
            <div className="group">
                <div className="display--b pull">Hide Bank Informations</div>
                <div className="display--b pull spc--left--sml">
                    <input
                        type="checkbox"
                        onChange={onShowHideChange}
                        checked={hide}
                    />
                </div>
            </div>
            {!hide &&
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
            }
        </React.Fragment>
    );
}

export default defaultTemplate(DonorAccountBankAccountEditTemplate);
