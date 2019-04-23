import { moduleProviderFactory } from 'core/providers';
import { RoleList, RoleEdit } from 'modules/administration/role/pages';

(function () {
  moduleProviderFactory.application.register({
    routes: [
      {
        name: 'master.app.administration.role',
        isPrivate: true,
        children: [
          {
            name: 'master.app.administration.role.list',
            pattern: '',
            component: RoleList,
            authorization: 'coreRoleSection.read'
          },
          {
            name: 'master.app.administration.role.edit',
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
            route: 'master.app.administration.role.list',
            order: 5
          }
        ]
      }
    ]
  });
})();
