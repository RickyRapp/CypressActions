import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { EmailListTemplate } from 'themes/application/email/pages';
import { EmailViewStore } from 'application/email/stores';

@setCurrentView((rootStore, props) => new EmailViewStore(rootStore, props.donorId, props.charityId), 'emailViewStore')
@observer
class EmailList extends React.Component {
    render() {
        return <EmailListTemplate {...this.props} />
    }
}

export default EmailList;
