import React from 'react';
import PropTypes from 'prop-types';
import { ListBoxTemplate } from 'themes/components';

class ListBox extends React.Component {
    render() {
        return <ListBoxTemplate {...this.props} />
    }
}

ListBox.propTypes = {
    store: PropTypes.object.isRequired
};

export default ListBox;
