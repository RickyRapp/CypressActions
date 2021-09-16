import { action, runInAction, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { compileAuthorization } from 'core/utils';

class BasePreviewViewStore extends BaseViewStore {
    @observable item = null;

    _actions = null;
    get actions() {
        return this._actions ? (typeof this._actions === 'function' ? this._actions() : this._actions) : {};
    }

    constructor(rootStore, { actions, autoInit = true, id, title, authorization, routes }) {
        super(rootStore);

        this.id = id;
        this._actions = actions;
        this.routes = routes;
        this.authorization = compileAuthorization(authorization || rootStore.routerStore.getCurrentRoute().authorization);
        const { navigationTitle } = this.rootStore.routerStore.transitionData;
        if (navigationTitle || title) {
            this.rootStore.viewStore.setNavigationOptions({
                title: navigationTitle || title
            });
        }

        if (autoInit) {
            this.fetch([
                this.initialize()
            ]);
        }
    }

    @action
    async initialize() {
        await this.getResource(this.id);
    }

    @action
    setItem(item) {
        this.item = item;
    }

    @action.bound
    async getResource(id) {
        const item = await this.actions.get(id);
        runInAction(() => {
            this.setItem(item);
        });
    }

}

export default BasePreviewViewStore;
