import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityGeneralDataTemplate } from 'themes/application/charity/charity/components';
import { CharityGeneralDataViewStore } from 'application/charity/charity/stores';

@setCurrentView((rootStore, props) => new CharityGeneralDataViewStore(rootStore, props), 'charityGeneralDataViewStore')
@observer
class CharityGeneralData extends React.Component {
    render() {
        return <CharityGeneralDataTemplate {...this.props} />
    }
}

export default CharityGeneralData;