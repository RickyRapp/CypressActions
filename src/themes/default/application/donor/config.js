import { DonorModuleStore } from 'application/donor/module';
import { moduleProviderFactory } from 'core/providers';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.donor',
                pattern: '/donor',
                role: ['Users'],
            },
        ],
        menu: [
            {
                title: 'MENU.GIVE',
                icon: 'give',
                order: 1,
                role: ['Users'],
                route: 'master.app.main.donor.grant.create'
            },
            {
                title: 'MENU.DASHBOARD',
                icon: 'dashboard',
                order: 2,
                route: 'master.app.main.donor.dashboard',
                role: ['Users']
            },
            {
                title: 'MENU.ACTIVITY',
                icon: 'activity',
                order: 3,
                route: 'master.app.main.donor.activity',
                role: ['Users']
            },
            {
                title: 'MENU.DEPOSITS',
                icon: 'contribution',
                order: 4,
                route: 'master.app.main.donor.contribution.create',
                role: ['Users']
            },
            {
                title: 'MENU.SEND_A_GIFT',
                icon: 'transfer-funds',
                order: 5,
                route: 'master.app.main.donor.donor-donor.create',
                role: ['Users']
            },
            // {
            //   title: 'MENU.INVESTMENTS',
            //     icon: 'investment',
            //    order: 5,
            //    route: 'master.app.main.donor.investment.donor',
            //    role: ['Users']
            // },
            {
                title: 'MENU.ORDER_VOUCHERS',
                icon: 'booklet-order',
                order: 6,
                route: 'master.app.main.donor.booklet-order.create',
                role: ['Users']
                //commented because this page isn't currently used
                //subMenu: [ 
                    // {
                    //     title: 'MENU.GIVING_GOALS',
                    //     icon: 'grant',
                    //     order: 3,
                    //     role: ['Users'],
                    //     route: 'master.app.main.donor.giving-goals.create'
                    // },
                //]
            },
            {
                title: 'MENU.PROFILE_SETTING',
                icon: 'profile',
                order: 7,
                role: ['Users'],
                route: 'master.app.main.donor.profile'
            },
        ],
        moduleStore: function (context) {
            return {
                'application.donor': new DonorModuleStore(context.rootStore),
            };
        },
    });
})();
