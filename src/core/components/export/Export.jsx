import React from 'react';
import { action } from 'mobx';
import { ExportTemplate } from 'themes/components';
import { BaasicDropdownStore } from "core/stores";
import _ from 'lodash';

class Export extends React.Component {
    constructor(props) {
        super(props);

        this.saveData = (blob, fileName) => // does the same as FileSaver.js
        {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";

            var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        }

        this.getFilenameFromResponse = (contentDisposition) => {
            var filename = "";
            if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(contentDisposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                }
            }
            return filename;
        }

        let exportColumnsName = _.concat(props.additionalExportColumnsName, props.selectedExportColumnsName);

        this.exportColumns = [];
        for (let i = 0; i < exportColumnsName.length; i++) {
            const element = exportColumnsName[i];
            this.exportColumns.push({ id: element.toLocaleUpperCase(), name: element });
        }

        this.selectedExportColumns = [];
        for (let i = 0; i < props.selectedExportColumnsName.length; i++) {
            const element = props.selectedExportColumnsName[i];
            this.selectedExportColumns.push({ id: element.toLocaleUpperCase(), name: element });
        }

        this.exportFieldsDropdownStore = new BaasicDropdownStore(
            {
                multi: true,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Export Columns'
            },
            null,
            this.exportColumns
        );
        this.exportFieldsDropdownStore._value = this.selectedExportColumns;


        this.exportLimits = [
            { id: 10, name: 10 },
            { id: 50, name: 50 },
            { id: 100, name: 100 },
            { id: 1000, name: 1000 },
            { id: 10000, name: 10000 }
        ];

        this.exportLimitDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Export Limits'
            },
            null,
            this.exportLimits
        );
        this.exportLimitDropdownStore._value = { id: 50, name: 50 };
    }

    @action.bound async onExportClick() {
        let filter = this.props.queryUtility.filter;
        filter.exportFields = _.map(this.exportFieldsDropdownStore.value, item => { return item.id });
        filter.exportLimit = this.exportLimitDropdownStore.value.id;
        let response = await this.props.service.export(filter);
        if (response) {
            var blob = new Blob([response.data], { type: `${response.headers["content-type"]}; encoding=utf8` });
            let filename = this.getFilenameFromResponse(response.headers["content-disposition"])
            this.saveData(blob, filename);
        }
        else {
            this.rootStore.notifyErrorResponse('Something gone wrong.');
        }
    }

    render() {
        return <ExportTemplate
            exportFieldStore={this.exportFieldsDropdownStore}
            exportLimitStore={this.exportLimitDropdownStore}
            onClick={this.onExportClick}
        />
    }
}

export default Export;
