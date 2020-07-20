import React from 'react';
import { TableViewStore } from 'core/stores';
import PropTypes from 'prop-types';
import { SimpleBaasicTable, BaasicButton } from 'core/components'
import { defaultTemplate } from 'core/hoc';
import { isSome } from 'core/utils';

const CombinedGrantDetailTemplate = function ({ items, editGrant }) {
    const tableStore = new TableViewStore(null, {
        columns: [
            {
                key: 'donor.donorName',
                title: 'DONATION.LIST.COLUMNS.DONATION_TYPE_NAME_LABEL',
            },
            {
                key: 'amount',
                title: 'DONATION.LIST.COLUMNS.AMOUNT_LABEL',
                format: {
                    type: 'currency',
                    value: '$'
                },
            },
            {
                key: 'dateCreated',
                title: 'DONATION.LIST.COLUMNS.DATE_CREATED_LABEL',
                format: {
                    type: 'date',
                    value: 'short'
                }
            }
        ],
        actions: {
            onEdit: (item) => editGrant(item.donorId, item.id)
        },
    });

    tableStore.setData(items)

    return (
        <SimpleBaasicTable
            tableStore={tableStore}
            style={{ height: '300px' }}
            actionsComponent={renderActions}
        />
    )
};

CombinedGrantDetailTemplate.propTypes = {
    items: PropTypes.object.isRequired,
    editGrant: PropTypes.func.isRequired,
    t: PropTypes.func
};

function renderActions({ item, actions }) {
    if (!isSome(actions)) return null;

    const { onEdit } = actions;
    if (!isSome(onEdit)) return null;

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onEdit) ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='DONATION.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
            </div>
        </td>
    )
}

renderActions.propTypes = {
    item: PropTypes.array,
    actions: PropTypes.object,
    editGrant: PropTypes.func
};

export default defaultTemplate(CombinedGrantDetailTemplate);
