import React from "react";
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { setCurrentView } from "core/utils";
import { TableFilterTemplate } from "themes/components";

const TableFilter = function (props) {
    return <TableFilterTemplate {...props} />;
};

TableFilter.propTypes = {
    queryUtility: PropTypes.object.isRequired,
    showClear: PropTypes.bool,
};

export default setCurrentView(
    (rootStore, props) => new TableFilterStore(rootStore, props),
    "filterStore"
)(defaultTemplate(TableFilter));

class TableFilterStore {
    constructor(rootStore) {
        this.rootStore = rootStore;

    }
}
