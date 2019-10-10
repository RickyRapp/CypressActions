import { action, observable } from 'mobx';
import _ from 'lodash';
import { FilterParams } from 'core/models';

const sortDirection = {
    asc: 'asc',
    desc: 'desc'
};

class QueryUtility {
    @observable filter; // = new FilterParams();
    @observable recordCount; //= 0;
    @observable totalPages; //= 0;

    constructor(rootStore, fetchFunc, options = {}) {
        this.rootStore = rootStore;
        this.fetchFunc = fetchFunc;

        if (options.filter) {
            this.filter = options.filter;
        }
        else {
            this.filter = new FilterParams();
        }

        this.recordCount = 0;
        this.totalPages = 0;

        this._init(options);
    }

    _init(options) {
        if (options.onChangeOrder) {
            this.onChangeOrder = options.onChangeOrder;
        }

        if (options.onChangePage) {
            this.onChangePage = options.onChangePage;
        }

        if (options.onChangePageSize) {
            this.onChangePageSize = options.onChangePageSize;
        }

        if (options.embed) {
            this.filter.embed = options.embed;
        }

        if (options.fields) {
            this.filter.fields = options.fields;
        }

        if (options.onTransformQueryParams) {
            this.onTransformQueryParams = options.onTransformQueryParams;
        }

        if (options.queryParamMap) {
            this.queryParamMap = options.queryParamMap;
        }

        if (options.ignoreQueryParams) {
            this.ignoreQueryParams = options.ignoreQueryParams;
        }

        if (options.disableUpdateQueryParams) {
            this.disableUpdateQueryParams = options.disableUpdateQueryParams;
        }

        if (options.onResetFilter) {
            this.onResetFilter = options.onResetFilter;
        }
    }

    @action
    async initialize(updateUrlParams = true) {
        this.updateFilter();
        return this._reloadCollection(updateUrlParams);
    }

    fetch = (updateUrlParams = true) => {
        this.changePage(1, updateUrlParams);
    };

    @action.bound changePage = (page, updateUrlParams = true) => {
        this.filter.pageNumber = page;

        if (this.onChangePage) {
            this.onChangePage(page);
        }

        return this._reloadCollection(updateUrlParams);
    };

    @action.bound changePageSize = (pageSize, updateUrlParams = true) => {
        this.filter.pageSize = pageSize;
        this.filter.pageNumber = 1;

        if (this.onChangePageSize) {
            this.onChangePageSize(pageSize);
        }

        return this._reloadCollection(updateUrlParams);
    };

    @action.bound changeOrder = (sort, updateUrlParams = true) => {
        let direction = sortDirection.asc;
        if (this.filter.orderBy === sort && this.filter.orderDirection === sortDirection.asc) {
            direction = sortDirection.desc;
        }
        this.filter.orderBy = sort;
        this.filter.orderDirection = this.filter.orderBy === null ? null : direction;
        if (this.onChangeOrder) {
            this.onChangeOrder({ sort, direction });
        }

        return this._reloadCollection(updateUrlParams);
    };

    @action.bound handleResponse = (response, updateUrlParams = false) => {
        this.filter.pageNumber = response.page;
        this.filter.pageSize = response.recordsPerPage;
        this.recordCount = response.totalRecords;
        this.totalPages = Math.ceil(this.recordCount / this.filter.pageSize);

        if (response.sort) {
            let params = response.sort.split('|');

            this.filter.orderBy = params[0];
            this.filter.orderDirection = params[1];
        }

        if (updateUrlParams) {
            this.updateUrlParams();
        }
    };

    getFilterUrlParams = () => {
        const {
            pageNumber,
            pageSize,
            search,
            orderBy,
            orderDirection,
            /* eslint-disable */
            embed,
            fields,
            /* eslint-enable */
            ...others
        } = this.filter;

        let sortSlug;
        if (orderBy) {
            sortSlug = orderBy + '|' + orderDirection;
        }

        return this.getValidQueryParams({
            page: pageNumber,
            rpp: pageSize,
            orderBy: sortSlug,
            search: search || undefined,
            ...others
        });
    };

