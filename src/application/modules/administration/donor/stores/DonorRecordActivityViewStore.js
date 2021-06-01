import { action } from 'mobx';
import { TableViewStore, DateRangeQueryPickerStore, BaseListViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { DonorRecordActivityFilter } from 'application/administration/donor/models';
import moment from 'moment';

@applicationContext
class DonorRecordActivityViewStore extends BaseListViewStore {
    constructor(rootStore, donorId) {
            super(rootStore, {
                name: 'donor-record-activity',
                routes: {},
                queryConfig: {
                    filter: new DonorRecordActivityFilter(),
                    onResetFilter: (filter) => {
                        filter.reset();
                    }
                },
                actions: () => {
                    return {
                        find: async (params) => {
                            params = {
                                donorId: this.donorId
                            },
                            params.embed = [
                                'donor',
                                'coreuser',
                            ]
                            const data = this.rootStore.application.administration.donorStore.getRecordActivityList({ donorId: this.donorId, ...params });
                            //const temp = JSON.parse(data.json)
                            return data;
                        }
                    }
                }
            });
    
        this.userId = rootStore.userStore.applicationUser.id;      
        this.donorId = donorId;

        this.createTableStore();
        this.createDateCreatedDateRangeQueryStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            this.loaderStore.resume();
        }
    }

    createDateCreatedDateRangeQueryStore() {
        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore();
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'coreUser.userName',
                    title: 'DONOR.DONOR_RECORD_ACTIVITY.LIST.COLUMNS.USERNAME'
                },
                {
                    key: 'userAction',
                    title: 'DONOR.DONOR_RECORD_ACTIVITY.LIST.COLUMNS.USER_ACTION',
                    format: {
                        type: 'function',
                        value: (item) => {
                            return item.userAction == 1 ? 'Create' : item.userAction == 2 ? 'Update' : 'Delete'
                        }
                    }
                },
                {
                    key: 'json',
                    title: 'DONOR.DONOR_RECORD_ACTIVITY.LIST.COLUMNS.DESCRIPTION',
                    format: {
                        type: 'function',
                        value: (item) => { return JSON.parse(item.json) }
                    }
                },
                {
                    key: 'dateCreated',
                    title: 'DONOR.DONOR_RECORD_ACTIVITY.LIST.COLUMNS.DATE_CREATED',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'dateCreated',
                    title: 'DONOR.DONOR_RECORD_ACTIVITY.LIST.COLUMNS.TIME_CREATED',
                    format: {
                        type: 'function',
                        value: (item) => { return moment(item.dateCreated).format("hh:mm A"); }
                    }
                }
            ],
        }));
    }
}

export default DonorRecordActivityViewStore;
