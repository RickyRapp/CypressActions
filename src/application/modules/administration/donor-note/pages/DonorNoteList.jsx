import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorNoteListTemplate } from 'themes/application/administration/donor-note/pages';
import { DonorNoteViewStore } from 'application/administration/donor-note/stores';

@setCurrentView((rootStore) => new DonorNoteViewStore(rootStore), 'donorNoteViewStore')
@observer
class DonorNoteList extends React.Component {
    render() {
        return <DonorNoteListTemplate {...this.props} />
    }
}

export default DonorNoteList;
