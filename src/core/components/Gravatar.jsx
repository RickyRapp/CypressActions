import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {GravatarTemplate} from 'themes/components';

class Gravatar extends Component {
    render() {
        return (
            <GravatarTemplate email={this.props.email} size={this.props.size} classNames={this.props.classNames} />
        )
    }
}

Gravatar.propTypes = {
    email: PropTypes.string.isRequired,
    size: PropTypes.number,
    classNames: PropTypes.string
};

Gravatar.defaultProps = {
    size: 30
};

export default Gravatar;
