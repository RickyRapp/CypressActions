import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { TestReportCreateTemplate } from 'themes/application/administration/test/components';
import { TestReportCreateViewStore } from 'application/administration/test/stores';

@setCurrentView((rootStore, props) => new TestReportCreateViewStore(rootStore, props.modalParams.data.item, props.modalParams.data.onAfterAction), 'testReportCreateViewStore')
@observer
class TestReportCreate extends React.Component {
    render() {
        return <TestReportCreateTemplate {...this.props} />
    }
}

export default TestReportCreate;
