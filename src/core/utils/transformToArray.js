import _ from 'lodash';

export default function transformToArray(item) {
    let array = [];
    if (_.isArray(item)) {
        array = [...item];
    } else if (typeof item === 'function') {
        array = [...transformToArray(item())];
    } else {
        array = [item];
    }
    return array;
}