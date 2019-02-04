import { action, observable } from 'mobx';
import { isSome } from 'core/utils';

class QueryModel {
  @observable embed;
  @observable fields;
  @observable item;
  @observable page;
  @observable recordsPerPage;
  @observable searchQuery;
  @observable sort;
  @observable totalRecords;

  @action set(response) {
    if (!isSome(response)) {
      return this.reset();
    }

    this.embed = response.embed;
    this.fields = response.fields;
    this.item = response.item;
    this.page = response.page;
    this.recordsPerPage = response.recordsPerPage;
    this.searchQuery = response.searchQuery;
    this.sort = response.sort;
    this.totalRecords = response.totalRecords;
  }

  @action reset() {
    this.embed = null;
    this.fields = null;
    this.item = null;
    this.page = null;
    this.recordsPerPage = null;
    this.searchQuery = null;
    this.sort = null;
    this.totalRecords = null;
  }
}

export default QueryModel;
