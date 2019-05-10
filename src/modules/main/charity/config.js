import { moduleProviderFactory } from 'core/providers';
import { CharityEdit } from 'modules/main/charity/pages';

(function () {
  moduleProviderFactory.application.register({
    routes: [
      {
        name: 'master.app.main.charity',
        pattern: '/profile',
        children: [
          {
            name: 'master.app.main.charity.profile',
            pattern: '',
            component: CharityEdit,
            authorization: 'theDonorsFundCharitySection.update'
          },
        ]
      }
    ],
    menu: [
      {
        title: 'Application',
        subMenu: [
          {
            title: 'Profile',
            route: 'master.app.main.charity.profile',
            order: 6
          }
        ]
      }
    ]
  });
})();
