import React from 'react';
import _ from 'lodash';
import { isSome } from 'core/utils';
import { GridCell } from '@progress/kendo-react-grid';

class CommandCell extends GridCell {
    render() {
        const {
            rowType,
            dataItem,
            actions,
            actionsRender,
            items,
            actionsComponent,
            authorization,
            t
        } = this.props;

        if (actionsComponent) {
            const wrap = { component: actionsComponent };
            return (
                <wrap.component
                    actions={actions}
                    item={dataItem}
                    items={items}
                    authorization={authorization}
                    actionsRender={actionsRender}
                    t={t}
                />
            );
        }

        const iconItems = items || [
            {
                title: 'Edit',
                icon: 'u-icon u-icon--sml u-icon--edit',
                action: actions.onEdit
            },
            {
                title: 'Delete',
                icon: 'u-icon u-icon--sml u-icon--delete',
                action: actions.onDelete
            }
        ];
        if (!_.some(iconItems, i => isSome(i.action))) {
            return null;
        }

        if (rowType !== 'data') {
            return null;
        }

        return (
            <td className='right'>
                {_.map(iconItems, (item, idx) => {
                    return item.action ? (
                        <button key={idx} type="button" className="btn btn--icon" onClick={() => item.action(dataItem)}>
                            <i
                                className={`${item.icon} align--v--middle ${
                                    idx !== 0 ? ' spc--left--sml ' : ''
                                    }`}
                                title={item.title}

                            />
                        </button>
                    ) : null;
                })}
            </td>
        );
    }
}

export default CommandCell;
