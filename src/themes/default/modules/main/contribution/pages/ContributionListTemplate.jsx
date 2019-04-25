import React from 'react';
import { defaultTemplate, isSome } from 'core/utils';
import { BaasicTable, TableFilter, Export } from 'core/components';
import { ListLayout } from 'core/layouts';
import { ListFilterTemplate } from 'themes/modules/common/contribution/components';
import moment from 'moment';
import _ from 'lodash';

function ContributionListTemplate({ contributionListViewStore }) {
    const {
        queryUtility,
        loaderStore,
        tableStore,
        loaded,
        routes: { create },
        contributionStatusDropdownStore,
        paymentTypeDropdownStore,
        contributionService,
        selectedExportColumnsName,
        additionalExportColumnsName,
    } = contributionListViewStore;

    return (
        <React.Fragment>
            {loaded &&
                <React.Fragment>
                    <ListLayout onCreate={create} loading={loaderStore.loading}>
                        <div className="spc--bottom--sml">
                            <TableFilter queryUtility={queryUtility}>
                                <div className="f-row">
                                    <ListFilterTemplate
                                        queryUtility={queryUtility}
                                        paymentTypeDropdownStore={paymentTypeDropdownStore}
                                        contributionStatusDropdownStore={contributionStatusDropdownStore} />
                                </div>
                            </TableFilter>
                            <Export
                                queryUtility={queryUtility}
                                selectedExportColumnsName={selectedExportColumnsName}
                                additionalExportColumnsName={additionalExportColumnsName}
                                service={contributionService}
                            />
                        </div>
                        <BaasicTable
                            tableStore={tableStore}
                            loading={loaderStore.loading}
                            actionsComponent={renderActions}
                        />
                    </ListLayout>
                </React.Fragment>}
        </React.Fragment>
    );
}

function renderActions({ item, actions, actionsConfig }) {
    if (!isSome(actions))
        return null;

    let { onEdit, onDetails } = actions;
    if (!isSome(onEdit) && !isSome(onDetails))
        return null;

    const { onEditConfig } = actionsConfig;

    //edit config
    let editTitle = 'edit' // default
    if (isSome(onEditConfig)) {
        if (onEditConfig.editTitle) {
            editTitle = onEditConfig.editTitle;
        }

        if (onEditConfig.minutes) {
            if (moment().local().isAfter(moment.utc(item.dateCreated, 'YYYY-MM-DD HH:mm:ss').local().add(onEditConfig.minutes, 'minutes'))) {
                onEdit = null;
            }
            else {
                editTitle += ' until ' + moment.utc(item.dateCreated, 'YYYY-MM-DD HH:mm:ss').local().add(onEditConfig.minutes, 'minutes').format('HH:mm:ss');
            }
        }
        if (onEditConfig.statuses) {
            if (!_.includes(onEditConfig.statuses, item.contributionStatusId)) {
                onEdit = null
            }
        }
    }
    else {
        onEdit = null;

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
