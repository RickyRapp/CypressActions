import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import {
    DonorBankAccountService
} from 'application/donor/services';
import { applicationContext } from 'core/utils';
import { FilterParams, ModalParams } from 'core/models';

@applicationContext
class DonorBankAccountViewStore extends BaseListViewStore {
    bankAccountService = null;

    constructor(rootStore, donorId) {
        super(rootStore, {
            name: 'bank-accounts',
            routes: {},
            queryConfig: {
                filter: new FilterParams(),
                disableUpdateQueryParams: true
            },
            actions: () => {
                this.bankAccountService = new DonorBankAccountService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'accountHolder'
                        ];
                        params.donorId = donorId;
                        params.orderBy = 'dateCreated';
                        params.orderDirection = 'desc';
                        const response = await this.bankAccountService.find({ userId: donorId, ...params });
                        return response.data;
                    }
                }
            }
        });

        this.donorId = donorId;
        this.bankAccountModal = new ModalParams({
            onClose: () => {
                this.bankAccountModal.data = {};
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'name',
                    title: 'BANK_ACCOUNT.LIST.COLUMNS.NAME_LABEL',
                    onClick: (bankAccount) => this.openBankAccountModal(bankAccount)
                },
                {
                    key: 'accountNumber',
                    title: 'BANK_ACCOUNT.LIST.COLUMNS.ACCOUNT_NUMBER_LABEL'
                },
                {
                    key: 'routingNumber',
                    title: 'BANK_ACCOUNT.LIST.COLUMNS.ROUTING_NUMBER_LABEL',
                    format: {
                        type: 'routing-number'
                    }
                },
                {
                    key: 'isThirdPartyAccount',
                    title: 'BANK_ACCOUNT.LIST.COLUMNS.IS_THIRD_PARTY_ACCOUNT_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                },
                {
                    key: 'accountHolder',
                    title: 'BANK_ACCOUNT.LIST.COLUMNS.ACCOUNT_HOLDER_ADDRESS_LABEL',
                    format: {
                        type: 'address',
                        value: 'full'
                    }
                },
                {
                    key: 'accountHolder.email',
                    title: 'BANK_ACCOUNT.LIST.COLUMNS.ACCOUNT_HOLDER_EMAIL_ADDRESS_LABEL'
                },
                {
                    key: 'accountHolder.number',
                    title: 'BANK_ACCOUNT.LIST.COLUMNS.ACCOUNT_HOLDER_PHONE_NUMBER_LABEL',
                    format: {
                        type: 'phone-number'
                    }
                },
                {
                    key: 'coreMediaVaultEntryId',
                    title: 'BANK_ACCOUNT.LIST.COLUMNS.IMAGE_LABEL',
                    format: {
                        type: 'image',
                        target: '_blank'
                    }
                },
            ],
            actions: {
                onEdit: (bankAccount) => this.openBankAccountModal(bankAccount),
                onDelete: (bankAccount) => this.deleteBankAccount(bankAccount),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            disablePaging: true
        }));
    }

    @action.bound
    async openBankAccountModal(bankAccount) {
        this.bankAccountModal.open(
            {
                editId: bankAccount ? bankAccount.id : null,
                bankAccount: bankAccount,
                donorId: this.donorId,
                onAfterAction: async () => {
                    this.queryUtility.fetch();
                    this.bankAccountModal.close();
                }
            }
        );
    }

    @action.bound
    async deleteBankAccount(bankAccount) {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to delete bank account?`,
            async () => {
                await this.bankAccountService.delete({ id: bankAccount.id, donorId: this.donorId });
                await this.queryUtility.fetch();
            }
        );
    }
}

export default DonorBankAccountViewStore;
