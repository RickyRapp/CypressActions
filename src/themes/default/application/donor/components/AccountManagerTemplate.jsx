import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

class AccountManagerTemplate extends Component {
    render() {
        const { rootStore } = this.props;

        return (
            <React.Fragment>
                {rootStore.userStore.user && rootStore.userStore.user.donor ? (
                    <React.Fragment>
                        {rootStore.userStore.user.donor.accountManager ?
                            <span>
                                <span>Your Account Manager</span>:
                            <span>
                                    <strong> {`${rootStore.userStore.user.donor.accountManager.firstName} ${rootStore.userStore.user.donor.accountManager.lastName}`}</strong>
                                </span>
                            </span>
                            :
                            null}
                    </React.Fragment >)
                    : null}
            </React.Fragment >
        );
    }
}

AccountManagerTemplate.propTypes = {
    t: PropTypes.func,
    rootStore: PropTypes.object
};

export default defaultTemplate(AccountManagerTemplate);
