export default function isNullOrWhiteSpacesOrUndefinedOrEmpty(value) {
    return value === null || value === undefined || value === '' || value.replace(/\s/g, '') === '';
}