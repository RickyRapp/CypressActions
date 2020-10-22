import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { GridColumn, GridToolbar, GridHeaderCell } from '@progress/kendo-react-grid';
import { BaasicTableActions, LanguageMetadata, FormatterResolver, BaasicButton, EmptyState } from 'core/components';
import { isSome } from 'core/utils';
import NoResults from 'themes/assets/img/result.svg';

function hasAction(actions) {
    return actions && (actions.onEdit || actions.onDelete);
}

function hasBatchAction(actions) {
    return actions && !_.isEmpty(actions);
}

const LocalizedCell = ({ onClick, className, dataItem, field, icon, format }) => {
    return (
        <td className={className} {...(onClick ? { onClick: () => onClick(dataItem, field) } : {})}>
            {icon && <i className={'icomoon icon-' + dataItem[icon] + ' spc--right--sml align--v--sub'} />}

            {_.isNil(format) ? (
                <LanguageMetadata item={dataItem} propertyName={field} />
            ) : (
                    <FormatterResolver item={dataItem} field={field} format={format} />
                )}
        </td>
    );
};

LocalizedCell.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    dataItem: PropTypes.object,
    field: PropTypes.any,
    icon: PropTypes.string,
    format: PropTypes.object,
};

function rowRender(trElement, gridRowProps) {
    const trProps = {
        className: `${trElement.props.className}${gridRowProps.dataItem.onClick ? ' c-pointer table--clickable' : ''}`,
    };
    return React.cloneElement(trElement, { ...trProps }, trElement.props.children);
}

function defaultRenderColumnsTemplate({ t, columns }) {
    return columns.map(
        (
            {
                key = null,
                title = null,
                cell = null,
                icon = null,
                onClick = null,
                innerColumns = null,
                format = null,
                className = '',
                showColumn = true,
                headerCell = null,
                ...otherProps
            },
            idx
        ) => {
            const defaultCell = cell
                ? props => React.createElement(cell, { ...props, ...otherProps, onClick, icon, format })
                : props => <LocalizedCell onClick={onClick} icon={icon} {...props} {...otherProps} format={format} />;
            return showColumn ? (
                <GridColumn
                    className={onClick ? `c-pointer table--clickable ${className || ''}` : ''}
                    key={key || idx}
                    field={key}
                    title={t(title)}
                    cell={innerColumns ? null : defaultCell}
                    headerCell={headerCell ? props => React.createElement(headerCell, { ...props, ...otherProps }) : null}
                    {...otherProps}
                >
                    {innerColumns ? defaultRenderColumnsTemplate({ t, columns: innerColumns }) : null}
                </GridColumn>
            ) : null;
        }
    );
}

function defaultRenderActionsTemplate({ actions, actionsComponent, actionsWidth, authorization, t }) {
    const actionCount = (actions ? actions.visible : null) || _.size(actions);

    return hasAction(actions) || actionsComponent ? (
        <GridColumn
            headerCell={() => (
                <GridHeaderCell
                    render={() => <a className="k-link k-no-sortable flex--bottom">{t('GRID.ACTIONS_COLUMN')}</a>}
                />
            )}
            groupable={false}
            sortable={false}
            filterable={false}
            resizable={false}
            width={actionsWidth ? actionsWidth : 30 * actionCount}
            cell={cellProps => (
                <BaasicTableActions
                    {...cellProps}
                    actions={actions}
                    authorization={authorization}
                    actionsComponent={actionsComponent}
                    t={t}
                />
            )}
        />
    ) : null;
}

