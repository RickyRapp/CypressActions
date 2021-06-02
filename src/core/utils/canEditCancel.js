import moment from 'moment';
export default function canEditCancel(value) {
    return moment().isBefore(moment.utc(value).add(15, 'minutes').format('l LT'));
}