import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { SearchFilter } from 'core/components';
import _ from 'lodash';

const TableFilterTemplate = function (props) {
    const { queryUtility, filterStore, t, children, renderAdditionalComponents } = props;
    const clearVisible = (children != null || React.Children.count(children) > 0) || props.showClear;
    return (
        <React.Fragment>
            <div className="row">
                {renderFilter(filterStore, queryUtility, children, t)}
                <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml col--v--center ">
                    <SearchFilter
                        className='input input--sml input--search'
                        queryUtility={queryUtility}
                        clearVisible={clearVisible}
                    />
                </div>
                {_.isFunction(renderAdditionalComponents) ? renderAdditionalComponents() : null}
            </div>
        </React.Fragment>
    );
};

TableFilterTemplate.propTypes = {
    queryUtility: PropTypes.object.isRequired,
    filterStore: PropTypes.object.isRequired,
    showClear: PropTypes.bool,
    t: PropTypes.any,
    children: PropTypes.any,
    renderAdditionalComponents: PropTypes.func
};

TableFilterTemplate.defaultProps = {
    showClear: false
};

function renderFilter(filterStore, queryUtility, filters) {
    if (!filters || React.Children.count(filters) === 0) return null;
    return (
        <React.Fragment>
            {filters}
        </React.Fragment>
    );
}

export default defaultTemplate(TableFilterTemplate);
