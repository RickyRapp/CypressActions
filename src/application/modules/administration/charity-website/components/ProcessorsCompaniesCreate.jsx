import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ProcessorsCompaniesCreateTemplate } from 'themes/application/administration/charity-website/components';
import { ProcessorsCompaniesCreateViewStore } from 'application/administration/charity-website/stores';

@setCurrentView((rootStore, props) => new ProcessorsCompaniesCreateViewStore(rootStore, props.modalParams.data.id, props.modalParams.data.onAfterAction), 'processorsCompaniesCreateViewStore')
@observer
class ProcessorsCompaniesCreate extends React.Component {
    render() {
        return <ProcessorsCompaniesCreateTemplate {...this.props} />
    }
}

export default ProcessorsCompaniesCreate;
