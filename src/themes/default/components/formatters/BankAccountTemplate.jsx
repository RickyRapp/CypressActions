import { bankAccountFormatter } from 'core/utils';
import { defaultTemplate } from 'core/hoc';

function BankAccountTemplate({ format, value }) {
    return bankAccountFormatter.format(value, format);
}

export default defaultTemplate(BankAccountTemplate);
