import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { SessionService } from 'application/administration/session/services';
import { applicationContext } from 'core/utils';
import { SessionListFilter } from 'application/administration/session/models';

@applicationContext
class SessionInProgressViewStore extends BaseListViewStore {
    constructor(rootStore) {
        let filter = new SessionListFilter()
        const service = new SessionService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'session',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {
                continue: (key) =>
                    this.rootStore.routerStore.goTo(
                        'master.app.main.session.create', null, { key: key }
                    )
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true,
            },
            actions: () => {
                return {
                    find: async (params) => {
                        const response = await service.findSessionInProgress(params);
                        const data = {
                            item: response.data.response
                        }
                        return data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'key',
                    title: 'SESSION.LIST.IN_PROGRESS.COLUMNS.KEY_LABEL',
                    onClick: (item) => this.routes.continue(item.key),
                },
                {
                    key: 'fullName',
                    title: 'SESSION.LIST.IN_PROGRESS.COLUMNS.FULL_NAME_LABEL'
                },
                {
                    key: 'phoneNumber',
                    title: 'SESSION.LIST.IN_PROGRESS.COLUMNS.PHONE_NUMBER_LABEL',
                },
                {
                    key: 'email',
                    title: 'SESSION.LIST.IN_PROGRESS.COLUMNS.EMAIL_LABEL'
                },
                {
                    key: 'charityName',
                    title: 'SESSION.LIST.IN_PROGRESS.COLUMNS.CHARITY_NAME_LABEL'
                },
                {
                    key: 'taxId',
                    title: 'SESSION.LIST.IN_PROGRESS.COLUMNS.TAX_ID_LABEL'
                },
                {
                    key: 'charityEmail',
                    title: 'SESSION.LIST.IN_PROGRESS.COLUMNS.CHARITY_EMAIL_LABEL'
                },
                {
                    key: 'isActive',
                    title: 'SESSION.LIST.IN_PROGRESS.COLUMNS.IS_ACTIVE_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                },
                {
                    key: 'sessionCertificates',
                    title: 'SESSION.LIST.IN_PROGRESS.COLUMNS.SESSION_CERTIFICATES_LABEL',
                    format: {
                        type: 'function',
                        value: this.renderSessionCertificates
                    }
                }
            ],
            actions: {
                onSetInactive: (session) => this.inActivateSession(session),
                onRemove: (session) => this.onRemoveFromCache(session.key),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onSetInactiveRender: (session) => {
                    return session.isActive;
                },
                onRemoveFromCacheRender: (session) => {
                    return !session.isActive;
                }
            },
            disablePaging: true
        }));

        this.service = service;
    }

    renderSessionCertificates(item) {
        return item.sessionCertificates.length;
    }

    @action.bound
    async inActivateSession(session) {
        this.loaderStore.suspend();
        try {
            await this.service.inActivateSession({ key: session.key });
        } catch (err) {
            if (err.data) {
                if (err.data.statusCode === 4000000002) {
                    this.rootStore.notificationStore.error('SESSION.LIST.IN_PROGRESS.SESSION_ALREADY_ACTIVE_ERROR', err);
                }
                else if (err.data.statusCode === 4040020000) {
                    this.rootStore.notificationStore.error('SESSION.LIST.IN_PROGRESS.SESSION_NOT_FOUND_ERROR', err);
                }
            }
            else {
                this.rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_UPDATE');
            }
        }
        this.rootStore.notificationStore.success('Successfully deactivated session');
        await this.queryUtility.fetch();
        this.loaderStore.resume();
    }

    @action.bound
    async onRemoveFromCache(key) {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to remove session from cache?`,
            async () => {
                await this.service.removeSessionFromCache({ key: key });
                await this.queryUtility.fetch();
                this.rootStore.notificationStore.success(`Successfully removed from cache`);
            }
        );
    }
}

export default SessionInProgressViewStore;
