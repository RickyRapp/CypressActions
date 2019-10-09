import React from 'react';
import PropTypes from 'prop-types';
import {defaultTemplate} from 'core/hoc';
import {BaasicTable} from 'core/components';

const TranslationTemplate = function ({ store, className }) {
    const { loaderStore, tableStore, visible } = store;
    if (!visible) return null;

    return (
        <div className={className?className:''}>
            <BaasicTable loading={loaderStore.loading} tableStore={tableStore} actionsComponent={null}/>
        </div>
    )
};

TranslationTemplate.propTypes = {
    store: PropTypes.object.isRequired,
    t: PropTypes.any,
    className: PropTypes.string
};

export default defaultTemplate(TranslationTemplate);
