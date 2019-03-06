import { moduleProviderFactory } from 'core/providers';
import { RoleList, RoleEdit } from 'modules/role/pages';

(function () {
  moduleProviderFactory.application.register({
    routes: [
      {
        name: 'master.app.main.role',
        pattern: '/roles',
        isPrivate: true,
        children: [
          {
            name: 'master.app.main.role.list',
            pattern: '',
            component: RoleList,
            authorization: 'coreRoleSection.read'
          },
          {
            name: 'master.app.main.role.edit',
            pattern: ':id',
            component: RoleEdit,
            authorization: 'coreRoleSection.update'
          }
        ]
      }
    ],
    menu: [
      {
        title: 'Application',
        subMenu: [
          {
            title: 'Roles',
            route: 'master.app.main.role.list',
            order: 2
          }
        ]
      }
    ]
  });
})();
