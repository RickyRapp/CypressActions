import React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { setCurrentView, isSome } from 'core/utils';
import { TableFilterTemplate } from 'themes/components';

@setCurrentView((rootStore, props) => new TableFilterStore(rootStore, props), 'filterStore')
@observer
class TableFilter extends React.Component {
    render() {
        return <TableFilterTemplate {...this.props} />;
    }
}

class TableFilterStore {
    @observable filterVisible = false;

    constructor(rootStore, props) {
        this.rootStore = rootStore;
        if (props.onFilterVisibilityChange) {
            this.onFilterVisibilityChange = props.onFilterVisibilityChange;
        }

        if (isSome(props.visibleByDefault)) {
            this.filterVisible = props.visibleByDefault;
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

export default TableFilter;
