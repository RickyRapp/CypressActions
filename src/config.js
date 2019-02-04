import { moduleProviderFactory } from 'core/providers';
import { MasterLayout } from 'core/layouts';
import { NotFound, DisplayError } from 'modules/root/pages';

(function() {
  moduleProviderFactory.common.register({
    routes: [
      {
        name: 'master',
        pattern: '',
        component: [MasterLayout],
        beforeEnter: async (fromState, toState, routerStore) => {
          const {
            rootStore: { appStore }
          } = routerStore;
          appStore.initialize();
        },
        children: [
          {
            name: 'master.error',
            pattern: '/error',
            component: DisplayError
          },
          {
            name: 'master.not-found',
            pattern: '/not-found',
            component: NotFound
          }
        ]
      }
    ]
  });
})();
