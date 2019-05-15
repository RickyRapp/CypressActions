import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityFilesTemplate } from 'themes/modules/administration/charity/pages';
import { CharityFilesViewStore } from 'modules/administration/charity/stores';

@setCurrentView(rootStore => new CharityFilesViewStore(rootStore), 'charityFilesViewStore')
@observer
class CharityFiles extends React.Component {
    render() {
        return <CharityFilesTemplate {...this.props} />;
    }
}

export default CharityFiles;
