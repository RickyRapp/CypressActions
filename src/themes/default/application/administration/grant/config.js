import { moduleProviderFactory } from 'core/providers';
import { GrantTab, GrantCreate, GrantEdit, ScheduledGrantEdit, GrantPreview } from 'application/administration/grant/pages';
import { RouterState } from 'mobx-state-router';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration.grant',
                pattern: '/grant',
                children: [
                    {
                        name: 'master.app.main.administration.grant.tab',
                        pattern: '',
                        component: GrantTab,
                        authorization: 'theDonorsFundGrantSection.read',
                        data: {
                            title: "GRANT.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.grant.create',
                        pattern: '/create/:id',
                        component: GrantCreate,
                        authorization: 'theDonorsFundGrantSection.create',
                        data: {
                            title: "GRANT.CREATE.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.grant.edit',
                        pattern: '/edit/:id',
                        component: GrantEdit,
                        authorization: 'theDonorsFundGrantSection.update',
                        data: {
                            title: "GRANT.EDIT.TITLE"
                        },
                        beforeEnter:
                            // eslint-disable-next-line
                            async (fromState, toState, routerStore) => {
                                const { grantStore } = routerStore.rootStore.application.administration;
                                let id = toState.params.id;
                                try {
                                    await grantStore.isEligibleForEdit(id);
                                    return Promise.resolve();
                                } catch ({ data }) {
                                    routerStore.rootStore.notificationStore.warning(data.message);
                                    return Promise.reject(new RouterState('master.app.main.administration.dashboard'));
                                }
                            }
                    },
                    {
                        name: 'master.app.main.administration.grant.scheduled-edit',
                        pattern: '/scheduled-edit/:id',
                        component: ScheduledGrantEdit,
                        authorization: 'theDonorsFundGrantSection.update',
                        data: {
                            title: "GRANT.EDIT.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.grant.preview',
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
