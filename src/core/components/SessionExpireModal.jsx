import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { action, observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { BaasicModal } from 'core/components';
import { SessionExpireModalTemplate } from 'themes/components';
import { BaseViewStore } from "core/stores";

@inject(i => ({
    modalParams: i.rootStore.authStore.sessionExpireModal,
    sessionExpireViewStore: new SessionExpireModalViewStore(i.rootStore)
}))
@observer
class SessionExpireModal extends Component {
    render() {
        return (
            <BaasicModal modalParams={this.props.modalParams}>
                <SessionExpireModalTemplate sessionExpireViewStore={this.props.sessionExpireViewStore} />
            </BaasicModal>
        );
    }
}

SessionExpireModal.propTypes = {
    rootStore: PropTypes.object,
    modalParams: PropTypes.object,
    sessionExpireViewStore: PropTypes.object
};

export default SessionExpireModal;

class SessionExpireModalViewStore extends BaseViewStore {
    @observable passwordInputValue = null;
    @observable error = null;

    constructor(rootStore) {
        super(rootStore);
        this.loginStore = rootStore.application.baasic.membershipModule.login;

        this.modalParams = rootStore.authStore.sessionExpireModal;
        this.user = this.modalParams.data.user;

        this.passwordField = {
            name: 'password',
            label: 'SESSION.PASSWORD_LABEL',
            placeholder: 'SESSION.PASSWORD_PLACEHOLDER',
            type: 'password',
            rules: 'required',
        }
    }

    @action.bound
    navigateLogin = () => {
        this.rootStore.navigateLogin();
    }

    @action.bound
    changepasswordInputValue = (v) => {
        this.error = null;
        this.passwordInputValue = v;
    }

    @action.bound
    login = async () => {
        this.loaderStore.suspend();
        try {
            // await this.loginStore.login({username: this.modalParams.data.user.email, password: formValues.password});
            await this.loginStore.login({ username: this.user.email, password: this.passwordInputValue });
            // close the modal if login is valid
            this.modalParams.close();
        }
        catch (err) {
            if (err.statusCode === 400) {
                this.error = "Invalid credentials";
            }
        }

        this.loaderStore.resume();
    }
}
