import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { DonorService } from 'application/donor/services';

const Types = {
    Donor: 0,
    Contribution: 1,
    Grant: 2,
    BookletOrder: 3
};

@applicationContext
class DonorPageHeaderOverviewViewStore extends BaseViewStore {
    @observable donor = null;
    prefixTypes = null;

    constructor(rootStore, { donorId, type }) {
        super(rootStore)

        this.donorId = donorId;
        this.type = type;
        this.Types = Types;
        this.rootStore = rootStore;
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goTo(
                'master.app.main.donor.list'
            )
        }
        else {
            await this.fetch([
                this.fetchDonor()
            ]);
        }
    }

    @action.bound
    async fetchDonor() {
        const service = new DonorService(this.rootStore.application.baasic.apiClient);

        let params = {
            embed: [
                'accountType',
                'pendingTransactions'
            ],
            fields: [
                'id',
                'donorName',
                'presentBalance',
                'availableBalance'
            ]
        }

        this.setDonorOptions(params);

        const response = await service.get(this.donorId, params);
        this.donor = response.data;
    }

    setDonorOptions(params) {
        switch (this.type) {
            case Types.Donor:
                // params.embed.push()
                // params.fields.push()
                break;
            case Types.Contribution:
                // params.embed.push()
                // params.fields.push()
                break;
            case Types.Grant:
                // params.embed.push()
                // params.fields.push()
                break;
            case Types.BookletOrder:
                // params.embed.push()
                // params.fields.push()
                break;
            default:
                break;
        }

        return params;
    }
}

export default DonorPageHeaderOverviewViewStore;
