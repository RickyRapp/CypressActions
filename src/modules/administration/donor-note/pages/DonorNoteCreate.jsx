import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorNoteCreateTemplate } from 'themes/modules/administration/donor-note/pages';
import { DonorNoteCreateViewStore } from 'modules/administration/donor-note/stores';

@setCurrentView((rootStore, props) => new DonorNoteCreateViewStore(rootStore, { id: props.id, onAfterCreate: props.onAfterCreate }), 'donorNoteCreateViewStore')
@observer
class DonorNoteCreate extends React.Component {
    render() {
        return <DonorNoteCreateTemplate {...this.props} />;
    }
}

export default DonorNoteCreate;
