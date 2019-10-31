import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { SessionService } from 'application/session/services';
import { applicationContext } from 'core/utils';

@applicationContext
class Step4ViewStore extends BaseViewStore {
    @observable currentCount = 30;
    @observable session = null;

    constructor(rootStore, { nextStep, sessionKeyIdentifier }) {
        super(rootStore);

        setInterval(this.timer, 1000);
        this.nextStep = nextStep;
        this.id = sessionKeyIdentifier;
        this.rootStore = rootStore;
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.getResource(this.id)
            ]);
        }
    }

    @action.bound
    async getResource(id) {
        const params = {
            embed: [
                'sessionCertificates',
                'sessionCertificates.certificate',
                'sessionCertificates.certificate.booklet',
                'sessionCertificates.certificate.booklet.denominationType',
                'sessionCertificates.certificate.booklet.bookletOrderItemBooklets',
                'sessionCertificates.certificate.booklet.bookletOrderItemBooklets.bookletOrderItem',
                'sessionCertificates.certificate.booklet.bookletOrderItemBooklets.bookletOrderItem.bookletOrder',
            ],
            fields: [
                'amount',
                'confirmationNumber'
            ]
        }
        const service = new SessionService(this.rootStore.application.baasic.apiClient);
        const response = await service.get(id, params);
        this.session = response.data;
    }

    @action.bound
    onNextStepClick() {
        this.nextStep(1);
    }

    @action.bound timer() {
        --this.currentCount;
        if (this.currentCount == 0) {
            this.nextStep(1);
        }
    }
}

export default Step4ViewStore;
