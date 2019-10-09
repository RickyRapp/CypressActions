import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {BaasicMessageItemTemplate} from 'themes/components';

class BaasicMessageItem extends Component {
    render() {
        return (
            <BaasicMessageItemTemplate {...this.props} />
        );
    }
}

BaasicMessageItem.propTypes = {
    avatar: PropTypes.string,
    from: PropTypes.string.isRequired,
    timestamp: PropTypes.instanceOf(Date),
    message: PropTypes.string,
    isRead: PropTypes.bool,
    markAsRead: PropTypes.func
};

export default BaasicMessageItem;
