import { BaseRouteService } from 'core/services';

class ReconcileRouteService extends BaseRouteService {
    constructor() {
        super('reconcile');
    }

    find(filter) {
        return super.find(this.base + '/{?search,paymentTypeIds,page,rpp,sort,embed,fields,charityId}', filter);
    }

    checkUpdate(resource) {
        return super.update(this.base + '/check/{id}', resource);
    }

    generateReport(resource) {
        return super.update(this.base + '/generate-report', resource);
    }

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }

    uploadFile(resource) {
        return super.update(this.base+'/checks-upload', resource, 
        {
            'content-type': 'multipart/form-data'
		});
    }

    getGrants(resource){
        return super.get(this.base + '/charity/reconcile-grants/' + '{id}', resource);
    }

    getReconcileDetailsByCwtId(resource){
        return super.get(this.base + '/detailed/' + '{id}', resource);
    }

}

export default ReconcileRouteService;
