import React from 'react'
import { BookletService } from "common/data";
import { BookletListFilter } from 'modules/main/booklet/models';
import { BaseBookletListViewStore } from 'modules/common/booklet/stores';
import ReactTooltip from 'react-tooltip'
import { formatDenomination } from 'core/utils';
import _ from 'lodash';

class BookletListViewStore extends BaseBookletListViewStore {
    constructor(rootStore) {
        const bookletService = new BookletService(rootStore.app.baasic.apiClient);
        let filter = new BookletListFilter();

        const listViewStore = {
            routes: {
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = ['bookletStatus', 'denominationType', 'certificates', 'certificates.certificateStatus'];
                    params.fields = [
                        'id',
                        'donorAccountId',
                        'dateUpdated',
                        'dateCreated',
                        'code',
                        'denominationType',
                        'denominationType.name',
                        'denominationType.value',
                        'denominationType.certificateAmount',
                        'denominationType.available',
                        'bookletStatus',
                        'bookletStatus.name',
                        'dateAssigned',
                        'createdByCoreUser',
                        'createdByCoreUser.userId',
                        'createdByCoreUser.firstName',
                        'createdByCoreUser.lastName',
                        'certificates',
                        'certificates.isActive',
                        'certificates.certificateStatus',
                        'certificates.certificateStatus.name',
                        'certificates.certificateStatus.abrv',
                    ];
                    const response = await bookletService.find(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true
            }
        };

        const config = {
            listViewStore: listViewStore
        }

        super(rootStore, config);
        this.bookletService = bookletService;

        const countTooltip =
            <React.Fragment>
                <span className='icomoon tiny icon-question-circle' data-tip data-for={'count'} />
                <ReactTooltip type='info' effect='solid' place="top" id={'count'}>
                    <p>CLEAN / USED / CANCELED | ACTIVE</p>
                </ReactTooltip>
            </React.Fragment>

        this.setColumns = [
            {
                key: 'code',
                title: 'CODE',
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'denominationType.name',
                title: 'DENOMINATION',
                type: 'function',
                function: (item) => { return formatDenomination(item.denominationType) }
            },
            {
                key: 'dateAssigned',
                title: 'ASSIGNEDON',
                type: 'date',
                format: 'YYYY-MM-DD HH:mm',
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'bookletStatus.name',
                title: 'STATUS',
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'certificates',
                title: 'COUNT',
                titleTooltip: countTooltip,
                type: 'function',
                function: (item) => {
                    const clean = _.filter(item.certificates, { certificateStatus: { abrv: 'clean' } }).length;
                    const used = _.filter(item.certificates, { certificateStatus: { abrv: 'used' } }).length;
                    const canceled = _.filter(item.certificates, { certificateStatus: { abrv: 'canceled' } }).length;
                    const active = _.filter(item.certificates, { isActive: true }).length;
                    return `${clean} / ${used} / ${canceled} | ${active}`;
                }
            },
            {
                key: 'dateCreated',
                title: 'DATECREATED',
                type: 'date',
                format: 'YYYY-MM-DD HH:mm',
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            }
        ];

        this.setActions = {
        }
    }
}

export default BookletListViewStore;