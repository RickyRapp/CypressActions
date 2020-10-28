import {
    BookletStore,
} from 'application/booklet/stores';

class BookletModuleStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.bookletStore = new BookletStore(this);
    }
}
export default BookletModuleStore;
