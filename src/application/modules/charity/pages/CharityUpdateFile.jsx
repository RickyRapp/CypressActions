import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityUpdateFileTemplate } from 'themes/application/charity/pages';
import { CharityUpdateFileViewStore } from 'application/charity/stores';

@setCurrentView((rootStore) => new CharityUpdateFileViewStore(rootStore), 'charityUpdateFileViewStore')
@observer
class CharityUpdateFile extends React.Component {
    render() {
        return <CharityUpdateFileTemplate {...this.props} />
    }
}

export default CharityUpdateFile;
