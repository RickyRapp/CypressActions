import _ from 'lodash';
import { action, computed } from 'mobx';
import { BaasicDropdownStore } from 'core/stores';
import { saveAs } from '@progress/kendo-file-saver';
import ExportService from 'common/services/ExportService';
import { LoaderStore } from 'core/stores';

class ExportViewStore {
    loaderStore = new LoaderStore();

    constructor(rootStore, componentProps) { // eslint-disable-line
        const { config } = componentProps;

        const exportTypes = [
            { id: 1, name: 'CSV', key: 'csv', extension: '.csv', contentType: 'text/csv' },
            { id: 2, name: 'Excel', key: 'excel', extension: '.xlsx', contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
            { id: 4, name: 'PDF', key: 'pdf', extension: '.pdf', contentType: 'application/pdf' }
        ];
        this.exportTypeStore = new BaasicDropdownStore(
            {
                placeholder: 'CHOOSE_TYPE_EXPORT'
            },
            null,
            exportTypes);
        this.exportTypeStore.setValue(_.find(this.exportTypeStore.items, { id: 1 }))

        const exportLimits = [
            { id: 10, name: '10' },
            { id: 50, name: '50' },
            { id: 100, name: '100' },
            { id: 1000, name: '1000' },
            { id: 10000, name: '10000' }
        ];
        this.exportLimitStore = new BaasicDropdownStore(
            {
                placeholder: 'CHOOSE_LIMIT_EXPORT'
            },
            null,
            exportLimits);
        this.exportLimitStore.setValue(_.find(this.exportLimitStore.items, { id: 10 }))
        const availableColumns = _.filter(config.columns, { visible: true });
        this.exportFieldStore = new BaasicDropdownStore(
            {
                multi: true,
                placeholder: 'CHOOSE_EXPORT_COLUMNS'
            },
            null,
            _.map(availableColumns, function (c) { return { id: c.id, key: c.key, name: c.title } })
        );
        this.exportFieldStore.setValue(_.map(_.filter(availableColumns, { selected: true }), function (c) { return { id: c.id, key: c.key, name: c.title } }));
        this.queryUtility = config.queryUtility;
        this.fileName = config.fileName;
        this.exportUrlFunc = config.exportUrlFunc;
        this.rootStore = rootStore;
    }

    @action.bound
    async onExportClick() {
        const exportType = this.exportTypeStore.value;
        if (exportType.key === 'pdf') {
            this.rootStore.notificationStore.warning("This export is not yet implemented!");
            return;
        }

        this.setLoading(true);
        const exportFieldNames = _.map(this.exportFieldStore.value, item => { return item.key });
        const exportLimit = this.exportLimitStore.value;
        const exportUrl = this.exportUrlFunc({ exportFields: exportFieldNames, exportLimit: exportLimit.id, exportType: exportType.id });
        const service = new ExportService(this.rootStore.application.baasic.apiClient)
        try {
            let response = await service.export(exportUrl, exportType.contentType);
            this.fileName += exportType.extension;
            saveAs(response.data, this.fileName);
        } catch (err) {
            this.rootStore.notificationStore.error("Error", err);
        }
        finally {
            this.setLoading(false);
        }
    }

    @computed get loading() {
        return this.loaderStore.loading;
    }

    @action.bound
    setLoading(value) {
        if (value) {
            this.loaderStore.suspend();
        } else {
            this.loaderStore.resume();
        }
    }
}

export default ExportViewStore;