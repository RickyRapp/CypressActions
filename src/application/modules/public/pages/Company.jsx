import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CompanyTemplate } from 'themes/application/public/pages';
import { CompanyViewStore } from 'application/public/stores';

@setCurrentView((rootStore) => new CompanyViewStore(rootStore), 'dompanyViewStore')
@observer
class Company extends React.Component {
    render() {
        return <CompanyTemplate {...this.props} />
    }
}

export default Company;
