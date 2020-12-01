import { moduleProviderFactory } from 'core/providers';
import { BookletOrderList, BookletOrderCreate, BookletOrderReview } from 'application/booklet-order/pages';
import { BookletOrderModuleStore } from 'application/booklet-order/stores';
import { RouterState } from 'mobx-state-router';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.booklet-order',
                pattern: '/booklet-orders',
                children: [
                    {
                        name: 'master.app.main.booklet-order.list',
                        pattern: '',
                        component: BookletOrderList,
                        authorization: 'theDonorsFundBookletOrderSection.read',
                        data: {
                            title: "BOOKLET_ORDER.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.booklet-order.create',
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
                                        return Promise.reject(new RouterState('master.app.main.contribution.create'));
                                    }
                                }
                                return Promise.resolve();
                            }
                    },
                    {
                        name: 'master.app.main.booklet-order.review',
                        pattern: '/review/:id',
                        component: BookletOrderReview,
                        authorization: 'theDonorsFundBookletOrderSection.review',
                        data: {
                            title: "BOOKLET_ORDER.REVIEW.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.BOOKLET_ORDERS',
                icon: 'booklet-order',
                order: 4,
                route: 'master.app.main.booklet-order.list',
                role: ['Administrators']
            }
        ],
        moduleStore: function (context) {
            return {
                'application.bookletOrder': new BookletOrderModuleStore(context.rootStore),
            };
        },
    });
})();
