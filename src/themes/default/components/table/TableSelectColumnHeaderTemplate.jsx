import React from 'react';
import { defaultTemplate } from 'core/hoc';
import { BasicCheckbox } from 'core/components';

export default defaultTemplate(({ tableStore }) => {
    const { allChecked, selectAllItems, hasSelectableItems } = tableStore;

    return (
        <BasicCheckbox
            id="headerCheckbox"
            checked={allChecked}
            onChange={e => selectAllItems(e)}
            disabled={!hasSelectableItems}
            classSuffix=" input--check--nolabel"
        />
    );
});
