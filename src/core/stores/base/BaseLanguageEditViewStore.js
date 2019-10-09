import { action, observable, runInAction } from 'mobx';
import { BaseViewStore } from 'core/stores';

class BaseLanguageEditViewStore extends BaseViewStore {
    @observable item = null;
    id = null;
    name = null;
    form = null;
    _actions = null;

    get actions() {
        return this._actions ? (typeof this._actions === 'function' ? this._actions() : this._actions) : {};
    }

    constructor(rootStore, { name, id, actions, form, FormClass, autoInit = true }) {
        super(rootStore);

        this.name = name;
        this.id = id;
        this._actions = actions;
        this.autoInit = autoInit;
        this.form = form || new FormClass({
            onSuccess: (item) => {
                return this.updateResource(item);
            }
        });

        if (this.autoInit) {
            this.fetch([
                this.initialize()
            ]);
        }
    }

    @action.bound
    async initialize() {
        await this.getResource();
    }

    @action.bound
    async getResource() {
        const item = await this.actions.get(this.id);
        runInAction(() => {
            this.item = item
        });
    }

    @action.bound
    async updateResource(resource) {
        if (!this.actions.update) return;

        await this.actions.update({
            id: this.id,
            ...resource
        });

        runInAction(() => {
            this.notifySuccessUpdate(this.name);
            this.rootStore.routerStore.goBack();
        });
    }

    @action.bound
    // eslint-disable-next-line
    notifySuccessUpdate(name) {
        this.rootStore.notificationStore.success('LANGUAGE_EDIT_LAYOUT.SUCCESS_UPDATE');
    }
}

export default BaseLanguageEditViewStore;
