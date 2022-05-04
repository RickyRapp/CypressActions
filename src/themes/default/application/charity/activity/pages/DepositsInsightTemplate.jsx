import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Content } from 'core/layouts';
import { TableFilter, BaasicDropdown, BaasicTableWithRowDetails, FormatterResolver } from 'core/components';


const DepositsInsightTemplate = function ({ depositsInsightViewStore, t }) {
    const {
    } = depositsInsightViewStore;
    return (
        <Content>
                <div className="card--tertiary card--med u-mar--bottom--sml">
                    
                </div>
        </Content>
    )
};

DepositsInsightTemplate.propTypes = {
    depositsInsightViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(DepositsInsightTemplate);