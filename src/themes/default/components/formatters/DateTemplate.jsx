import { dateFormatter } from 'core/utils';
import { defaultTemplate }from 'core/hoc';

function Date({ format, value, timezone }) {
    return dateFormatter.format(value, format, timezone);
}

export default defaultTemplate(Date);
