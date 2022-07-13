import React, {Component} from 'react';
import { TableImageCellTemplate } from "themes/components";

class TableImageCell extends Component {
    render() {
        return (
            <TableImageCellTemplate {...this.props} />
        );
    }
}

TableImageCell.propTypes = {
};

export default TableImageCell;
