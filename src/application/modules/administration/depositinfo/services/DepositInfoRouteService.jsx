import { BaseRouteService } from "core/services";

class DepositInfoRouteService extends BaseRouteService {
	constructor() {
		super("deposit-info");	
	}	
	
	find(filter) {
		return super.find(`${this.base}/{?searchQuery,page,rpp,sort,embed,fields}`, filter);
	}	
	
	get(id, options) {		
		return super.get(`${this.base}/{id}{?embed,fields}`, id, options);	
	}	
	
	getIds() {		
		return super.get(`${this.base}/get-ids`);	
	}	

	create(resource) {		
		return super.create(this.base, resource);	
	}

	update(resource) {
		return super.update(`${this.base}/{?id,year}`, resource);	
	}
	
	delete(resource) {		
		return super.delete(`${this.base}/{id}`, resource);	
	}
}

export default DepositInfoRouteService;