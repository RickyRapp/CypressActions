import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {BaasicMessageListTemplate} from 'themes/components';

class BaasicMessageList extends Component {
    render() {
        return (
            <BaasicMessageListTemplate messages={this.props.messages} markAsRead={this.props.markAsRead} />
        );
    }
}

BaasicMessageList.propTypes = {
    messages: PropTypes.array,
    markAsRead: PropTypes.func
};

export default BaasicMessageList;
