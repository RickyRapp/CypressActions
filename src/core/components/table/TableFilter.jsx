import React from "react";
import { action, observable } from "mobx";
import { defaultTemplate, setCurrentView } from "core/utils";
import { TableFilterTemplate } from "themes/components";

function TableFilter(props) {
    return <TableFilterTemplate {...props} />;
}

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
