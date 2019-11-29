import { action, runInAction, observable, computed } from 'mobx';
import MobxReactFormDevTools from 'mobx-react-form-devtools';

import { BaseViewStore, TranslationStore } from 'core/stores';

class BaseEditViewStore extends BaseViewStore {
    id = null;
    name = null;
    form = null;

    @observable item = null;
    @observable itemInitialized = false;
    @observable localizationVisible = false;

    // actions should not be passed in view but only used within view store
    _actions = null;
    get actions() {
        return this._actions ? (typeof this._actions === 'function' ? this._actions() : this._actions) : {};
    }

    _errorActions = null;
    get errorActions() {
        return this._errorActions ? (typeof this._errorActions === 'function' ? this._errorActions() : this._errorActions) : {};
    }

    constructor(rootStore, { name, id, actions, errorActions, form, FormClass, autoInit = true, localization = true, title, onAfterAction }) {
        super(rootStore);

        this.id = id;
        this.name = name;
        this.localization = localization;
        this._actions = actions;
        this._errorActions = errorActions;
        this.onAfterAction = onAfterAction;
        this.form = form || new FormClass({
            onSuccess: (form) => {
                const item = form.values();
                if (this.isEdit && !this.actions.create) {
                    return this.updateResource(item);
                } else {
                    return this.createResource(item);
                }
            }
        });

        if (process.env.NODE_ENV !== 'production') {
            MobxReactFormDevTools.register({ [this.name]: this.form });
            MobxReactFormDevTools.select(this.name);
            // MobxReactFormDevTools.open(true);
        }

        if (this.localization) {
            const localizableFields = this.form.getLocalizeFields();
            if (localizableFields.length === 0) {
                this.localization = false;
            } else {
                this.translationStore = new TranslationStore(rootStore, localizableFields);
            }
        }

        const { navigationTitle } = this.rootStore.routerStore.transitionData;
        if (navigationTitle || (this.isEdit && title)) {
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

    @computed get isEdit() {
        return this.id !== null && this.id !== undefined;
    }

    @action
    async initialize() {
        if (this.isEdit) {
            await this.getResource(this.id);
        } else {
            //due to showing error when we want to clear form (maybe only on nested fields) we need to temporarily disable valdiationOnChange.
            this.form.state.options.set({ validateOnChange: false })
            this.form.clear()
            this.form.state.options.set({ validateOnChange: true })
        }
    }

    @action
    setItem(item) {
        this.item = item;
        this.itemInitialized = true;
    }

    @action.bound
    async getResource(id, updateForm = true) {
        const item = await this.actions.get(id);
        runInAction(() => {
            this.setItem(item);
            if (updateForm) {
                this.updateForm();
            }
        });
    }

    @action.bound
    updateForm() {
        if (this.item) {
            this.form.update(this.item);
            if (this.translationStore) {
                this.translationStore.update(this.form.values());
            }
        }
    }

    @action.bound
    async updateResource(resource) {
        if (!this.actions.update) return;

        this.form.setFieldsDisabled(true);
        try {
            if (this.translationStore) {
                this.translationStore.applyMetadata(resource);
            }

            await this.actions.update({
                ...resource
            });

            this.form.setFieldsDisabled(false);

            if (this.onAfterAction) {
                this.onAfterAction();
            }
            else {
                await this.rootStore.routerStore.goBack();
                await setTimeout(() => this.notifySuccessUpdate(this.name), 10);
            }
        }
        catch (err) {
            this.form.setFieldsDisabled(false);
            return this.onUpdateError(err);
        }
    }

    @action.bound
    async createResource(resource) {
        if (!this.actions.create) return;

        this.form.setFieldsDisabled(true);
        try {
            if (this.translationStore) {
                this.translationStore.applyMetadata(resource);
            }

            await this.actions.create(resource);

            this.form.setFieldsDisabled(false);

            if (this.onAfterAction) {
                this.onAfterAction();
            }
            else {
                await this.rootStore.routerStore.goBack();
                await setTimeout(() => this.notifySuccessCreate(), 10);
            }
        }
        catch (err) {
            this.form.setFieldsDisabled(false);
            return this.onCreateError(err);
        }
    }

    @action.bound
    notifySuccessCreate() {
        this.rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_CREATE');
    }

    onCreateError(error) {
        if (!this.errorActions.onCreateError) {
            throw error;
        }

        return this.errorActions.onCreateError(error)
    }

    @action.bound
    notifySuccessUpdate(name) {
        this.rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE', name);
    }

    @action.bound toggleLocalizationVisibility() {
        if (!this.localization) {
            this.localizationVisible = false;
        }

        this.localizationVisible = !this.localizationVisible;
        if (this.localizationVisible) {
            this.translationStore.update(this.form.values());
        }
    }

    onUpdateError(error) {
        if (!this.errorActions.onUpdateError) {
            throw error;
        }

        return this.errorActions.onUpdateError(error);
    }
}

export default BaseEditViewStore;
