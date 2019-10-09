class StoreProvider {
    initialize(moduleStores) {
        var storeInfos = [];
        for (let i = 0; i < moduleStores.length; i++) {      
            const store = moduleStores[i];

            const keys = Object.keys(store);
            if (keys.length < 1) {
                throw new Error('Module store definition should contain at least one key which is pattern to module store (e.g. { \'my.module.path\' : new MyModuleStore() }')
            }

            const key = keys[0];
            const namespaces = key.split('.');
            storeInfos.push({
                key,
                store,
                namespaces: namespaces,
                count: namespaces.length,
            });
        }

        storeInfos.sort(function (a, b) {
            return a.count - b.count;
        });

        const root = {};
        for (let i = 0; i < storeInfos.length; i++) {
            const { key, store, namespaces, count } = storeInfos[i];

            var parent = root;
            for (let i = 0; i < count; i++) {
                const isLast = i === count - 1;
                const namespace = namespaces[i];

                if (parent[namespace] !== undefined) {
                    if (isLast) { throw new Error('Module store \'' + key + '\' already exists!') }
                    parent = parent[namespace];
                    continue;
                } else {
                    parent[namespace] = isLast ? store[key] : {};
                    parent = parent[namespace];
                }
            }
        }
        return root;
    }
}

export default new StoreProvider();