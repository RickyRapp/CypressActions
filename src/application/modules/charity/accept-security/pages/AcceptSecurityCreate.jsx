import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { AcceptSecurityTemplate } from 'themes/application/charity/accept-security/pages';
import { AcceptSecurityCreateViewStore } from 'application/charity/accept-security/stores';

@setCurrentView((rootStore) => new AcceptSecurityCreateViewStore(rootStore, { contributionStore: rootStore.application.donor.contributionStore }), 'acceptSecurityCreateViewStore')
@observer
class AcceptSecurityCreate extends React.Component {

    render() {
        return <AcceptSecurityTemplate {...this.props} />
    }
}

export default AcceptSecurityCreate;
