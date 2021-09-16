import moment from 'moment';
export default function tzFormatter(value) { return new Date(moment.utc(value).format('LLLL')) }