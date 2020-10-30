import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { Daf101Template } from 'themes/application/public/pages';
import { Daf101ViewStore } from 'application/public/stores';

@setCurrentView((rootStore) => new Daf101ViewStore(rootStore), 'daf101ViewStore')
@observer
class Daf101 extends React.Component {
    render() {
        return <Daf101Template {...this.props} />
    }
}

export default Daf101;
