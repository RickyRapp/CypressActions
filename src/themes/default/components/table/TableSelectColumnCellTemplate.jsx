import React from 'react';
import _ from 'lodash';
import { defaultTemplate } from 'core/hoc';
import { BasicCheckbox } from 'core/components';

export default defaultTemplate(({ tableStore, dataItem, dataIndex }) => {
    const checked = _.some(tableStore.selectedItems, e => e.id === dataItem.id);
    return (
        <td>
            <BasicCheckbox
                id={dataIndex}
                checked={checked}
                onChange={() => {
                    const item = _.find(
                        tableStore.selectedItems,
                        e => e.id === dataItem.id
                    );
                    if (item) {
                        _.remove(tableStore.selectedItems, item);
                    } else {
                        tableStore.selectedItems.push(dataItem);
                    }

                    var allChecked = true;
                    _.each(tableStore.data, item => {
                        if (
                            _.findIndex(
                                tableStore.selectedItems,
                                e => e.id === item.id
                            ) === -1
                        ) {
                            allChecked = false;
                        }
                    });

                    tableStore.setGlobalCheck(allChecked);
                }}
            />
        </td>
    );
});
