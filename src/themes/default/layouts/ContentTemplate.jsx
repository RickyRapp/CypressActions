import React from 'react';
import { defaultTemplate } from 'core/hoc';
import { Loader, ApplicationEmptyState } from 'core/components';

function ContentTemplate({
    loading = false,
    loaderRenderer = () => <Loader />, // eslint-disable-line
    emptyRenderer = () => <ApplicationEmptyState />, // eslint-disable-line
    empty = false,
    children
}) {

    if (loading) return render(loaderRenderer);
    if (emptyRenderer == null || !empty) return children;
    return render(emptyRenderer);
}

function render(content) {
    return content ? (typeof content === 'function' ? content() : content) : null;
}

export default defaultTemplate(ContentTemplate);
