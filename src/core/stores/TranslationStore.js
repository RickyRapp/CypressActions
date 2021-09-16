import * as _ from 'lodash';
import {observable, action, runInAction } from 'mobx';
import {BaseViewStore, LoaderStore, TableViewStore} from 'core/stores';
import {FormBase, LocalizationTableRow} from 'core/components';
import {QueryUtility} from 'core/utils';

const DEFAULT_LANGUAGE_CULTURE = 'en-US';

class TranslationStore extends BaseViewStore {
    @observable.ref languages = [];
    @observable item = null;
    initialized = observable.box(false);
    form = null;
    visible = true;

    constructor(rootStore, fields, item, loaderStore = new LoaderStore()) {
        super(rootStore);

        if (!fields || fields.length === 0) {
            this.visible = false;
            return;
        }

        this.item = item;
        this.form = new FormBase({}, {});

        this.fields = _.isArray(fields) ? fields : _.map(fields, (f, key) => {
            return { name: key, ...f }
        });

        this.fields = _.filter(this.fields, f => f.name !== 'languageMetadata');
        this.loaderStore = loaderStore;

        const queryUtility = new QueryUtility(rootStore, ({ orderBy, orderDirection }) => {
                if (orderBy) {
                    const ordered = _.orderBy(this.tableStore.data, (item) => _.get(item, orderBy), [orderDirection]);
                    this.tableStore.setData(ordered);
                }
            },
            {
                disableUpdateQueryParams: true
            }
        );

        const columns = [
            {
                key: 'language.name',
                title: 'LANGUAGE_EDIT_LAYOUT.LANGUAGE_COLUMN',
                editable: false
            },
            ..._.map(this.fields, (field) => ({
                key: field.name,
                title: field.$label
            }))
        ];

        this.tableStore = new TableViewStore(queryUtility, {
            columns: _.map(columns, (column) => ({ ...column, cell: LocalizationTableRow })),
            actions: null,
            disablePaging: true,
            editField: 'inEdit',
            onItemChange: ({ dataItem, field, value }) => {
                dataItem[field] = value;
                this.tableStore.setData([...this.tableStore.data]);
            }
        });

        this.fetch([
            this.initialize()
        ]);
    }

    get propertyNames() {
        return this.fields
            ? _.filter(
                _.map(this.fields, f => {
                    if (f.name !== 'languageMetadata') {
                        return f.name;
                    }

                    return null;
                }, p => p !== null)
            ) : null
    }

    @action.bound update(item) {
        this.item = item;

        if (this.initialized.get()) {
            this.bindTable();
        }
    }

    @action.bound
    async initialize() {
        await this.getLanguages();

        this.form.add({
            key: 'languageMetadata',
            fields: createMetadataFields(this.languages, this.fields, 'culture')
        });

        this.bindTable();

        this.initialized.set(true);
    }

    @action.bound
    async getLanguages() {
        const response = await this.rootStore.application.lookup.languageModule.languageStore.find({
            pageNumber: 1,
            pageSize: 1000
        });

        runInAction(() => {
            this.languages = response.item;
        });
    }

    @action.bound
    bindTable() {
        const data = [];
        if (this.item) {
            this.form.update(this.item);
        }

        this.applyMetadata(this.item);

        _.each(this.languages, (language) => {
            const isDefaultLang = language.culture === DEFAULT_LANGUAGE_CULTURE;

            let dataFields = {};

            this.form.each((field) => {
                if (field.key === language.culture) {
                    field.fields.forEach((i) => {
                        dataFields[i.key] = i;
                    });
                }
            });

            data.push({
                language: language,
                ...dataFields,
                inEdit: !isDefaultLang,
            });
        });

        this.tableStore.setData({
            item: _.orderBy(data, 'inEdit', 'asc'),
            totalRecords: data.length,
            page: 1,
        });
    }

    applyMetadata(item) {
        if (_.isNil(item)) return null;

        const pureItem = getWithProperties(item, this.propertyNames);
        this.form.each((field) => {
            if (field.key === DEFAULT_LANGUAGE_CULTURE && !_.isNil(pureItem))
                field.update(pureItem);
        });
        item.languageMetadata = this.form.values().languageMetadata;

        return item.languageMetadata;
    }
}

function getWithProperties(obj, properties) {
    const filtered = {};
    _.forOwn(obj, (val, key) => {
        if (_.some(properties, p => p === key)) {
            filtered[key] = val;
        }
    });
    return filtered;
}

function createMetadataFields(languages, fields, key) {
    const metadataFields = [];

    _.each(languages, (language) => {
        const languageKey = language[key];
        const metadataValue = [];

        _.each(fields, (field) => {
            metadataValue.push({
                name: field.name,
                placeholder: field.$placeholder,
                label: field.$label,
                value: ''
            });
        });

        metadataFields.push({
            name: languageKey,
            fields: metadataValue
        })
    });

    return metadataFields;
}

export default TranslationStore;
