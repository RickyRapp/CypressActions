import _ from 'lodash';

function getModulesInfo(modules) {
    let routes = [];
    let menus = [];
    let storeFactories = [];

    _.each(modules, (module) => {
        if (module.routes) {
            routes.push(...module.routes);
        }

        if (module.menu) {
            menus.push(module.menu);
        }

        if (module.moduleStore) {
            storeFactories.push(module.moduleStore);
        }
    });

    return {
        routes,
        menus,
        storeFactories
    }
}

export {
    getModulesInfo
}