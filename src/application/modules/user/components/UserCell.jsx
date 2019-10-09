import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {UserCellTemplate} from 'themes/application/user/components';

@observer
class UserCell extends Component {
    render() {
        return (
            <UserCellTemplate {...this.props} />
        );
    }
}

UserCell.propTypes = {
    dataItem: PropTypes.any
};

export default UserCell;
