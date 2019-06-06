import { action, observable } from 'mobx';
import { CharityService, LookupService } from "common/data";
import { CharityListFilter } from 'modules/administration/charity/models';
import { BaasicDropdownStore, BaseListViewStore, TableViewStore } from "core/stores";
import { getFormattedPrimaryAddress } from 'core/utils';
import { ModalParams } from 'core/models';
import _ from 'lodash';

class CharityListViewStore extends BaseListViewStore {
    @observable charityTypeDropdownStore = null;
    @observable charityStatusDropdownStore = null;
    charityStatuses = null;
    charityTypes = null;
    @observable reviewId = null;

    constructor(rootStore) {
        const charityService = new CharityService(rootStore.app.baasic.apiClient);
        let filter = new CharityListFilter();

        super(rootStore, {
            name: 'contribution',
            routes: {
                edit: (charityId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.charity.edit', {
                        id: charityId,
                    }),
                create: () => {
                    this.rootStore.routerStore.navigate('master.app.administration.charity.create')
                }
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = 'charityStatus,charityType,charityAddresses,address,emailAddress';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await charityService.find(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter
            }
        });

        this.charityService = charityService;
        this.charityStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'charity-status');
        this.charityTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'charity-type');

        this.selectedExportColumnsName = ['Name', 'Charity Type'];
        this.additionalExportColumnsName = ['Charity Status'];

        this.reviewCharityModalParams = new ModalParams({
            onClose: this.onClose,
            notifyOutsideClick: true
        });

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        await this.setFilterDropdownStores();

        const renderAddress = (item) => {
            if (item && item.charityAddresses && item.charityAddresses.length > 0)
                return getFormattedPrimaryAddress(item.charityAddresses)
            else
                return null;
        }

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'name',
                        title: 'Name',
                        onClick: charity => this.routes.edit(charity.id)
                    },
                    {
                        key: 'taxId',
                        title: 'Tax ID'
                    },
                    {
                        key: 'charityAddresses',
                        title: 'Address',
                        type: 'function',
                        function: renderAddress
                    },
                    {
                        key: 'charityStatusId',
                        title: 'Status',
                        type: 'lookup',
                        lookup: this.charityStatuses
                    },
                    {
                        key: 'charityTypeId',
                        title: 'Type',
                        type: 'lookup',
                        lookup: this.charityTypes
                    },
                    {
                        key: 'emailAddress.email',
                        title: 'Email Address',
                    },
                ],
                actions: {
                    onEdit: charity => this.routes.edit(charity.id),
                    onReview: charity => this.onReviewClick(charity.id),
                }
            })
        );

        this.loaded = true;
    }

    @action.bound async onReviewClick(id) {
        this.reviewId = id;
        this.reviewCharityModalParams.open();
    }

    @action.bound async onAfterReviewCharity() {
        this.queryUtility._reloadCollection();
        this.reviewCharityModalParams.close();
    }

    @action.bound async loadLookups() {
        let charityTypeModels = await this.charityTypeLookup.getAll();
        this.charityTypes = charityTypeModels.data;

        let charityStatusModels = await this.charityStatusLookup.getAll();
        this.charityStatuses = charityStatusModels.data;
    }

    @action.bound async setFilterDropdownStores() {
        this.charityTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: true,
                placeholder: 'Choose Charity Type',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: true
            },
            {
                onChange: (options) => this.queryUtility.filter.charityTypeIds = (options ? _.map(options, item => { return item.id }) : null)
            },
            _.map(_.orderBy(this.charityTypes, ['sortOrder'], ['asc']), item => { return { id: item.id, name: item.name } })
        );

        this.charityStatusDropdownStore = new BaasicDropdownStore(
            {
                multi: true,
                placeholder: 'Choose Charity Status',
                textField: 'name',
                dataItemKey: 'id',
                clearable: true
            },
            {
                onChange: (options) => this.queryUtility.filter.charityStatusIds = (options ? _.map(options, item => { return item.id }) : null)
            },
            _.map(_.orderBy(this.charityStatuses, ['sortOrder'], ['asc']), item => { return { id: item.id, name: item.name } })
        );
    }
}


export default CharityListViewStore;