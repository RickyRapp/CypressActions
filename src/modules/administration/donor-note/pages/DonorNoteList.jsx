import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorNoteListTemplate } from 'themes/modules/administration/donor-note/pages';
import { DonorNoteListViewStore } from 'modules/administration/donor-note/stores';

@setCurrentView((rootStore, props) => new DonorNoteListViewStore(rootStore, { userId: props.userId }), 'donorNoteListViewStore')
@observer
class DonorNoteList extends React.Component {
    render() {
        return <DonorNoteListTemplate {...this.props} />;
    }
}

export default DonorNoteList;
