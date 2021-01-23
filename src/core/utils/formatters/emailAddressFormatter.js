class EmailAddressFormatter {
    format(emailAddress, format) {
        let formattedEmailAddress = '';
        if (format === 'full') {
            if (emailAddress && emailAddress.length != null && emailAddress.length > 0) {
                emailAddress = emailAddress.find(c => c.isPrimary);
            }
            formattedEmailAddress = emailAddress.email;
        }
        return formattedEmailAddress;
    }
}

const emailAddressFormatter = new EmailAddressFormatter();
export default emailAddressFormatter;
