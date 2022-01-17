import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicTable } from 'core/components';


const ReconcileCashedPreviewTemplate = function ({ ReconcileCashedPreviewViewStore }){

    return (
        <div className='container'>
            OK
        </div>
        )
};

ReconcileCashedPreviewTemplate.propTypes = {
    modalParams: PropTypes.object.isRequired,
    ReconcileCashedPreviewViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ReconcileCashedPreviewTemplate);