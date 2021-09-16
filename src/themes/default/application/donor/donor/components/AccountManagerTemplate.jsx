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
                             <div className="u-mar--left--xlrg account-manager">
                                <span className="type--base type--color--opaque">
                                    Your Account Manager:
                                </span>
                                <p className="type--med type--wgt--medium">
                                    {`${rootStore.userStore.user.donor.accountManager.firstName} ${rootStore.userStore.user.donor.accountManager.lastName}`}
                                </p>
                            </div >
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
