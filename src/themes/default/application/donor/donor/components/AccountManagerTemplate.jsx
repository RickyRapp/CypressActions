import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

class AccountManagerTemplate extends Component {
    render() {
        const { rootStore } = this.props;

        const imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU'

        return (
            <React.Fragment>
                {rootStore.userStore.user && rootStore.userStore.user.donor ? (
                    <React.Fragment>
                        {rootStore.userStore.user.donor.accountManager ?
                            <div className="u-display--flex u-mar--left--med">
                                {/* <div className="header__profile">
                                    <img className="header__profile__img" src={imgUrl} alt="" />
                                </div> */}
                                <div>
                                    <span className="header__profile__label">
                                        Your Account Manager:
                                    </span>
                                    <p className="header__profile__title">
                                        {`${rootStore.userStore.user.donor.accountManager.firstName} ${rootStore.userStore.user.donor.accountManager.lastName}`}
                                    </p>
                                </div>
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
