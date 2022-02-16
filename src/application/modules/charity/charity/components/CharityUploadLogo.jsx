import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityUploadLogoTemplate } from 'themes/application/charity/charity/components';
import { CharityUploadLogoViewStore } from 'application/charity/charity/stores';

@setCurrentView((rootStore) => new CharityUploadLogoViewStore(rootStore), 'charityUploadLogoViewStore')
@observer
class CharityUploadLogo extends React.Component {
    render() {
        return <CharityUploadLogoTemplate {...this.props} />
    }
}

export default CharityUploadLogo;