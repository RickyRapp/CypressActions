import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicDropdown } from 'core/components';
import _ from 'lodash';

function BookletDetailsRowTemplate({ item, certificateStatusDropdownStore, saveRowChanges, t }) {
    return (
        <tr>
            <td className="table__body--data">{item.code}</td>
            <td className="table__body--data">{item.barcode}</td>
            <td className="table__body--data">
                <input
                    type="checkbox"
                    checked={item.isActive ? true : false}
                    onChange={event => item.isActive = event.target.checked}
                />Is Active
            </td>
            <td className="table__body--data">
                <BaasicDropdown
                    store={certificateStatusDropdownStore}
                    onChangeOverride={event => item.certificateStatus = event}
                    valueOverride={item.certificateStatus}
                />
            </td>
            <td className="table__body--data">
                <input
                    className="input input--med input--text"
                    type="text" value={item.note}
                    onChange={event => item.note = event.target.value} />
            </td>
            <td className="table__body--data">
                <button
                    className="btn btn--sml btn--tertiary"
                    onClick={() =>
                        saveRowChanges(
                            {
                                id: item.id,
                                note: item.note,
                                certificateStatusId: item.certificateStatus.id,
                                isActive: item.isActive
                            }
                        )}>
                    {t('SAVE')}
                </button>
            </td>
        </tr>
    );
}

export default defaultTemplate(BookletDetailsRowTemplate);
