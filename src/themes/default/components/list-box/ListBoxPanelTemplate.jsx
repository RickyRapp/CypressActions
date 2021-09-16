import React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import { defaultTemplate } from 'core/hoc';
import { Loader } from 'core/components';

const ListBoxPanelCellTemplate = defaultTemplate(function ListBoxPanelCell({ dataItem, field, showLoading }) {
    const value = dataItem[field];
    return (
        <td className={dataItem.selected ? 'selected' : '' }>
        {
            (value === null) ? '' : dataItem[field].toString()
        }
            {showLoading ? <Loader /> : '' }
        </td>
    );
});

function ListBoxPanelTemplate({ store, t }) {
    const {
        items,
        paging,
        onPageChange,
        onSelect,
        loading,
        options
    } = store;

    return (
        <div onMouseDown={e => e.preventDefault() /* prevents browser text selection */}>
            <Grid
                data={items.slice(paging.skip, paging.skip + paging.pageSize)}
                pageSize={paging.pageSize}
                total={paging.total}
                skip={paging.skip}
                onPageChange={onPageChange}
                onRowClick={onSelect}
                scrollable={'virtual'}
                rowHeight={options.rowHeight}
                style={{ height: options.tableHeight.toString() + 'px' }}
            >
                {
                    _.map(options.columns, (column) =>
                        <Column key={column.key}
                                field={column.key}
                                title={t(column.title) || 'Title'}
                                cell={(props) => <ListBoxPanelCellTemplate {...props} showLoading={loading && props.dataIndex === items.length} />}
                        />
                    )
                }
            </Grid>
        </div>
    )
}

ListBoxPanelTemplate.propTypes = {
    store: PropTypes.object,
    t: PropTypes.func
}

export default defaultTemplate(ListBoxPanelTemplate);
