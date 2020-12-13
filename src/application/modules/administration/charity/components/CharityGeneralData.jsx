import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityGeneralDataTemplate } from 'themes/application/administration/charity/components';
import { CharityGeneralDataViewStore } from 'application/administration/charity/stores';

@setCurrentView((rootStore) => new CharityGeneralDataViewStore(rootStore), 'charityGeneralDataViewStore')
@observer
class CharityGeneralData extends React.Component {
    render() {
        return <CharityGeneralDataTemplate {...this.props} />
    }
}

export default CharityGeneralData;