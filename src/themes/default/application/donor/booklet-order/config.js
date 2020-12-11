import { moduleProviderFactory } from 'core/providers';
import { BookletOrderList, BookletOrderCreate } from 'application/donor/booklet-order/pages';
import { RouterState } from 'mobx-state-router';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.donor.booklet-order',
                pattern: '/booklet-orders',
                children: [
                    {
                        name: 'master.app.main.donor.booklet-order.list',
                        pattern: '',
                        component: BookletOrderList,
                        authorization: 'theDonorsFundBookletOrderSection.read',
                        data: {
                            title: "BOOKLET_ORDER.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.donor.booklet-order.create',
                        pattern: '/create',
                        component: BookletOrderCreate,
                        authorization: 'theDonorsFundBookletOrderSection.create',
                        data: {
                            title: "BOOKLET_ORDER.CREATE.TITLE"
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
                                        routerStore.rootStore.notificationStore.warning('BOOKLET_ORDER.CREATE.MISSING_INITIAL_CONTRIBUTION');
                                        return Promise.reject(new RouterState('master.app.main.donor.contribution.create'));
                                    }
                                }
                                return Promise.resolve();
                            }
                    }
                ]
            }
        ]
    });
})();
