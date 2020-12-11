import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { EmailListFilter } from 'application/administration/email/models';
import { ModalParams } from 'core/models';
import { action } from 'mobx';

class EmailViewStore extends BaseListViewStore {
    constructor(rootStore, donorId, charityId) {
        let filter = new EmailListFilter('dateCreated', 'desc');
        filter.donorId = donorId;
        filter.charityId = charityId;

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
                        return rootStore.application.administration.emailStore.findEmail(params);
                    }
                }
            }
        });

        this.createTableStore();
        this.createEmailTypeDropdownStore();
        this.createEmailSenderDropdownStore();
        this.previewModal = new ModalParams({});
    }

    @action.bound
    openPreviewModal(content) {
        this.previewModal.open({
            content: content
        });
    }

    createTableStore() {
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
    }

    createEmailTypeDropdownStore() {
        this.emailTypeDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.emailTypeStore.find();
                },
                onChange: (emailType) => {
                    this.queryUtility.filter.emailTypeIds = emailType.map((type) => { return type.id });
                }
            });
    }

    createEmailSenderDropdownStore() {
        this.emailSenderDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.emailSenderStore.find();
                },
                onChange: (emailSender) => {
                    this.queryUtility.filter.emailSenderIds = emailSender.map((sender) => { return sender.id });
                }
            });
    }
}

export default EmailViewStore;