function defaultRenderBatchActionsToolbarTemplate(tableStore, authorization, batchActionsComponent) {
    const {
        isBatchSelect,
        config: { batchActions },
        hasSelectedItems,
        hasDirtyItems,
        selectedItems,
        resetGridItems,
        data,
    } = tableStore;
    const { onBatchCreate, onBatchDelete, onBatchUpdate } = batchActions;

    return hasBatchAction(batchActions) && batchActionsComponent ? (
        <GridToolbar>{batchActionsComponent({ tableStore, authorization, batchActions })}</GridToolbar>
    ) : (
            <GridToolbar>
                <div className="sticky--left">
                    {isSome(onBatchCreate) && authorization.edit && (
                        <BaasicButton
                            authorization={authorization ? authorization.edit : null}
                            className="icon-floppy-disk btn btn--link spc--right--tny"
                            disabled={!hasSelectedItems}
                            icon="u-icon u-icon--edit u-icon--xxmed"
                            onlyIcon={true}
                            onClick={() => onBatchCreate(selectedItems)}
                        />
                    )}
                    {isSome(onBatchUpdate) && authorization.edit && (
                        <React.Fragment>
                            <BaasicButton
                                authorization={authorization ? authorization.edit : null}
                                className="icon-floppy-disk btn btn--link spc--right--tny"
                                disabled={!hasDirtyItems}
                                icon="u-icon u-icon--edit u-icon--xxmed"
                                onlyIcon={true}
                                onClick={() => onBatchUpdate(data.toJS())}
                            />
                            {hasDirtyItems && (
                                <BaasicButton
                                    className="btn btn--link spc--right--tny"
                                    onlyIcon={true}
                                    icon="u-icon u-icon--edit u-icon--xxmed"
                                    onClick={() => resetGridItems()}
                                />
                            )}
                        </React.Fragment>
                    )}
                    {isSome(onBatchDelete) && isBatchSelect && (
                        <BaasicButton
                            authorization={authorization ? authorization.delete : null}
                            className="btn btn--link btn--link--primary icon-bin align--v--middle"
                            disabled={!hasSelectedItems}
                            icon="u-icon u-icon--delete u-icon--xxmed"
                            onlyIcon={true}
                            label="delete"
                            onClick={() => onBatchDelete(selectedItems.toJS())}
                        ></BaasicButton>
                    )}
                </div>
            </GridToolbar>
        );
}

function defaultRenderSelectableColumnTemplate(data) {
    const value = data.length ? !data.some(dataItem => dataItem.selected === false) : false;
    return <GridColumn field="selected" headerSelectionValue={value} />;
}

function defaultRenderNoRecordsTemplate(noRecordsComponent, noRecordsState = {}) {
    if (noRecordsComponent) return noRecordsComponent;

    const {
        image = NoResults,
        title = 'GRID.NO_RECORDS.TITLE',
        description = 'GRID.NO_RECORDS.DESCRIPTION',
        className = '',
    } = noRecordsState;
    return <EmptyState image={image} title={title} description={description} className={className} />;
}

function defaultRenderEmptyStateTemplate(emptyStateComponent, emptyState = {}) {
    if (emptyStateComponent) return emptyStateComponent;

    const {
        image = NoResults,
        title = 'GRID.EMPTY_STATE.TITLE',
        description = 'GRID.EMPTY_STATE.DESCRIPTION',
        className = 'u-mar--top--xxlrg',
    } = emptyState;
    return <EmptyState image={image} title={title} description={description} className={className} />;
}

defaultRenderActionsTemplate.propTypes = {
    actions: PropTypes.object,
    actionsComponent: PropTypes.array,
    actionsWidth: PropTypes.number,
    authorization: PropTypes.any,
    t: PropTypes.func,
};

defaultRenderBatchActionsToolbarTemplate.propTypes = {
    tableStore: PropTypes.object,
    authorization: PropTypes.any,
    t: PropTypes.func,
};

defaultRenderSelectableColumnTemplate.propTypes = {
    data: PropTypes.object,
};

export {
    defaultRenderActionsTemplate,
    defaultRenderColumnsTemplate,
    defaultRenderEmptyStateTemplate,
    defaultRenderBatchActionsToolbarTemplate,
    defaultRenderSelectableColumnTemplate,
    defaultRenderNoRecordsTemplate,
    rowRender,
};
