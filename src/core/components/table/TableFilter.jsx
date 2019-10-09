import React from "react";
import PropTypes from 'prop-types';
import { action, observable } from "mobx";
import { defaultTemplate } from 'core/hoc';
import { setCurrentView } from "core/utils";
import { TableFilterTemplate } from "themes/components";

const TableFilter = function(props) {
    return <TableFilterTemplate {...props} />;
};

TableFilter.propTypes = {
    queryUtility: PropTypes.object.isRequired,
    showClear: PropTypes.bool,
    // onFilterVisibilityChange: PropTypes.func
};

export default setCurrentView(
    (rootStore, props) => new TableFilterStore(rootStore, props),
    "filterStore"
)(defaultTemplate(TableFilter));

class TableFilterStore {
    constructor(rootStore, props) {
        this.rootStore = rootStore;
        if (props.onFilterVisibilityChange) {
            this.onFilterVisibilityChange = props.onFilterVisibilityChange;
        }
    }

    @observable filterVisible = false;

    @action.bound
    toggleFilterVisibility() {
        this.filterVisible = !this.filterVisible;
        if (this.onFilterVisibilityChange) {
            this.onFilterVisibilityChange(this.filterVisible);
        }
    }
}
