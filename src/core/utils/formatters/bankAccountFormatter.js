class BankAccountFormatter {
    format(bankAccount, format) {
        let formattedBankAccount = '';
        if (format === 'full') {
            formattedBankAccount = `${bankAccount.name}, ${bankAccount.routingNumber}, ${bankAccount.accountNumber}`;
        }
        return formattedBankAccount;
    }
}

const bankAccountFormatter = new BankAccountFormatter();
export default bankAccountFormatter;
