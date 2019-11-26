import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorNoteListTemplate } from 'themes/application/donor-note/pages';
import { DonorNoteViewStore } from 'application/donor-note/stores';

@setCurrentView((rootStore, props) => new DonorNoteViewStore(rootStore, { id: props.id }), 'donorNoteViewStore')
@observer
class DonorNoteList extends React.Component {
    render() {
        return <DonorNoteListTemplate {...this.props} />
    }
}

export default DonorNoteList;
