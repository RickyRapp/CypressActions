import { moduleProviderFactory } from 'core/providers';
import { RouterState } from 'mobx-state-router';
import { ContributionList, ContributionCreate, ContributionEdit, ContributionDetails } from 'modules/contribution/pages'
import { ContributionSettingList } from 'modules/contribution-setting/pages'
import { isSome, getAppRouterState } from 'core/utils';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.contribution',
                pattern: 'contribution',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.main.contribution.list',
                        pattern: '/:id?',
                        component: ContributionList,
                        authorization: 'theDonorsFundContributionSection.read',
                        beforeEnter: (fromState, toState, routerStore) => {
                            const { rootStore } = routerStore;
                            if (!isSome(toState.params.id)) {
                                if (rootStore && rootStore.authStore) {
                                    if (rootStore.authStore.hasPermission('theDonorsFundSection.read')) {
                                        //admin or employee
                                    }
                                    else if (rootStore.authStore.hasPermission('theDonorsFundDonorSection.update')) {
                                        //donor
                                        return Promise.reject(new RouterState('master.app.main.contribution.list', { id: rootStore.authStore.user.id }));
                                    }
                                    else {
                                        //TODO:
                                        //this is reporter role
                                        //fetch userId from local storage
                                    }
                                }
                                else {
                                    rootStore.viewStore.logout()
                                    return Promise.reject();
                                }
                            }
                            return Promise.resolve();
                        },
                    },
                    {
                        name: 'master.app.main.contribution.create',
                        pattern: ':id/create',
                        component: ContributionCreate,
                        authorization: 'theDonorsFundContributionSection.create'
                    },
                    {
                        name: 'master.app.main.contribution.edit',
                        pattern: ':id/edit/:contributionId',
                        component: ContributionEdit,
                        authorization: 'theDonorsFundContributionSection.update'
                    },
                    {
                        name: 'master.app.main.contribution.details',
                        pattern: ':id/details/:contributionId',
                        component: ContributionDetails,
                        authorization: 'theDonorsFundContributionSection.read'
                    },
                    {
                        name: 'master.app.main.contribution.setting',
                        pattern: ':id/setting',
                        component: ContributionSettingList,
                        authorization: 'theDonorsFundContributionSection.update'
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'Application',
                subMenu: [
                    {
                        title: 'Contributions',
                        route: 'master.app.main.contribution.list',
                        order: 5
                    }
                ]
            }
        ]
    })
})();