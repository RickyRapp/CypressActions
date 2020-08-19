import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicDropdown,
    BaasicButton,
    BasicCheckbox
} from 'core/components';

function BookletEditRowTemplate({
    item,
    certificateStatusDropdownStore,
    saveRowChanges,
    onRowStatusChange,
    isMixedBooklet
}) {

    return (
        <tr>
            <td className="table__body--data">{item.code}</td>
            {isMixedBooklet && <td className="table__body--data">{item.denominationType.name}</td>}
            <td className="table__body--data">{item.barcode}</td>
            <td className="table__body--data">
                <BasicCheckbox
                    id={item.id}
                    checked={item.isActive}
                    onChange={(e) => item.isActive = e.target.checked}
                    label='BOOKLET.EDIT.BUTTON.IS_ACTIVE'
                />
            </td>
            <td className="table__body--data">
                <BaasicDropdown
                    store={certificateStatusDropdownStore}
                    value={item.certificateStatus}
                    onChange={(e) => onRowStatusChange(e, item)}
                />
            </td>
            <td className="table__body--data">
                <input
                    className="input input--med input--text"
                    type="text"
                    value={item.note}
                    onChange={event => item.note = event.target.value} />
            </td>
            <td className="table__body--data">
                <BaasicButton
                    className="btn btn--base btn--primary btn--sml"
                    label='BOOKLET.EDIT.BUTTON.SAVE_ROW_CHANGES'
                    onClick={() =>
                        saveRowChanges(
                            {
                                id: item.id,
                                note: item.note,
                                certificateStatusId: item.certificateStatus.id,
                                isActive: item.isActive
                            }
                        )}
                />
            </td>
        </tr>
    );
}

BookletEditRowTemplate.propTypes = {
    item: PropTypes.object.isRequired,
    certificateStatusDropdownStore: PropTypes.object.isRequired,
    saveRowChanges: PropTypes.func.isRequired,
    onRowStatusChange: PropTypes.func.isRequired,
    isMixedBooklet: PropTypes.bool
};

export default defaultTemplate(BookletEditRowTemplate);
