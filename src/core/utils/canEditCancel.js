import moment from 'moment';
export default function canEditCancel(value) {
    let currentTime = moment().utcOffset(new Date().getTimezoneOffset());    
    const dateToEdit = moment.utc(value).add(15, 'm');
    return moment(currentTime).isBetween(moment(value), dateToEdit);
}