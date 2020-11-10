import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicDropdown,
    BaasicButton,
    BasicCheckbox
} from 'core/components';
import { BaasicDropdownStore } from 'core/stores';

function CertificateEditRowTemplate({
    item,
    saveRowChanges,
    isMixedBooklet,
    certificateStatuses
}) {

    const certificateStatusDropdownStore = new BaasicDropdownStore(null, {
        fetchFunc: async () => {
            return certificateStatuses;
        },
        onChange: async (value) => {
            item.certificateStatus = certificateStatuses.find(c => c.id === value)
        }
    });

    return (
        <tr>
            <td className="">{item.code}</td>
            {isMixedBooklet && <td className="">{item.denominationType.name}</td>}
            <td className="">{item.barcode}</td>
            <td className="">
                <BasicCheckbox
                    id={item.id}
                    checked={item.isActive}
                    onChange={(e) => item.isActive = e.target.checked}
                    label='BOOKLET.EDIT.BUTTON.IS_ACTIVE'
                />
            </td>
            <td className="">
                <BaasicDropdown
                    store={certificateStatusDropdownStore}
                    value={item.certificateStatus}
                />
            </td>
            <td className="">
                <input
                    className="input input--med input--text"
                    type="text"
                    value={item.note || ''}
                    onChange={event => item.note = event.target.value} />
            </td>
            <td className="">
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

CertificateEditRowTemplate.propTypes = {
    item: PropTypes.object.isRequired,
    certificateStatuses: PropTypes.any.isRequired,
    saveRowChanges: PropTypes.func.isRequired,
    onRowStatusChange: PropTypes.func.isRequired,
    isMixedBooklet: PropTypes.bool
};

export default defaultTemplate(CertificateEditRowTemplate);
