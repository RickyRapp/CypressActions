import _ from 'lodash';
import { observable } from 'mobx';

function getDefaultRouteDataMap(routes) {
    const routeDataMap = observable.map();

    _.each(routes, (route) => {
        // set default back for common pages
        // create -> list
        // edit -> list
        // settings -> list
        // language -> list
        let goBack = route.data.back;
        if (!goBack) {
            const routeName = route.name;
            if (_.endsWith(routeName, '.create')
                || _.endsWith(routeName, '.edit')
                || _.endsWith(routeName, '.settings')
                || _.endsWith(routeName, '.language')
                || _.endsWith(routeName, '.localization')
            ) {
                const parts = _.split(routeName, '.');
                const listRoute = _.join(_.take(parts, parts.length - 1), '.') + '.list';
                if (_.some(routes, (r) => r.name === listRoute)) {
                    goBack = listRoute;
                }
            }
        }

        const { data } = route;
        if (data && data.title && (!data.crumbs || data.crumbs.length === 0)) {
            // set page breadcrumb as page title if not breadcrumb defined
            data.crumbs = [{ title: data.title }];
        }

        const routeData = _.merge({}, route.data, {
            back: goBack,
            crumbs: data.crumbs
        });

        routeDataMap.set(route.name, routeData);
    });

    return routeDataMap;
}

export default getDefaultRouteDataMap;