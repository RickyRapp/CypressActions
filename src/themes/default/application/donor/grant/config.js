import { moduleProviderFactory } from 'core/providers';
import { GrantCreate, GrantEdit, ScheduledGrantEdit, ScheduledGrantPreview, GrantPreview } from 'application/donor/grant/pages';
import { RouterState } from 'mobx-state-router';

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
                        name: 'master.app.main.donor.grant.scheduled-preview',
                        pattern: '/scheduled-preview/:id',
                        component: ScheduledGrantPreview,
                        authorization: 'theDonorsFundGrantSection.read',
                        data: {
                            title: "GRANT.SCHEDULED_GRANT.PREVIEW.TITLE"
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
