import { action, observable, runInAction } from 'mobx';
import { UserEditForm } from 'application/user/forms';
import { applicationContext } from 'core/utils';
import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { ModalParams } from 'core/models';

@applicationContext
class UserEditViewStore extends BaseEditViewStore {
    @observable userProfile = null;

    passwordChangeForm = null;
    lockConfirm = null;
    approveConfirm = null;
    mailPasswordResetConfirm = null;
    changePassword = null;
    titleDropdownStore = null;
    languageDropdownStore = null;

    constructor(rootStore) {
        const id = rootStore.routerStore.routerState.params.id;
        super(rootStore, {
            name: 'user',
            autoInit: false,
            id: id,
            actions: {
                get: async (id) => {
                    const response = await rootStore.application.baasic.membershipModule.user.get(id, { embed: 'roles' });
                    return response.data;
                }
            },
            FormClass: UserEditForm,
        });

        this.changePasswordModal = new ModalParams({});

        this.roleMultiselectStore = new BaasicDropdownStore({
            multi: true,
        }, {
            fetchFunc: async () => {
                const response = await this.rootStore.application.baasic.membershipModule.lookups.get({ embed: 'role', rpp: 30 });

                return response.data.role;
            },
            onChange: (roles) => {
                this.item.roles = roles;
                this.form.set({ roles: roles });
            }
        });

    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goTo(
                'master.app.main.user.list'
            )
        }
        else {
            this.form.clear();
            await this.fetchRoles();
            await this.fetch([
                this.getResource(this.id),
                this.getUserProfile(this.id)
            ]);
        }
    }

    @action.bound
    async getResource(id) {
        await super.getResource(id);

        console.log(this.item.roles)
        runInAction(() => {
            this.form.$('roles').set(this.item.roles);
            // this.form.update({roles: this.item.roles});
            this.form.validate();
        });
    }

    @action.bound
    async updateResource(resource) {

        const { roles, userName, email, firstName, lastName, ...userProfile } = resource; // eslint-disable-line

        const user = {
            ...this.item,
            email,
            roles,
            firstName,
            lastName
        };

        try {
            // fetch resolves all promises, not only GET requests
            this.fetch([
                await this.rootStore.application.baasic.membershipModule.user.update({
                    id: this.id,
                    ...user
                }),
                await this.rootStore.application.baasic.userProfileModule.profile.update({
                    id: this.id,
                    ...userProfile
                }),
            ])
            this.rootStore.notificationStore.success('Successfully updated user data');
            await this.rootStore.routerStore.goBack();
        }
        catch (err) {
            this.rootStore.notificationStore.error('Error while updating user data', err);
        }
    }

    @action.bound
    async getUserProfile(id) {
        try {
            const response = await this.rootStore.application.baasic.userProfileModule.profile.get(id);

            const { firstName, lastName, email, ...profile } = response.data; // eslint-disable-line

            runInAction(() => {
                this.form.update({ ...profile });
            });
        }
        catch (err) {
            if (err.statusCode !== 404) {
                this.rootStore.notificationStore.error(err.data.message, err);
            }
        }
    }

    @action.bound
    async fetchRoles() {
        this.roleMultiselectStore.setLoading(true);
        const response = await this.rootStore.application.baasic.membershipModule.lookups.get({ embed: 'role', rpp: 30 });
        runInAction(() => {
            this.roleMultiselectStore.setItems(response.data.role);
            this.roleMultiselectStore.setLoading(false);
        });
    }

    @action.bound
    async toggleLock() {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to ${
            this.item.isLockedOut ? 'unlock' : 'lock'
            } user?`,
            async () => {
                if (this.item.isLockedOut) {
                    await this.rootStore.application.baasic.membershipModule.user.unlock(this.item);
                } else {
                    await this.rootStore.application.baasic.membershipModule.user.lock(this.item);
                }
                await this.getResource(this.item.id);
                this.rootStore.notificationStore.success(
                    `Successfully ${
                    this.item.isLockedOut ? 'locked' : 'unlocked'
                    } user`
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
                if (this.item.isApproved) {
                    await this.rootStore.application.baasic.membershipModule.user.disapprove(this.item);
                } else {
                    await this.rootStore.application.baasic.membershipModule.user.approve(this.item);
                }

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
            'Send password reset email to ' + this.item.email,
            async () => {
                this.loaderStore.suspend();
                try {
                    const recoverUrl = `${window.location.origin}/password-change/{?passwordRecoveryToken}`;
                    await this.rootStore.application.baasic.membershipModule.passwordRecovery.requestReset({
                        userName: this.item.email,
                        recoverUrl: recoverUrl
                    });

                    this.rootStore.notificationStore.success('Password reset mail sent to ' + this.item.email);
                }
                catch (err) {
                    this.rootStore.notificationStore.error('Failed to send password reset mail to ' + this.item.email);
                }
                finally {
                    this.loaderStore.resume();
                }
            }
        )
    }

    @action.bound
    openChangePassword() {
        this.changePasswordModal.open();
    }
}

export default UserEditViewStore;
