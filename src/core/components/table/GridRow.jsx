import React, {Component} from 'react';
import {GridRowTemplate} from "themes/components";

class GridRow extends Component {
    render() {
        return (
            <GridRowTemplate {...this.props} />
        );
    }
}

export default GridRow;
