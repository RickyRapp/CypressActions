import React from 'react';
import { ListBoxPanelTemplate } from 'themes/components';

class ListBoxPanel extends React.Component {
    render() {
        return <ListBoxPanelTemplate {...this.props} />
    }
}

export default ListBoxPanel;