import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityAdvancedSearchTemplate } from 'themes/application/administration/charity/components';
import { CharityAdvancedSearchViewStore } from 'application/administration/charity/stores';

@setCurrentView((rootStore, props) => new CharityAdvancedSearchViewStore(rootStore, props.onSelected), 'charityAdvancedSearchViewStore')
@observer
class CharityAdvancedSearch extends React.Component {
    render() {
        return <CharityAdvancedSearchTemplate {...this.props} />
    }
}

export default CharityAdvancedSearch;