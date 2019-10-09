import _ from 'lodash';
import { ModuleProvider } from 'core/providers';

class ModuleProviderFactory {
    common = new ModuleProvider('common');
    application = new ModuleProvider('application');

    get(name) {
        if (this[name] === undefined) {
            this[name] = new ModuleProvider(name);
        }

        return this[name];
    }

    find(names) {
        return _.map(names, (name) => this.get(name));
    }
}

export default new ModuleProviderFactory();