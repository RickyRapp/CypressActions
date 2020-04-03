import { action, observable } from 'mobx';
import { BaseEditViewStore } from 'core/stores';
import { SessionCertificateService } from 'application/session-certificate/services';
import { ReviewBlankCertificateForm } from 'application/session/forms';
import { SessionService } from 'application/session/services';

class ReviewCertificateViewStore extends BaseEditViewStore {
    @observable sessionCertificate = null;

    constructor(rootStore) {
        super(rootStore, {
            name: 'review-blank-certificate',
            id: rootStore.routerStore.routerState.params.reviewToken,
            autoInit: true,
            actions: () => {
                return {
                    update: async (resource) => {
                        debugger
                        const service = new SessionService(rootStore.application.baasic.apiClient);
                        await service.reviewBlankCertificate({
                            id: this.sessionCertificate.id,
                            ...resource
                        });
                    },
                    get: async (reviewToken) => {
                        const service = new SessionCertificateService(rootStore.application.baasic.apiClient);
                        let response = await service.reviewToken(reviewToken);
                        this.sessionCertificate = response.data;
                        return response.data;
                    }
                }
            },
            FormClass: ReviewBlankCertificateForm,
            onAfterAction: () => rootStore.routerStore.goTo('master.app.main.dashboard'),
        });
    }

    @action.bound
    approve() {
        this.form.$('isApproved').set(true);
        this.form.submit()
    }

    @action.bound
    disapprove() {
        this.form.$('isApproved').set(false);
        this.form.submit()
    }
}

export default ReviewCertificateViewStore;
