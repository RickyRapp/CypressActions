import _ from 'lodash';
import {action, runInAction, observable, computed} from 'mobx';
import {BaseViewStore} from 'core/stores';

class BaseEditViewStore extends BaseViewStore {
    id = null;
    name = null;
    form = null;

    @observable item = null;

    // actions should not be passed in view but only used within view store
    _actions = null;
    get actions() {
        return this._actions ? (typeof this._actions === 'function' ? this._actions() : this._actions) : {};
    }

    constructor(rootStore, { name, id, actions, form, FormClass, crumbs, autoInit = true }) {
        super(rootStore);

        this.id = id;
        this.name = name;
        this._actions = actions;
        this.form = form || new FormClass({
            onSuccess: (form) => {
                const item = form.values();
                if (this.isEdit) {
                    return this.updateResource(item);
                } else {
                    return this.createResource(item);
                }
            },
        });

        if (autoInit) {
            this.fetch([
                this.initialize()
            ]);
        }
    }

    @computed get isEdit() {
        return this.id !== null && this.id !== undefined;
    }

    @action
    async initialize() {
        if (this.isEdit) {
            await this.getResource(this.id);
        } else {
            this.form.clear();
        }
    }

    @action.bound
    async getResource(id, updateForm = true) {
        const item = await this.actions.get(id);
        runInAction(() => {
            this.item = item;

            if (updateForm) {
                this.updateForm();
            }
        });
    }

    @action.bound
    updateForm() {
        if (this.item) {
            this.form.update(this.item);
        }
    }

    @action.bound
    async updateResource(resource) {
        if (!this.actions.update) return;

        this.form.setFieldsDisabled(true);
        await this.actions.update({
            id: this.id,
            ...resource
        });
        this.form.setFieldsDisabled(false);
                
        await this.rootStore.routerStore.goBack();
        await setTimeout(() => this.notifySuccessUpdate(this.name), 10);
    }

    @action.bound
    async createResource(resource) {
        if (!this.actions.create) return;
        
        this.form.setFieldsDisabled(true);
        await this.actions.create(resource);
        this.form.setFieldsDisabled(false);

        await this.rootStore.routerStore.goBack();
        await setTimeout(() => this.notifySuccessCreate(this.name), 10);
    }

    @action.bound
    notifySuccessCreate(name) {
        this.rootStore.notificationStore.success(
            `Successfully created ${_.toLower(name)}.`
        );
    }

    @action.bound
    notifySuccessUpdate(name) {
        this.rootStore.notificationStore.success(
            `Successfully updated ${_.toLower(name)}.`
        );
    }
}

export default BaseEditViewStore;
