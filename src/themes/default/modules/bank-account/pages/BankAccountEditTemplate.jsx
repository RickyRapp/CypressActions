import React from 'react';
import { defaultTemplate, isSome } from 'core/utils';
import { BasicInput, BasicCheckBox } from 'core/components';

function BankAccountEditTemplate(props) {

    return (
        <React.Fragment>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={props.donorAccountBankAccount.$('bankAccount.name')} />
            </div>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={props.donorAccountBankAccount.$('bankAccount.description')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={props.donorAccountBankAccount.$('bankAccount.accountNumber')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={props.donorAccountBankAccount.$('bankAccount.routingNumber')} />
            </div>
        </React.Fragment >
    );
}

export default defaultTemplate(BankAccountEditTemplate);
