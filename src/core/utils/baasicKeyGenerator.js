const keyTypes = [
    {
        name: 'token',
        key: new RegExp(/^baasic-auth-token-.*$/),
        replace: 'react-baasic-token'
    },
    {
        name: 'platform-user',
        key: new RegExp(/^baasic-user-info-platform.*$/),
        replace: 'react-baasic-platform-user'
    },
    {
        name: 'app-user',
        key: new RegExp(/^baasic-user-info-(?!platform).*$/),
        replace: 'react-baasic-app-user'
    }
];

function baasicKeyGenerator(key) {
    for (var i = 0, l = keyTypes.length; i < l; i++) {
        var type = keyTypes[i];
        if (type.key.test(key)) return type.replace;
    }

    return key;
}

export {
    baasicKeyGenerator,
    keyTypes as baasicStorageKeys
};