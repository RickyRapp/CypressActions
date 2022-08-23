export const copyZelleText = ({ bankAccount, form }) => {
    return (
        `
        Our Zelle email address - QP@TheDonorsFund.org\n
        Zelle Memo: ${bankAccount ? bankAccount.accountNumber : 'xxxx-xxxx-xxxx-xxxx(your full account number)'} \n
        Amount: $${form.$('amount').value.toFixed(2)}`
    )
}

export const stockAndSecurityText = ({ t }) => {
    return (
        `Beneficiary – Donors’ Fund Inc\n
        Address - ${t('MAILING_ADDRESS')}\n
        EIN (tax ID) – 47-4844275\n
        Brokerage Firm – Fidelity Investment\n
        DTC – 0226\n
        Brokerage Number - Z50762458`
    )
}

export const thirdPartyDonorText = ({ bankAccount, form, t }) => {
    return (
        `
        Charity name: The Donors Fund\n
        EIN (tax ID): 47-4844275\n
        ${t('MAILING_ADDRESS')}\n
        Memo for purpose of grant: ${bankAccount ? bankAccount.accountNumber : 'xxxx-xxxx-xxxx-xxxx(your full account number)'
        } \n
    Amount: $${form.$('amount').value.toFixed(2)}`
    )
}

export const checkText = ({ bankAccount, form, t }) => {
    return (
        `
        Make checks payable to: The Donors Fund\n
        Mail to: ${t('MAILING_ADDRESS')}\n
        Check Memo: ${bankAccount ? bankAccount.accountNumber : 'xxxx-xxxx-xxxx-xxxx(your full account number)'} \n
        Amount: $${form.$('amount').value.toFixed(2)}`
    )
}

export const paycheckDirectText = ({ form, t }) => {
    return (
        `
        Beneficiary: The Donors Fund
        ${t('MAILING_ADDRESS')}
        
        Beneficiary bank:
        JP Morgan Chase
        ABA (routing number): 021000021
        Account number: 883220399
        
        Amount: $${form.$('amount').value.toFixed(2)}`
    )
}