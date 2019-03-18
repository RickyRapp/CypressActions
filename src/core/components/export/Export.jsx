import React from 'react';
import { action } from 'mobx';
import { ExportTemplate } from 'themes/components';
import { BaasicDropdownStore } from "core/stores";
import { ContributionListFilter } from 'modules/contribution/models';
import _ from 'lodash';

class Export extends React.Component {
    constructor(props) {
        super(props);

        this.saveData = (blob, fileName) => {
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
        var f = new ContributionListFilter();
        _.extend(f, this.props.queryUtility.filter)
        f.exportFields = _.map(this.exportFieldsDropdownStore.value, item => { return item.id });
        f.exportLimit = this.exportLimitDropdownStore.value.id;
        let response = await this.props.service.export(f);
        if (response) {
            let blob = new Blob([response.content], { type: `${response.contentType}; ${response.encoding}` });
            this.saveData(blob, response.fileName);
        }
        else {
            this.rootStore.notificationStore.error('Something gone wrong.');
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
