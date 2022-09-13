import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityVerificationDocumentListViewStore } from '../stores';
import { CharityVerificationDocumentListTemplate } from 'themes/application/administration/charity/components';

@setCurrentView((rootStore, props) => new CharityVerificationDocumentListViewStore(rootStore, props.modalParams.data), 'charityVerificationDocumentListViewStore')
@observer
class CharityVerificationDocumentList extends React.Component {
    render() {
        return <CharityVerificationDocumentListTemplate {...this.props} />
    }
}

export default CharityVerificationDocumentList;