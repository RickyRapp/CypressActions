import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityUploadPhotoTemplate } from 'themes/application/charity/charity/components';
import { CharityUploadPhotoViewStore } from 'application/charity/charity/stores';

@setCurrentView((rootStore) => new CharityUploadPhotoViewStore(rootStore), 'charityUploadPhotoViewStore')
@observer
class CharityUploadPhoto extends React.Component {
    render() {
        return <CharityUploadPhotoTemplate {...this.props} />
    }
}

export default CharityUploadPhoto;