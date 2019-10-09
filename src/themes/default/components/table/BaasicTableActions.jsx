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
            items,
            actionsComponent,
            t
        } = this.props;

        if (actionsComponent) {
            const wrap = { component: actionsComponent };
            return (
                <wrap.component
                    actions={actions}
                    item={dataItem}
                    items={items}
                    t={t}
                />
            );
        }

        const iconItems = items || [
            {
                title: 'Edit',
                icon: 'icomoon icon-pencil-write',
                action: actions.onEdit
            },
            {
                title: 'Delete',
                icon: 'icomoon icon-bin',
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
            <td className='table__body--data right'>
                {_.map(iconItems, (item, idx) => {
                    return item.action ? (
                        <span
                            key={item.title}
                            className={`${item.icon} align--v--middle ${
                                idx !== 0 ? ' spc--left--sml ' : ''
                            }btn--grey`}
                            title={item.title}
                            onClick={() => item.action(dataItem)}
                        />
                    ) : null;
                })}
            </td>
        );
    }
}

export default CommandCell;