    getValidQueryParams(queryParams) {
        return _.omitBy(queryParams, (param, key) => {
            const isEmpty = _.isUndefined(param) || _.isNull(param) || param === '';
            if (isEmpty) {
                return true;
            }

            return this.ignoreQueryParams ? _.some(this.ignoreQueryParams, (ignore) => ignore === key) : false;
        });
    }

    updateUrlParams = () => {
        if (this.disableUpdateQueryParams) return;

        const { routerStore } = this.rootStore;
        let queryParams = this.getFilterUrlParams();

        if (this.queryParamMap) {
            _.forOwn(queryParams, (value, key) => {
                const map = this.queryParamMap[key];
                if (map && map.toQuery) {
                    queryParams[key] = map.toQuery(value);
                }
            });
        }

        routerStore.setQueryParams(queryParams);
    };

    removeUrlParams = (paramsToRemove = []) => {
        const { routerStore } = this.rootStore;
        let queryParams = this.getFilterUrlParams();

        if (paramsToRemove.length == 0)
            routerStore.setQueryParams();
        else {
            paramsToRemove.forEach(param => {
                if (hasOwnProperty(queryParams, param)) {
                    queryParams[param] = undefined;
                }
            });

            routerStore.setQueryParams(queryParams);
        }

        function hasOwnProperty(obj, prop) {
            var proto = obj.__proto__ || obj.constructor.prototype;
            return (prop in obj) &&
                (!(prop in proto) || proto[prop] !== obj[prop]);
        }

    }

    updateFilter = (useDefault = false) => {
        if (useDefault) {
            this.filter.reset();
            return;
        }

        const {
            page,
            rpp,
            orderBy,
            search,
            ...others
        } = this.rootStore.routerStore.routerState.queryParams;

        this.filter.pageNumber = parseInt(page < 0 ? 1 : page) || this.filter.pageNumber;
        this.filter.pageSize = parseInt(rpp) || this.filter.pageSize;

        if (orderBy) {
            const params = orderBy.split('|');
            this.filter.orderBy = params[0];
            if (params.length > 1) {
                this.filter.orderDirection = params[1];
            }
        }

        if (search) {
            this.filter.search = search;
        }

        if (others) {
            const mapParams = withoutProperties(others, this.ignoreQueryParams);

            const evaluateQueryParam = (queryParamKey, queryParamValue, filterValue) => {
                if (this.queryParamMap) {
                    // custom mapping function for specified properties
                    const map = this.queryParamMap[queryParamKey];
                    if (map && map.fromQuery) {
                        return map.fromQuery(queryParamValue);
                    }
                }

                try {
                    if (Array.isArray(filterValue) && typeof queryParamValue === 'string') {
                        return [queryParamValue];
                    }

                    return eval(queryParamValue);
                } catch (ex) {
                    return queryParamValue;
                }
            };

            _.assignWith(this.filter, mapParams, (objValue, srcValue, key) => {
                return _.isUndefined(srcValue) ? objValue : evaluateQueryParam(key, srcValue, objValue);
            });
        }
    };

    @action.bound resetFilter(fetch = true) {
        this.filter.reset();

        if (this.onResetFilter) {
            this.onResetFilter(this.filter);
        }

        if (fetch)
            this.fetch();
    }

    _reloadCollection(updateUrlParams = true) {
        if (updateUrlParams) {
            this.updateUrlParams();
        }

        return this.fetchFunc(this.filter, { updateUrlParams });
    }
}

// function stringifyProperties(obj) {
//     _.each(Object.keys(obj), (key) => {
//         let property = obj[key];
//         let propertyType = typeof property;

//         if (propertyType !== 'undefined') {
//             if (typeof property === 'object') {
//                 return toString(property);
//             }

//             obj[key] = obj[key].toString();
//         }
//     });

//     return obj;
// }

function withoutProperties(obj, properties) {
    return _.omitBy(obj, (param, key) => {
        return !_.isUndefined(properties) && !_.isNull(obj) ? _.some(properties, (ignore) => ignore === key) : false;
    });
}

export default QueryUtility;
