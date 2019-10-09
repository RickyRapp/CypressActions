import { localizationService } from 'core/services';

const translate = (dicts = []) => (value, opts = undefined) => {
    var options = null;
    if (dicts.length > 0 || opts !== undefined) {
        var opt = opts ? { ...opts } : {};

        if (dicts.length > 0) {
            opt.ns = [...dicts];
        }
    }    
    return localizationService.t(value, options);
}

export default translate;