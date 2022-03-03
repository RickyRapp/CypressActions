import { BaseRouteService } from "core/services";

class remoteDepositRouteService extends BaseRouteService {
	constructor() {
		super("session");	
	}	
	
	find(filter) {
		return super.find(`${this.base}/{?searchQuery,page,rpp,sort,embed,fields}`, filter);
	}	
	
	get(id, options) {		
		return super.get(`${this.base}/{id}{?embed,fields}`, id, options);	
	}	
	
	create(resource) {		
		return super.create(this.base, resource);	
	}

	update(resource) {
		return super.update(`${this.base}/{id}`, resource);	
	}	
	
	delete(resource) {		
		return super.delete(`${this.base}/{id}`, resource);	
	}
}

export default remoteDepositRouteService;