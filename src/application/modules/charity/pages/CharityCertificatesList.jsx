import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityCertificatesListTemplate } from 'themes/application/charity/pages';
import { CharityCertificatesViewStore } from 'application/charity/stores';

@setCurrentView((rootStore) => new CharityCertificatesViewStore(rootStore), 'charityCertificatesViewStore')
@observer
class CharityCertificatesList extends React.Component {
    render() {
        return <CharityCertificatesListTemplate {...this.props} />
    }
}

export default CharityCertificatesList;
