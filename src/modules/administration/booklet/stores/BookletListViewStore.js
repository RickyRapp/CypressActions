import React from 'react'
import { action } from 'mobx';
import { BookletService } from "common/data";
import { BookletListFilter } from 'modules/administration/booklet/models';
import { BaseBookletListViewStore } from 'modules/common/booklet/stores';
import { ModalParams } from 'core/models';
import NumberFormat from 'react-number-format';
import ReactTooltip from 'react-tooltip'
import { formatDenomination } from 'core/utils';
import _ from 'lodash';

class BookletListViewStore extends BaseBookletListViewStore {

    additionalFields = [
        'donorAccount',
        'donorAccount.id',
        'donorAccount.donorName'
    ];

    constructor(rootStore) {
        const bookletService = new BookletService(rootStore.app.baasic.apiClient);
        let filter = new BookletListFilter();

        const listViewStore = {
            routes: {
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = 'certificates,donorAccount,donorAccount.coreUser,donorAccount.companyProfile';
                    params.fields = _.union(this.fields, this.additionalFields);
                    const response = await bookletService.find(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter
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
                    <p>CLEAN / USED / CANCELED</p>
                </ReactTooltip>
            </React.Fragment>

        this.setColumns = [
            {
                key: 'code',
                title: 'CODE',
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'denominationTypeId',
                title: 'DENOMINATION',
                type: 'function',
                function: (item) => {
                    const value = _.find(this.denominationTypes, { id: item.denominationTypeId });
                    return formatDenomination(value);
                }
            },
            {
                key: 'donorAccount.donorName',
                title: 'DONORNAME'
            },
            {
                key: 'dateAssigned',
                title: 'ASSIGNEDON',
                type: 'date',
                format: 'YYYY-MM-DD HH:mm',
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'bookletStatusId',
                title: 'STATUS',
                type: 'function',
                function: (item) => _.find(this.bookletStatuses, { id: item.bookletStatusId }).name,
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'certificates',
                title: 'COUNT',
                titleTooltip: countTooltip,
                type: 'function',
                function: (item) => {
                    const clean = _.filter(item.certificates, { certificateStatusId: this.cleanCertificateStatusId }).length;
                    const used = _.filter(item.certificates, { certificateStatusId: this.usedCertificateStatusId }).length;
                    const canceled = _.filter(item.certificates, { certificateStatusId: this.canceledCertificateStatusId }).length;
                    return `${clean} / ${used} / ${canceled}`;
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