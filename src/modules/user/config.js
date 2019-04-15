import { moduleProviderFactory } from 'core/providers';
import { UserList, UserEdit, UserCreate } from 'modules/user/pages';

(function () {
  moduleProviderFactory.application.register({
    routes: [
      {
        name: 'master.app.administration.user',
        pattern: '/users',
        isPrivate: true,
        roles: 'administrators',
        children: [
          {
            name: 'master.app.administration.user.list',
            pattern: '',
            component: UserList,
            authorization: 'theDonorsFundAdministrationSection.read'
          },
          {
            name: 'master.app.administration.user.create',
            pattern: 'create',
            component: UserCreate,
            authorization: 'theDonorsFundAdministrationSection.create'
          },
          {
            name: 'master.app.administration.user.edit',
            pattern: ':id',
            component: UserEdit,
            authorization: 'theDonorsFundAdministrationSection.update'
          }
        ]
      }
    ],
    menu: [
      {
        title: 'Application',
        icon: 'cog',
        subMenu: [
          {
            title: 'Users',
            route: 'master.app.administration.user.list',
            order: 6
          }
        ]
      }
    ]
  });
})();
