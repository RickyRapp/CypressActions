import React from 'react';
import PropTypes from 'prop-types';
import { action, observable } from 'mobx';
import { setCurrentView, defaultTemplate } from 'core/utils';
import { TableFilterTemplate } from 'themes/components';


class TableFilterStore {
  @observable filterVisible = true;

  constructor(rootStore, props) {
    this.rootStore = rootStore;
    if (props.onFilterVisibilityChange) {
      this.onFilterVisibilityChange = props.onFilterVisibilityChange;
    }
  }

  @action.bound
  toggleFilterVisibility() {
    this.filterVisible = !this.filterVisible;
    if (this.onFilterVisibilityChange) {
      this.onFilterVisibilityChange(this.filterVisible);
    }
  }
}

const TableFilter = function (props) {
  return <TableFilterTemplate {...props} />;
};

TableFilter.propTypes = {
  queryUtility: PropTypes.object.isRequired,
  onFilterVisibilityChange: PropTypes.func
};

export default setCurrentView(
  (rootStore, props) => new TableFilterStore(rootStore, props),
  'filterStore'
)(defaultTemplate(TableFilter));
