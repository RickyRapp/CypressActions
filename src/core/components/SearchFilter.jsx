import React from 'react';
import PropTypes from 'prop-types';
import { SearchFilterTemplate } from 'themes/components';

const SearchFilter = function(props) {
    return <SearchFilterTemplate {...props} />
};

SearchFilter.propTypes = {
    queryUtility: PropTypes.object,
    propertyName: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    clearVisible: PropTypes.bool
};

export default SearchFilter;
