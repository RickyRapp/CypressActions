import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ProcessorsCompaniesListTemplate } from 'themes/application/administration/charity-website/pages';
import { ProcessorsCompaniesListViewStore } from 'application/administration/charity-website/stores';

@setCurrentView((rootStore) => new ProcessorsCompaniesListViewStore(rootStore), 'processorsCompaniesListViewStore')
@observer
class ProcessorsCompaniesList extends React.Component {
    render() {
        return <ProcessorsCompaniesListTemplate {...this.props} />
    }
}

export default ProcessorsCompaniesList;
