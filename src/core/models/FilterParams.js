import { observable, action, reaction } from 'mobx';
import { isSome } from 'core/utils';

class FilterParams {
  @observable pageNumber;
  @observable pageSize;
  @observable orderBy;
  @observable orderDirection;
  @observable embed;
  @observable search;
  @observable fields;

  constructor() {
    this.reset();

    reaction(
      () => this.search,
      search => {
        this.search = isSome(search) && search !== '' ? search : undefined;
      }
    );
  }

  @action reset() {
    this.pageNumber = 1;
    this.pageSize = 10;
    this.orderBy = null;
    this.orderDirection = null;
    this.embed = null;
    this.search = null;
    this.fields = null;
  }
}

export default FilterParams;
