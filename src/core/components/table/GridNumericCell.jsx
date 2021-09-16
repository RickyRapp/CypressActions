import React from 'react';
import { GridNumericCellTemplate } from 'themes/components';
import {observer} from 'mobx-react';

@observer
class GridNumericCell extends React.Component {
    render() {
        return (
                <GridNumericCellTemplate {...this.props}/>
        );
    }
}

export default GridNumericCell;
