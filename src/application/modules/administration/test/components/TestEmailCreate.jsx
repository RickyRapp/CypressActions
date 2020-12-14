import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { TestEmailCreateTemplate } from 'themes/application/administration/test/components';
import { TestEmailCreateViewStore } from 'application/administration/test/stores';

@setCurrentView((rootStore, props) => new TestEmailCreateViewStore(rootStore, props.modalParams.data.item, props.modalParams.data.onAfterAction), 'testEmailCreateViewStore')
@observer
class TestEmailCreate extends React.Component {
    render() {
        return <TestEmailCreateTemplate {...this.props} />
    }
}

export default TestEmailCreate;
