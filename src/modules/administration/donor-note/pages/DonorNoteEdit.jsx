import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorNoteEditTemplate } from 'themes/modules/administration/donor-note/pages';
import { DonorNoteEditViewStore } from 'modules/administration/donor-note/stores';

@setCurrentView((rootStore, props) => new DonorNoteEditViewStore(rootStore, { id: props.id, onAfterUpdate: props.onAfterUpdate }), 'donorNoteEditViewStore')
@observer
class DonorNoteEdit extends React.Component {
    render() {
        return <DonorNoteEditTemplate {...this.props} />;
    }
}

export default DonorNoteEdit;
