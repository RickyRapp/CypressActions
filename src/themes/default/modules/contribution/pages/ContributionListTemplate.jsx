import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter, InputFilter } from 'core/components';
import { isSome } from 'core/utils';
import { ListLayout } from 'core/layouts';
import moment from 'moment';

function ContributionListTemplate({ contributionListViewStore }) {
    const {
        queryUtility,
        loaderStore,
        tableStore,
        routes: { create }
    } = contributionListViewStore;

    return (
        <ListLayout onCreate={create} loading={loaderStore.loading}>
            <div className="spc--bottom--sml">
                <TableFilter queryUtility={queryUtility}>
                    <div className="pos--rel display--ib  spc--right--sml">
                        <InputFilter
                            queryUtility={queryUtility}
                            name="firstName"
                            placeholder="First Name"
                        />
                    </div>
                    <div className="pos--rel display--ib  spc--right--sml">
                        <InputFilter
                            queryUtility={queryUtility}
                            name="lastName"
                            placeholder="Last Name"
                        />
                    </div>
                </TableFilter>
            </div>
            <BaasicTable
                tableStore={tableStore}
                loading={loaderStore.loading}
                actionsComponent={renderActions}
            />
        </ListLayout>
    );
}

function renderActions({ item, actions, actionsConfig }) {
    if (!isSome(actions)) return null;

    let { onEdit, onDetails } = actions;
    if (!isSome(onEdit) && !isSome(onDetails)) {
        return null;
    }

    const { onEditConfig } = actionsConfig;

    let editTitle = 'edit'
    if (isSome(onEditConfig)) {
        if (!onEditConfig.permissions.contributionEmployeeUpdate) {
            if (onEditConfig.permissions.contributionUpdate) {
                if (moment().local().isAfter(moment.utc(item.dateCreated, 'YYYY-MM-DD HH:mm:ss').local().add(onEditConfig.days, 'days'))) {
                    onEdit = null;
                }
                else {
                    editTitle += ' until ' + moment.utc(item.dateCreated, 'YYYY-MM-DD HH:mm:ss').local().add(onEditConfig.days, 'days').format('HH:mm:ss');
                }
            }
            else {
                onEdit = null;
            }
        }
    }

    return (
        <td className="table__body--data right">
            {isSome(onEdit) ? (
                <i
                    className="material-icons align--v--middle"
                    onClick={() => onEdit(item)}
                >
                    {editTitle}
                </i>
            ) : null}
            {isSome(onDetails) ? (
                <i
                    className="material-icons align--v--middle"
                    onClick={() => onDetails(item)}
                >
                    details
          </i>
            ) : null}
        </td>
    );
}

export default defaultTemplate(ContributionListTemplate);

// const { onEditByTime } = actions;
// if (!isSome(onEditByTime)) {
//     return null;
// }
// // else if (moment().local().isAfter(moment.utc(item.dateCreated, 'YYYY-MM-DD HH:mm:ss').local().add(15, 'minutes'))) {
// //     return (
// //         <td className="table__body--data right">
// //             <i className="material-icons align--v--middle">
// //             </i>
// //         </td>
// //     )
// // }

// return (
//     <td className="table__body--data right">
//         <i className="material-icons align--v--middle" onClick={() => onEditByTime(item)} >
//             edit until {moment.utc(item.dateCreated, 'YYYY-MM-DD HH:mm:ss').local().add(15, 'minutes').format('HH:mm:ss')}
//         </i>
//     </td>
// );
// }
