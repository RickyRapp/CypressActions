import { action} from 'mobx';
import {BaseViewStore} from 'core/stores';
import {UserPasswordChangeForm} from 'application/user/forms';

class PasswordChangeViewStore extends BaseViewStore {
    loaderStore = this.createLoaderStore();

    userPasswordChangeForm = new UserPasswordChangeForm({
        onSuccess: async form => {
            const { newPassword, sendMailNotification } = form.values();

            await this.changePassword({
                newPassword: newPassword,
                sendMailNotification: sendMailNotification
            });
        }
    });

    constructor(rootStore, componentProps) {
        super(rootStore);

        this.rootStore = rootStore;
        this.modalParams = componentProps.modalParams;
        this.userId = rootStore.routerStore.routerState.params.id;
    }

    @action.bound
    async changePassword(passwordObject) {
        this.loaderStore.suspend();

        try {
            await this.rootStore.application.baasic.membershipModule.user.changePassword(
                this.userId,
                passwordObject
            );

            this.loaderStore.resume();

            this.modalParams.close();
            this.rootStore.notificationStore.success('ORGANIZATION_USERS.PASSWORD_CHANGE.SUCCESS_MESSAGE');
        }
        catch (err) {
            this.loaderStore.resume();

            this.rootStore.notificationStore.error(err.data.message, err);
        }
    }
}

export default PasswordChangeViewStore;
