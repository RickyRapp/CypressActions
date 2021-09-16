import React, {Component} from 'react';
import {TableDateColumnCellTemplate} from "themes/components";

class TableDateColumnCell extends Component {
    render() {
        return (
            <TableDateColumnCellTemplate {...this.props} />
        );
    }
}

TableDateColumnCell.propTypes = {
};

export default TableDateColumnCell;
