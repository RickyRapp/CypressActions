import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { TestReportListTemplate } from 'themes/application/administration/test/pages';
import { TestReportViewStore } from 'application/administration/test/stores';

@setCurrentView((rootStore) => new TestReportViewStore(rootStore), 'testReportViewStore')
@observer
class TestReportList extends React.Component {
    render() {
        return <TestReportListTemplate {...this.props} />
    }
}

export default TestReportList;
