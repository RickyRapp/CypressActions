import React from 'react';
import { observer } from "mobx-react";
import { GrantReviewTemplate } from 'themes/modules/administration/grant/components';
import { GrantReviewViewStore } from 'modules/administration/grant/stores'
import { setCurrentView } from 'core/utils';
import _ from 'lodash';

@setCurrentView((rootStore, props) => new GrantReviewViewStore(rootStore, { id: props.id, onAfterReview: props.onAfterReview }), 'grantReviewViewStore')
@observer
class GrantReview extends React.Component {
    render() {
        return <GrantReviewTemplate {...this.props} />
    }
}

export default GrantReview;
