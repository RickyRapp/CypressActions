import { TableViewStore, BaseListViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { FilterParams } from 'core/models';

@applicationContext
class DonorGivingCardSettingListViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'donor-giving-card-list',
            routes: {},
            queryConfig: {
                filter: new FilterParams(),
                disableUpdateQueryParams: true
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.donorId = this.donorId;
                        params.embed = ['givingCard']
                        return rootStore.application.donor.donorStore.findGivingCardSetting(params);
                    }
                }
            }
        });

        this.donorId = rootStore.userStore.applicationUser.id;

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'id',
                    title: 'EMAIL_ADDRESS.LIST.COLUMNS.EMAIL_LABEL'
                }
            ],
            actions: {},
            disablePaging: true,
            disableSorting: true
        }));
    }
}

export default DonorGivingCardSettingListViewStore;
