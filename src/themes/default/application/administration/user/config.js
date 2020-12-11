import { moduleProviderFactory } from 'core/providers';
import { UserList, UserEdit, UserCreate } from 'application/administration/user/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration.user',
                pattern: '/users',
                children: [
                    {
                        name: 'master.app.main.administration.user.list',
                        pattern: '',
                        component: UserList,
                        authorization: 'coreUserSection.read',
                        data: {
                            title: "USER.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.user.create',
                        pattern: '/create',
                        component: UserCreate,
                        authorization: 'coreUserSection.create',
                        data: {
                            title: "USER.CREATE.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.user.edit',
                        pattern: '/edit/:id',
                        component: UserEdit,
                        authorization: 'coreUserSection.update',
                        data: {
                            title: "USER.EDIT.TITLE"
                        }
                    },

                ]
            }
        ]
    });
})();
