import React from 'react';
import { defaultTemplate } from 'core/hoc';
import { EmptyState } from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';

function ApplicationEmptyStateTemplate() {
    return (
        <EmptyState 
            title='APPLICATION_EDIT_LAYOUT.EMPTY_STATE_TITLE' 
            description='APPLICATION_EDIT_LAYOUT.EMPTY_STATE_DESCRIPTION'
            image={EmptyIcon}
        />
    )
}

export default defaultTemplate(ApplicationEmptyStateTemplate);