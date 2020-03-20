import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { EmailService } from 'application/email/services';
import { EmailListFilter } from 'application/email/models';
import { LookupService } from 'common/services';
import _ from 'lodash';
import { ModalParams } from 'core/models';
import { action } from 'mobx';

class EmailViewStore extends BaseListViewStore {
    constructor(rootStore, donorAccountId, charityId) {
        let filter = new EmailListFilter('dateCreated', 'desc');
        filter.donorAccountId = donorAccountId;
        filter.charityId = charityId;
        const service = new EmailService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'email',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {},
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'emailType',
                            'emailSender'
                        ];
                        params.fields = [
                            'subject',
                            'emailType',
                            'emailSender',
                            'dateCreated',
                            'htmlBody',
                            'to'
                        ];
                        const response = await service.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'subject',
                    title: 'EMAIL.LIST.COLUMNS.SUBJECT_LABEL',
                },
                {
                    key: 'emailType.name',
                    title: 'EMAIL.LIST.COLUMNS.EMAIL_TYPE_NAME_LABEL',
                },
                {
                    key: 'to',
                    title: 'EMAIL.LIST.COLUMNS.TO_LABEL',
                },
                {
                    key: 'emailSender.name',
                    title: 'EMAIL.LIST.COLUMNS.EMAIL_SENDER_LABEL',
                },
                {
                    key: 'dateCreated',
                    title: 'EMAIL.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onPreview: (item) => {
                    const newWindow = window.open();
                    newWindow.document.open();
                    newWindow.document.write(item.htmlBody);
                    newWindow.document.close();
                },
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));

        this.emailTypeDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'email-type');
                    const response = await service.getAll();
                    return response.data;
                },
                onChange: (emailType) => {
                    this.queryUtility.filter['emailTypeIds'] = _.map(emailType, (type) => { return type.id });
                }
            });

        this.emailSenderDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'email-type');
                    const response = await service.getAll();
                    return response.data;
                },
                onChange: (emailSender) => {
                    this.queryUtility.filter['emailSenderIds'] = _.map(emailSender, (sender) => { return sender.id });
                }
            });

        this.previewModal = new ModalParams({});
    }

    @action.bound
    openPreviewModal(content) {
        this.previewModal.open({
            content: content
        });
    }
}

export default EmailViewStore;
