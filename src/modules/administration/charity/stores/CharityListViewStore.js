import { action } from 'mobx';
import { CharityService } from "common/data";
import { CharityListFilter } from 'modules/administration/charity/models';
import { BaseCharityListViewStore } from 'modules/common/charity/stores';
import { ModalParams } from 'core/models';
import { formatCharityTaxId, getFormattedPrimaryAddress } from 'core/utils';
import _ from 'lodash';

class CharityListViewStore extends BaseCharityListViewStore {
    constructor(rootStore) {
        const charityService = new CharityService(rootStore.app.baasic.apiClient);
        let filter = new CharityListFilter();

        const listViewStore = {
            name: 'contribution',
            routes: {
                edit: (charityId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.charity.edit', {
                        userId: charityId,
                    }),
                create: () => {
                    this.rootStore.routerStore.navigate('master.app.administration.charity.create')
                }
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = 'charityAddresses,charityAddresses.address,emailAddress';
                    params.fields = [
                        'id',
                        'name',
                        'taxId',
                        'charityStatusId',
                        'charityTypeId',
                        'emailAddress',
                        'emailAddress.email',
                        'charityAddresses',
                        'charityAddresses.primary',
                        'charityAddresses.address',
                        'charityAddresses.address.addressLine1',
                        'charityAddresses.address.addressLine2',
                        'charityAddresses.address.city',
                        'charityAddresses.address.state',
                        'charityAddresses.address.zipCode'
                    ];
                    const response = await charityService.find(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter
            }
        };

        const config = {
            listViewStore: listViewStore,
            setSelectedExportColumnsName: ['Type'],
            setAdditionalExportColumnsName: ['Date Created']
        }

        super(rootStore, config);
        this.charityService = charityService;

        this.setColumns = [
            {
                key: 'name',
                title: 'Name',
                onClick: charity => this.routes.edit(charity.id)
            },
            {
                key: 'taxId',
                title: 'Tax ID',
                type: 'function',
                function: (item) => formatCharityTaxId(item.taxId)
            },
            {
                key: 'charityAddresses',
                title: 'Address',
                type: 'function',
                function: (item) => item ? getFormattedPrimaryAddress(item.charityAddresses) : ''
            },
            {
                key: 'charityStatusId',
                title: 'Status',
                type: 'function',
                function: (item) => _.find(this.charityStatuses, { id: item.charityStatusId }).name
            },
            {
                key: 'charityTypeId',
                title: 'Type',
                type: 'function',
                function: (item) => _.find(this.charityTypes, { id: item.charityTypeId }).name
            },
            {
                key: 'emailAddress.email',
                title: 'Email Address',
            },
        ];

        this.setActions = {
            onEdit: charity => this.routes.edit(charity.id),
            onReview: charity => this.onReviewClick(charity.id),
        }

        this.reviewCharityModalParams = new ModalParams({
            onClose: this.onClose,
            notifyOutsideClick: true
        });
    }

    @action.bound async onReviewClick(id) {
        this.reviewId = id;
        this.reviewCharityModalParams.open();
    }

    @action.bound async onAfterReviewCharity() {
        this.queryUtility._reloadCollection();
        this.reviewCharityModalParams.close();
    }
}


export default CharityListViewStore;