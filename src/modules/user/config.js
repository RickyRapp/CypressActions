import { moduleProviderFactory } from 'core/providers';
import { UserList, UserEdit, UserCreate } from 'modules/user/pages';

(function() {
  moduleProviderFactory.application.register({
    routes: [
      {
        name: 'master.app.main.user',
        pattern: '/users',
        isPrivate: true,
        children: [
          {
            name: 'master.app.main.user.list',
            pattern: '',
            component: UserList
          },
          {
            name: 'master.app.main.user.create',
            pattern: 'create',
            component: UserCreate
          },
          {
            name: 'master.app.main.user.edit',
            pattern: ':id',
            component: UserEdit
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
            route: 'master.app.main.user.list',
            order: 1
          }
        ]
      }
    ]
  });
})();
