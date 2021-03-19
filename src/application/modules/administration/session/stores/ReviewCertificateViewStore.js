import { action, observable } from 'mobx';
import { BaseEditViewStore } from 'core/stores';
import { ReviewBlankCertificateForm } from 'application/administration/session/forms';

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
                        await rootStore.application.administration.sessionStore.reviewBlankCertificate({
                            id: this.sessionCertificate.id,
                            ...resource
                        });
                    },
                    get: async () => {
                        // let response = await rootStore.application.administration.sessionStore.reviewToken(reviewToken);
                        // this.sessionCertificate = response.data;
                        // return response.data;
                        return {};
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
