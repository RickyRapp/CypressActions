import { action } from 'mobx';
import { UserEditForm, UserPasswordChangeForm } from 'modules/administration/user/forms';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { ModalParams } from 'core/models';
import _ from 'lodash';

class UserEditViewStore extends BaseEditViewStore {
  constructor(rootStore) {
    const {
      user: userService,
      role: roleService
    } = rootStore.app.baasic.membershipModule;

    super(rootStore, {
      name: 'user',
      id: rootStore.routerStore.routerState.params.id,
      actions: {
        update: async user => {
          await userService.update({
            id: this.id,
            ...user,
            roles: _.map(user.roles, role => ({
              roleId: role.id,
              name: role.name
            }))
          });
        },
        get: async id => {
          const response = await userService.get(id);
          return response.data;
        },
        lock: user => {
          return userService.lock(user);
        },
        unlock: user => {
          return userService.unlock(user);
        },
        approve: user => {
          return userService.approve(user);
        },
        disapprove: user => {
          return userService.disapprove(user);
        }
      },
      FormClass: UserEditForm,
      setValues: true
    });
    this.roleMultiSelectStore = new BaasicDropdownStore(
      {
        multi: true,
        textField: 'name',
        dataItemKey: 'id'
      },
      {
        fetchFunc: async term => {
          let options = {};
          if (term && term !== '') {
            options.searchQuery = term;
          }

          let models = await roleService.find(options);
          return models.data.item;
        },
        onChange: this.setUserRoles
      }
    );
  }

  passwordChangeForm = new UserPasswordChangeForm({
    onSuccess: async () => {
      await this.changeUserPassword();
    }
  });

  changePassword = new ModalParams({
    onClose: this.closeModal
  });

  @action.bound
  setUserRoles(roles) {
    this.form.$('roles').set('value', roles);
  }

  @action.bound
  async mailPasswordReset(email) {
    const recoverUrl = `${
      window.location.origin
      }/agency/password-change/{?passwordRecoveryToken}`;
    const response = await this.rootStore.app.baasic.membershipModule.passwordRecovery.requestReset(
      {
        userName: email,
        recoverUrl: recoverUrl
      }
    );
    if (response.statusCode === 201) {
      this.rootStore.notificationStore.success(
        'Successfully sent password reset mail'
      );
    }
  }

  @action.bound
  async changeUserPassword() {
    const response = await this.rootStore.app.baasic.membershipModule.user.changePassword(
      this.item.userName,
      this.passwordChangeForm.values()
    );
    if (response.statusCode === 200) {
      this.rootStore.notificationStore.success('Successfully changed password');
    }
  }

  @action.bound
  async toggleLock() {
    this.rootStore.modalStore.showConfirm(
      `Are you sure you want to ${
      this.item.isLockedOut ? 'unlock' : 'lock'
      } user?`,
      async () => {
        const operation = this.item.isLockedOut
          ? this.actions.unlock
          : this.actions.lock;

        await operation(this.item);
        await this.getResource(this.item.id);
        this.rootStore.notificationStore.success(
          `Successfully ${this.item.isLockedOut ? 'locked' : 'unlocked'} user`
        );
      }
    );
  }

  @action.bound
  async toggleApprove() {
    this.rootStore.modalStore.showConfirm(
      `Are you sure you want to ${
      this.item.isApproved ? 'disapprove' : 'approve'
      } user?`,
      async () => {
        this.loaderStore.suspend();
        const operation = this.item.isApproved
          ? this.actions.disapprove
          : this.actions.approve;
        await operation(this.item);
        await this.getResource(this.item.id);
        this.rootStore.notificationStore.success(
          `Successfully ${
          this.item.isApproved ? 'approved' : 'disapproved'
          } user`
        );
        this.loaderStore.resume();
      }
    );
  }

  @action.bound
  async openMailPasswordReset() {
    this.rootStore.modalStore.showConfirm(
      `Are you sure you want to send password reset mail?`,
      async () => {
        this.loaderStore.suspend();
        const operation = this.mailPasswordReset;
        if (this.item.isApproved) {
          await operation(this.item.email);
        } else {
          this.rootStore.notificationStore.error(
            'Cannot send password reset email. User is not approved'
          );
        }
        this.loaderStore.resume();
      }
    );
  }

  @action.bound
  async openChangePassword() {
    this.changePassword.open();
  }
}

export default UserEditViewStore;
