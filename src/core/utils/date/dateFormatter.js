import moment from 'moment';
import { localizationService } from 'core/services';

class DateFormatter {
    format(date, format, timeZone = null) {
        let dateFormat = this.map(format);
        let momentDate = moment.isMoment(date) ? date : moment(date);
        if (timeZone) {
            momentDate = moment.tz(momentDate, timeZone);
        }
        return dateFormat ? momentDate.format(dateFormat) : momentDate.toISOString();
    }

    map(format) {
        return format && format !== ''
            ? localizationService.t('CORE.DATE_FORMAT.' + format)
            : null;
    }
}

const dateFormatter = new DateFormatter();
export default dateFormatter;
