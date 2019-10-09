import React from 'react';

import _ from 'lodash';
import PropTypes from 'prop-types';

import { ListLayout, PageHeader } from 'core/layouts';
import { BaasicDropdown } from 'core/components';
import { defaultTemplate } from 'core/hoc';

function ListSelectLayoutTemplate({ 
    dropdownStore, 
    children, 
    t, 
    loading,
    hidesContent = true, 
    emptyComponent, 
    emptyMessage = 'LIST_SELECT_LAYOUT.EMPTY_MESSAGE'
}) {
    const isLoading = !_.isNil(loading) ? loading : dropdownStore.loading;

    return (
        <ListLayout loading={isLoading}>
            <PageHeader>
                <BaasicDropdown className='input--dropdown' store={dropdownStore} />
            </PageHeader>
            {
                (!hidesContent || dropdownStore.value) ? 
                    (typeof children === 'function' ? children() : children) : 
                    (emptyComponent || <div>{t(emptyMessage)}</div>)
            }
        </ListLayout>
    )
}

ListSelectLayoutTemplate.propTypes = {
    dropdownStore: PropTypes.object,
    loading: PropTypes.bool,
    hidesContent: PropTypes.bool,
    emptyComponent: PropTypes.any,
    emptyMessage: PropTypes.string,
    children: PropTypes.any,
    t: PropTypes.func,    
 };

export default defaultTemplate(ListSelectLayoutTemplate);