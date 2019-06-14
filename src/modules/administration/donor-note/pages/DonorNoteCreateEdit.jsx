import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorNoteCreateEditTemplate } from 'themes/modules/administration/donor-note/pages';
import { DonorNoteCreateEditViewStore } from 'modules/administration/donor-note/stores';

@setCurrentView((rootStore, props) => new DonorNoteCreateEditViewStore(rootStore, {
    id: props.id,
    userId: props.userId,
    onCancelEdit: props.onCancelEdit,
    onAfterCreateEdit: props.onAfterCreateEdit
}), 'donorNoteCreateEditViewStore')
@observer
class DonorNoteCreateEdit extends React.Component {
    render() {
        return <DonorNoteCreateEditTemplate {...this.props} />;
    }
}

export default DonorNoteCreateEdit;
