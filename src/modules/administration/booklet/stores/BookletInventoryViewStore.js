import { action, observable, computed } from 'mobx';
import { BookletService, LookupService } from "common/data";
import { formatDenomination } from 'core/utils';
import { BaseListViewStore, TableViewStore } from "core/stores";
import _ from 'lodash';

class BookletInventoryViewStore extends BaseListViewStore {
    @observable denominationTypes = null;
    @observable bookletStatuses = null;

    constructor(rootStore) {
        const bookletService = new BookletService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            routes: {
            },
            actions: {
                find: async () => {
                    this.loaderStore.suspend();
                    const response = await bookletService.inventory();
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: null
            }
        });

        this.bookletService = bookletService;
        this.denominationTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'denomination-type');
        this.bookletStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'booklet-status');

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'denominationTypeId',
                        title: 'DENOMINATION',
                        type: 'function',
                        function: (item) => {
                            const value = _.find(this.denominationTypes, { id: item[0].denominationTypeId });
                            return formatDenomination(value);
                        }
                    },
                    {
                        key: 'clean',
                        title: 'CLEAN',
                        type: 'function',
                        function: (item) => {
                            return _.find(item, { bookletStatusId: this.cleanBookletStatusId, denominationTypeId: item[0].denominationTypeId }).count.toString();
                        }
                    },
                    {
                        key: 'assigned',
                        title: 'ASSIGNED',
                        type: 'function',
                        function: (item) => {
                            return _.find(item, { bookletStatusId: this.assignedBookletStatusId, denominationTypeId: item[0].denominationTypeId }).count.toString();
                        }
                    },
                    {
                        key: 'canceled',
                        title: 'CANCELED',
                        type: 'function',
                        function: (item) => {
                            return _.find(item, { bookletStatusId: this.canceledBookletStatusId, denominationTypeId: item[0].denominationTypeId }).count.toString();
                        }
                    }
                ],
                actions: {},
                actionsRender: {}
            })
        );
    }

    @action.bound async loadLookups() {
        const denominationTypeModels = await this.denominationTypeLookup.getAll();
        this.denominationTypes = denominationTypeModels.data;

        const bookletStatusModels = await this.bookletStatusLookup.getAll();
        this.bookletStatuses = bookletStatusModels.data;
    }

    @computed get cleanBookletStatusId() {
        return this.bookletStatuses ? _.find(this.bookletStatuses, { abrv: 'clean' }).id : null;
    }

    @computed get assignedBookletStatusId() {
        return this.bookletStatuses ? _.find(this.bookletStatuses, { abrv: 'assigned' }).id : null;
    }

    @computed get canceledBookletStatusId() {
        return this.bookletStatuses ? _.find(this.bookletStatuses, { abrv: 'canceled' }).id : null;
    }
}

export default BookletInventoryViewStore;