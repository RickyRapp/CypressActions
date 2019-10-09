import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicTable, TableFilter, EmptyState } from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { ApplicationListLayout, Content } from 'core/layouts';

function RoleListTemplate({ listViewStore }) {
    const {
        tableLoading,
        tableStore,
        queryUtility
    } = listViewStore;

    return (
        <ApplicationListLayout store={listViewStore}>
            <Content  emptyRenderer={renderEmpty()} >
                <div className='spc--bottom--sml'>
                    <TableFilter queryUtility={queryUtility}/>
                </div>
                <BaasicTable
                    tableStore={tableStore}
                    loading={tableLoading}
                />
            </Content>
        </ApplicationListLayout>
    )
}

function renderEmpty() {
    return <EmptyState image={EmptyIcon} title='ROLE.LIST.EMPTY_STATE.TITLE' description='ROLE.LIST.EMPTY_STATE.DESCRIPTION' />
}

RoleListTemplate.propTypes = {
    listViewStore: PropTypes.object
};

export default defaultTemplate(RoleListTemplate);
