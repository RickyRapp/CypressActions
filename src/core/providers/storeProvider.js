class StoreProvider {
  buildStores(storeFactories, context) {
    var storeInfos = [];
    const { rootStore } = context;
    for (let i = 0; i < storeFactories.length; i++) {
      const storeFactory = storeFactories[i];
      const store = storeFactory(context);

      const keys = Object.keys(store);
      if (keys.length < 1) {
        throw new Error(
          "Module store definition should contain at least one key which is pattern to module store (e.g. { 'my.module.path' : new MyModuleStore() }"
        );
      }

      const key = keys[0];
      const namespaces = key.split('.');
      storeInfos.push({
        key,
        store,
        namespaces: namespaces,
        count: namespaces.length
      });
    }

    storeInfos.sort(function(a, b) {
      return a.count - b.count;
    });

    const storeObject = {};

    for (let i = 0; i < storeInfos.length; i++) {
      const { key, store, namespaces, count } = storeInfos[i];

      var parent = storeObject;
      for (let i = 0; i < count; i++) {
        const isLast = i === count - 1;
        const namespace = namespaces[i];

        if (parent[namespace] !== undefined) {
          if (isLast) {
            throw new Error("Module store '" + key + "' already exists!");
          }
          parent = parent[namespace];
          continue;
        } else {
          parent[namespace] = isLast ? store[key] : { rootStore: rootStore };
          parent = parent[namespace];
        }
      }
    }

    return storeObject;
  }
}

export default new StoreProvider();
