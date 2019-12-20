import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { DonorAccountService } from 'application/donor-account/services';

const Types = {
    DonorAccount: 0,
    Contribution: 1,
    Grant: 2,
    BookletOrder: 3
};

@applicationContext
class DonorAccountPageHeaderOverviewViewStore extends BaseViewStore {
    @observable donorAccount = null;
    prefixTypes = null;

    constructor(rootStore, { donorAccountId, type }) {
        super(rootStore)

        this.donorAccountId = donorAccountId;
        this.type = type;
        this.Types = Types;
        this.rootStore = rootStore;
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goTo(
                'master.app.main.donor-account.list'
            )
        }
        else {
            await this.fetch([
                this.fetchDonorAccount()
            ]);
        }
    }

    @action.bound
    async fetchDonorAccount() {
        const service = new DonorAccountService(this.rootStore.application.baasic.apiClient);

        let params = {
            embed: [
                'accountType'
            ],
            fields: [
                'id',
                'donorName',
                'presentBalance',
                'availableBalance'
            ]
        }

        this.setDonorOptions(params);

        const response = await service.get(this.donorAccountId, params);
        this.donorAccount = response.data;
    }

    setDonorOptions(params) {
        switch (this.type) {
            case Types.DonorAccount:
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

export default DonorAccountPageHeaderOverviewViewStore;
