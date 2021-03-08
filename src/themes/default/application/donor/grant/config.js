import { moduleProviderFactory } from 'core/providers';
import { GrantCreate, GrantEdit, ScheduledGrantEdit, GrantPreview } from 'application/donor/grant/pages';
import { RouterState } from 'mobx-state-router';
import moment from 'moment';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.donor.grant',
                pattern: '/grant',
                children: [
                    {
                        name: 'master.app.main.donor.grant.create',
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
                                        return Promise.reject(new RouterState('master.app.main.donor.contribution.create'));
                                    }
                                }
                                return Promise.resolve();
                            }
                    },
                    {
                        name: 'master.app.main.donor.grant.edit',
                        pattern: '/edit/:id',
                        component: GrantEdit,
                        authorization: 'theDonorsFundGrantSection.update',
                        data: {
                            title: "GRANT.EDIT.TITLE"
                        },
                        beforeEnter:
                            // eslint-disable-next-line
                            async (fromState, toState, routerStore) => {
                                const { grantStore } = routerStore.rootStore.application.donor;
                                let id = toState.params.id;
                                try {
                                    await grantStore.isEligibleForEdit(id);
                                    return Promise.resolve();
                                } catch ({ data }) {
                                    routerStore.rootStore.notificationStore.warning(data.message);
                                    return Promise.reject(new RouterState('master.app.main.donor.dashboard'));
                                }
                            }
                    },
                    {
                        name: 'master.app.main.donor.grant.scheduled-edit',
                        pattern: '/scheduled-edit/:id',
                        component: ScheduledGrantEdit,
                        authorization: 'theDonorsFundGrantSection.update',
                        data: {
                            title: "GRANT.EDIT.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.donor.grant.preview',
                        pattern: '/preview/:id',
                        component: GrantPreview,
                        authorization: 'theDonorsFundGrantSection.read',
                        data: {
                            title: "GRANT.PREVIEW.TITLE"
                        }
                    }
                ]
            }
        ]
    });
})();
