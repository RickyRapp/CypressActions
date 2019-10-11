import _ from 'lodash';
import { observable, action, computed, observe } from 'mobx';

class AuthStore {
    rootStore;

    @observable token = undefined;
    @observable signInRedirect = null;
    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;

        // sync local token with baasic app token
        observe(this, 'isAuthenticated',
            async (
                // eslint-disable-next-line
                { oldValue, newValue }
            ) => {
                if (!newValue) {
                    //TODO change to resolveUser - remove user
                    const { userStore } = this.rootStore;
                    userStore.removeUser();

                    this.rootStore.permissionStore.resetPermissions();

                    const currentRoute = this.rootStore.routerStore.routerState;
                    if (!currentRoute.isPublic) {
                        this.rootStore.navigateLogin();
                    }
                }
            }
        );

        this.initAuthEvents();
    }

    @computed get isAuthenticated() {
        return isTokenValid(this.token);
    }

    getSignInRedirect() {
        if (this.signInRedirect) {
            return this.signInRedirect;
        }

        return this.rootStore.initialState;
    }

    @action syncToken() {
        const { application } = this.rootStore;
        this.token = application && application.baasic
            ? application.baasic.getAccessToken() || null
            : null
    }

    @action setSignInRedirect(state) {
        this.signInRedirect = state;
    }

    resetSignInRedirect() {
        this.setSignInRedirect(null);
    }

    async initialize() {
        this.syncToken();
        return Promise.resolve();
    }

    initAuthEvents() {
        document.addEventListener('tokenExpired', () => {
            this.syncToken();
        });

        document.addEventListener('tokenUpdated', async () => {
            this.syncToken();
        });
    }
}

function isTokenValid(token) {
    return !_.isNil(token) &&
        (token.expireTime === undefined
            || token.expireTime === null
            || (token.expireTime - new Date().getTime()) > 0
        );
}

export default AuthStore;
