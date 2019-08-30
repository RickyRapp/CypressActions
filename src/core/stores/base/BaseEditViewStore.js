import _ from 'lodash';
import { action, runInAction, observable, computed } from 'mobx';
import { BaseViewStore } from 'core/stores';

class BaseEditViewStore extends BaseViewStore {
  id = null;
  name = null;
  form = null;
  goBack = null;
  onAfterCreate = null;
  onAfterUpdate = null;

  @observable item = null;

  // actions should not be passed in view but only used within view store
  _actions = null;
  get actions() {
    return this._actions
      ? typeof this._actions === 'function'
        ? this._actions()
        : this._actions
      : {};
  }

  constructor(
    rootStore,
    { name, id, actions, form, FormClass, crumbs, autoInit = true, goBack = true, onAfterCreate, onAfterUpdate,
      setValues = false, loader = false } //setValues is used for form.set('value', item), because form.update(item) does not work properly with nested child (3 nested row)
  ) {
    super(rootStore);

    this.id = id;
    this.name = name;
    this._actions = actions;
    this.goBack = goBack;
    this.onAfterCreate = onAfterCreate;
    this.onAfterUpdate = onAfterUpdate;
    this.setValues = setValues;
    this.loader = loader;
    this.form =
      form ||
      new FormClass({
        onSuccess: form => {
          const item = form.values();
          if (this.isEdit) {
            return this.updateResource(item);
          } else {
            return this.createResource(item);
          }
        },
        onError(form) {
          rootStore.notificationStore.error("Testing Purpose - Check console.")
          console.log('Form Errors', form.errors());
          console.log('Form Values', form.values());
          console.log('Form Rules', form.get('rules'));
        },

      });

    if (autoInit) {
      this.fetch([this.initialize()]);
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
      if (this.setValues) {
        this.form.set('value', this.item);
      }
      else {
        this.form.update(this.item);
      }
    }
  }

  @action.bound
  async updateResource(resource) {
    if (!this.actions.update) return;

    this.loader ? this.loaderStore.suspend() : this.form.setFieldsDisabled(true);
    try {
      const response = await this.actions.update({
        id: this.id,
        ...resource
      });
      this.rootStore.notificationStore.showMessageFromResponse(response);
      this.loader ? this.loaderStore.resume() : this.form.setFieldsDisabled(false);
    } catch (errorResponse) {
      this.rootStore.notificationStore.showMessageFromResponse(errorResponse);
      this.loader ? this.loaderStore.resume() : this.form.setFieldsDisabled(false);
      return;
    }

    if (this.onAfterUpdate) {
      this.onAfterUpdate();
    }
    if (this.goBack === true) {
      await this.rootStore.routerStore.goBack();
    }
  }

  @action.bound
  async createResource(resource) {
    if (!this.actions.create) return;

    this.loader ? this.loaderStore.suspend() : this.form.setFieldsDisabled(true);
    let response = null;
    try {
      response = await this.actions.create(resource);
      this.rootStore.notificationStore.showMessageFromResponse(response);
      this.loader ? this.loaderStore.resume() : this.form.setFieldsDisabled(false);
    } catch (errorResponse) {
      this.rootStore.notificationStore.showMessageFromResponse(errorResponse);
      this.loader ? this.loaderStore.resume() : this.form.setFieldsDisabled(false);
      return;
    }

    if (this.onAfterCreate) {
      this.onAfterCreate(response);
      this.form.clear();
    }
    if (this.goBack === true) {
      await this.rootStore.routerStore.goBack();
    }
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

  @action.bound
  notifyErrorResponse(message) {
    this.rootStore.notificationStore.error(
      message
    );
  }
}

export default BaseEditViewStore;
