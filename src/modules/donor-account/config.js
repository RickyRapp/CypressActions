import { moduleProviderFactory } from 'core/providers';
import { DonorAccountList, DonorAccountEdit } from 'modules/donor-account/pages'
import { isSome } from 'core/utils';
import { RouterState } from 'mobx-state-router';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.donor.account',
                pattern: '/donor-account',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.main.donor.account.list',
                        pattern: '',
                        component: DonorAccountList,
                        authorization: 'theDonorsFundSection.read'
                    },
                    {
                        name: 'master.app.main.donor.account.edit',
                        pattern: 'edit/:id?',
                        component: DonorAccountEdit,
                        authorization: 'theDonorsFundSection.update'
                    }
                ]
            },
            {
                name: 'master.app.main.profile',
                pattern: '/profile',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.main.profile.edit',
                        pattern: '/:id?',
                        component: DonorAccountEdit,
                        authorization: 'theDonorsFundDonorSection.update',
                        withoutAuthorization: 'theDonorsFundSection.update',
                        beforeEnter: (fromState, toState, routerStore) => {
                            const { rootStore } = routerStore;
                            if (!isSome(toState.params.id)) {
                                if (rootStore && rootStore.authStore) {
                                    if (rootStore.authStore.hasPermission('theDonorsFundDonorSection.update')) {
                                        //donor
                                        return Promise.reject(new RouterState('master.app.main.profile.edit', { id: rootStore.authStore.user.id }));
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
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'Application',
                subMenu: [
                    {
                        title: 'Donors',
                        route: 'master.app.main.donor.account.list',
                        order: 3
                    },
                    {
                        title: 'Profile',
                        route: 'master.app.main.profile.edit',
                        order: 3
                    }
                ]
            }
        ]
    })
})();