import {
	BookletOrderStore,
} from 'application/common/booklet-order/stores';

class BookletOrderModuleStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.bookletOrderStore = new BookletOrderStore(this);
	}
}
export default BookletOrderModuleStore;
