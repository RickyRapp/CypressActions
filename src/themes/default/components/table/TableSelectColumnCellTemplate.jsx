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
                onChange={() => tableStore.selectItem(dataItem)}
                disabled={dataItem.disabled}
                classSuffix=" input--check--nolabel"
            />
        </td>
    );
});
