import { BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class CharityWithdrawFundsViewStore extends BaseViewStore {

    constructor(rootStore) {
        super(rootStore);
    }
}

export default CharityWithdrawFundsViewStore;
