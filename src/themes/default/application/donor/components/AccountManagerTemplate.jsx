import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Gravatar } from 'core/components';

class AccountManagerTemplate extends Component {
    render() {
        const { rootStore } = this.props;

        return (
            <React.Fragment>
                {rootStore.userStore.user ? (
                    <React.Fragment>
                        <Gravatar
                            className='header__profile__img'
                            email={rootStore.userStore.user.email}
                        />
                        <span>
                            <span>Your Account Manager</span>:
                    <span><strong> {rootStore.userStore.user.accountManager.name}</strong></span>
                        </span>
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
