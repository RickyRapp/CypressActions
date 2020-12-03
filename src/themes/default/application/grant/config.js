import { moduleProviderFactory } from 'core/providers';
import { GrantList, GrantCreate, GrantEdit, ScheduledGrantEdit, GrantPreview } from 'application/grant/pages';
import { GrantModuleStore } from 'application/grant/stores';
import GrantRequest from 'application/grant/pages/GrantRequest';
import { RouterState } from 'mobx-state-router';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.grant',
                pattern: '/grant',
                children: [
                    {
                        name: 'master.app.main.grant.list',
                        pattern: '',
                        component: GrantList,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "GRANT.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.grant.create',
                        pattern: '/create',
                        component: GrantCreate,
                        authorization: 'theDonorsFundGrantSection.create',
                        data: {
                            title: "GRANT.CREATE.TITLE"
                        },
                        beforeEnter:
                            // eslint-disable-next-line
                            async (fromState, toState, routerStore) => {
                                const { donor: { donorStore } } = routerStore.rootStore.application;

                                if (!routerStore.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
                                    let donorId = routerStore.rootStore.userStore.user.id;
                                    const data = await donorStore.getDonor(donorId, { fields: 'isInitialContributionDone' });
                                    if (data.isInitialContributionDone) {
                                        return Promise.resolve();
                                    }
                                    else {
                                        routerStore.rootStore.notificationStore.warning('GRANT.CREATE.MISSING_INITIAL_CONTRIBUTION');
                                        return Promise.reject(new RouterState('master.app.main.contribution.create'));
                                    }
                                }
                                return Promise.resolve();
                            }
                    },
                    {
                        name: 'master.app.main.grant.edit',
                        pattern: '/edit/:editId',
                        component: GrantEdit,
                        authorization: 'theDonorsFundGrantSection.update',
                        data: {
                            title: "GRANT.EDIT.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.grant.scheduled-edit',
                        pattern: '/scheduled-edit/:id/:editId',
                        component: ScheduledGrantEdit,
                        authorization: 'theDonorsFundGrantSection.update',
                        data: {
                            title: "GRANT.EDIT.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.grant.preview',
                        pattern: '/preview/:editId',
                        component: GrantPreview,
                        authorization: 'theDonorsFundGrantSection.read',
                        data: {
                            title: "GRANT.PREVIEW.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.grant.request',
                        pattern: '/request',
                        component: GrantRequest,
                        authorization: 'theDonorsFundCharitySection.update',
                        data: {
                            title: "GRANT_REQUEST.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.GRANTS',
                icon: 'grant',
                order: 3,
                role: ['Administrators'],
                route: 'master.app.main.grant.list'
            }
        ],
        moduleStore: function (context) {
            return {
                'application.grant': new GrantModuleStore(context.rootStore),
            };
        },
    });
})();
