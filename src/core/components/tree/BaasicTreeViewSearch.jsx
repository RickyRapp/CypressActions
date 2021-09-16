import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { BaasicTreeViewSearchTemplate } from 'themes/components';

class BaasicTreeViewSearch extends Component {
    render() {
        const {searchTerm, onSearch} = this.props;

        return (
            <BaasicTreeViewSearchTemplate {...this.props} value={searchTerm} onChange={onSearch} />
        );
    }
}

BaasicTreeViewSearch.propTypes = {
    searchTerm: PropTypes.string,
    onSearch: PropTypes.func
};

export default BaasicTreeViewSearch;
