import React from 'react';
import _ from 'lodash';
import { GridColumn, GridToolbar, GridHeaderCell } from '@progress/kendo-react-grid';
import { PropTypes } from 'prop-types';
import { BaasicTableActions, LanguageMetadata, FormatterResolver, BaasicButton } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { isSome } from 'core/utils';

function hasAction(actions) {
    return actions && (actions.onEdit || actions.onDelete);
}

const LocalizedCell = defaultTemplate(({ onClick, className, dataItem, field, icon, format }) => {
    return (
        <td className={className} {...(onClick ? { onClick: () => onClick(dataItem, field) } : {})}>
            {icon && <i className={"icomoon icon-" + dataItem[icon] + " spc--right--sml align--v--sub"} />}

            {
                _.isNil(format)
                    ? <LanguageMetadata item={dataItem} propertyName={field} />
                    : <FormatterResolver item={dataItem} field={field} format={format} />
            }
        </td>
    )
});

function defaultRenderColumnsTemplate({ t, columns }) {
    return columns.map(({ key = null, title = null, cell = null, icon = null, onClick = null, innerColumns = null, format, ...otherProps }, idx) => {
        const defaultCell = cell ? cell : (props) => <LocalizedCell onClick={onClick} icon={icon} {...props}
            format={format} />;
        return <GridColumn
            className={onClick ? "c-pointer table--clickable" : ""}
            key={key || idx}
            field={key}
            title={t(title)}
            cell={innerColumns ? null : defaultCell}
            {...otherProps}
        >
            {innerColumns ? defaultRenderColumnsTemplate({ t, columns: innerColumns }) : null}
        </GridColumn>
    }
    );
}

function defaultRenderActionsTemplate({ actions, actionsComponent, authorization, t }) {
    const actionCount = (actions ? actions.visible : null) || _.size(actions);

    return hasAction(actions) || actionsComponent ?
        <GridColumn
            headerCell={() => <GridHeaderCell
                render={() => <a className="k-link type--right">{t('GRID.ACTIONS_COLUMN')}</a>} />}
            groupable={false}
            sortable={false}
            filterable={false}
            resizable={false}
            width={30 * actionCount}
            cell={(cellProps) => <BaasicTableActions {...cellProps} actions={actions} authorization={authorization}
                actionsComponent={actionsComponent} t={t} />}
        /> : null;
}

function defaultRenderBatchActionsToolbarTemplate(tableStore, authorization) {
    const { isBatchSelect, config: { batchActions }, hasSelectedItems, hasDirtyItems, selectedItems, resetGridItems, data } = tableStore;
    const { onBatchDelete, onBatchUpdate } = batchActions;
    if (!isSome(onBatchDelete) && !isSome(onBatchUpdate)) {
        return null;
    }

    return (
        <GridToolbar>
            <div className="sticky--left">
                {isSome(onBatchUpdate) && authorization.update && (
                    <React.Fragment>
                        <BaasicButton
                            authorization={authorization ? authorization.update : null}
                            className="icon-floppy-disk btn btn--icon spc--right--tny"
                            disabled={!hasDirtyItems}
                            icon='update'
                            onlyIcon={true}
                            onClick={() => onBatchUpdate(data.toJS())}>
                        </BaasicButton>
                        {hasDirtyItems && (
                            <BaasicButton
                                className="btn btn--icon spc--right--tny"
                                onlyIcon={true}
                                icon='clear'
                                onClick={() => resetGridItems()}>
                            </BaasicButton>
                        )}
                    </React.Fragment>
                )}
                {isSome(onBatchDelete) && isBatchSelect && (
                    <BaasicButton
                        authorization={authorization ? authorization.delete : null}
                        className="btn btn--icon btn--icon--primary icon-bin align--v--middle"
                        disabled={!hasSelectedItems}
                        icon='delete'
                        onlyIcon={true}
                        label='delete'
                        onClick={() => onBatchDelete(selectedItems.toJS())}>
                    </BaasicButton>
                )}
            </div>
        </GridToolbar>
    );
}

function defaultRenderNoRecordsTemplate(noRecordsComponent) {
    if (!noRecordsComponent) return 'No records available';

    return noRecordsComponent;
}

defaultRenderActionsTemplate.propTypes = {
    actions: PropTypes.object,
    actionsComponent: PropTypes.array,
    authorization: PropTypes.any,
    t: PropTypes.func
}

defaultRenderBatchActionsToolbarTemplate.propTypes = {
    tableStore: PropTypes.object,
    authorization: PropTypes.any,
    t: PropTypes.func
}

export {
    defaultRenderActionsTemplate,
    defaultRenderColumnsTemplate,
    defaultRenderBatchActionsToolbarTemplate,
    defaultRenderNoRecordsTemplate
}