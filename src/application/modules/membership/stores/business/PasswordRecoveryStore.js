class PasswordRecoveryStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
    }

    async requestReset({ userName, challengeIdentifier, challengeResponse }) {
        const recoverUrl = `${window.location.origin}/password-change/{?passwordRecoveryToken}`;
        return await this.moduleStore.rootStore.application.baasic.membershipModule.passwordRecovery.requestReset({
            userName: userName,
            challengeIdentifier: challengeIdentifier,
            challengeResponse: challengeResponse,
            recoverUrl: recoverUrl
        });
    }

    async reset({ newPassword, passwordRecoveryToken }) {
        return await this.moduleStore.rootStore.application.baasic.membershipModule.passwordRecovery.reset({
            newPassword,
            passwordRecoveryToken
        });
    }
}

export default PasswordRecoveryStore;