import { moduleProviderFactory } from 'core/providers';
import { MasterLayout } from 'core/layouts';

(function () {
    moduleProviderFactory.common.register({
        routes: [
            {
                name: 'master',
                pattern: '/app',
                component: [MasterLayout],
                children: [
                    {
                        name: 'master.app',
                        pattern: '',
                        hookCondition:
                            // eslint-disable-next-line
                            (fromState, toState, routerStore) => {
                                return fromState.params.applicationIdentifier !== toState.params.applicationIdentifier;
                            },
                        beforeEnter:
                            // eslint-disable-next-line
                            async (fromState, toState, routerStore) => {
                                const { authStore } = routerStore.rootStore;

                                try {
                                    await authStore.initialize();
                                } catch (ex) {
                                    return Promise.reject(ex);
                                }

                                return Promise.resolve();
                            },
                    }
                ]
            },
        ],
    });
})();
