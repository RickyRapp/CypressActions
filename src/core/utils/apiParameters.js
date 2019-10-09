import _ from 'lodash';

function FindParams(options) {
    if (_.isObject(options)) {
        _.extend(this, options);
        if (options.hasOwnProperty('orderBy') && options.hasOwnProperty('orderDirection') || options.hasOwnProperty('sort')) {
            if(options.hasOwnProperty('sort')) {
                this.sort = options.sort;
            } else {
                this.sort = options.orderBy ? options.orderBy + '|' + options.orderDirection : null;
            }
        }
        if (options.hasOwnProperty('search')) {
            this.searchQuery = options.search;
        }
        if (options.hasOwnProperty('pageNumber')) {
            this.page = options.pageNumber;
        }
        if (options.hasOwnProperty('pageSize')) {
            this.rpp = options.pageSize;
        }
    } else {
        this.searchQuery = options;
    }
}

function KeyParams(id, options, propName) {
    if (_.isObject(id)) {
        _.extend(this, id);
    } else {
        if (propName !== undefined) {
            this[propName] = id;
        } else {
            this['id'] = id;
        }
    }

    if (options !== undefined && _.isObject(options)) {
        _.extend(this, options);
    }
}

function findParams(options) {
    return new FindParams(options);
}

function getParams(id, options, propName) {
    return new KeyParams(id, options, propName);
}

function batchDeleteParams(data, idPropertyName = 'id') {
    let items = [];
    _.each(data, (item) => {
        if (_.isObject(item)) {
            items.push(item[idPropertyName]);
        }
    });

    return items;

}

export {
    findParams,
    getParams,
    batchDeleteParams
};
