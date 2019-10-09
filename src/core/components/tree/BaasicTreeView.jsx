import React, {Component} from "react";
import PropTypes from "prop-types";

import {observer} from "mobx-react";
import {BaasicTreeViewTemplate} from "themes/components";

@observer
class BaasicTreeView extends Component {
    render() {
        return (
            <BaasicTreeViewTemplate {...this.props} />
        )
    }
}

BaasicTreeView.propTypes = {
    store: PropTypes.object.isRequired,
    children: PropTypes.node,
    onNodeSelect: PropTypes.func,
    data: PropTypes.any,
    insideContent: PropTypes.bool,
    checkable: PropTypes.bool
};

BaasicTreeView.defaultProps = {
    data: [],
    onNodeSelect: () => {
    }
};

export default BaasicTreeView;
