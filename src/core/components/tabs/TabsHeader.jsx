import React from 'react';
import {observer} from 'mobx-react'
import { TabsHeaderTemplate } from 'themes/components';

@observer
class TabsHeader extends React.Component {
    render(){
        return <TabsHeaderTemplate {...this.props} />
    }
}

export default TabsHeader;