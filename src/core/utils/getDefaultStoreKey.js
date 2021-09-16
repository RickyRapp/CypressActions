export default function getDefaultStoreKey(appKey, namespace) {
    return 'apps.' + appKey + '.' + namespace;
}