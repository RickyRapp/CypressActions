import React, {Component} from 'react';
import { observer } from 'mobx-react';

import {LocalizationTableRowTemplate} from "themes/components";

@observer
class LocalizationTableRow extends Component {
    render() {
        return (
            <LocalizationTableRowTemplate {...this.props} />
        )
    }
}

export default LocalizationTableRow;
