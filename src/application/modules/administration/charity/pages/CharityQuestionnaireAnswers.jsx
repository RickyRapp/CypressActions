import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityQuestionnaireAnswersTemplate } from 'themes/application/administration/charity/pages';
import { CharityQuestionnaireAnswersViewStore } from 'application/administration/charity/stores';

@setCurrentView((rootStore) => new CharityQuestionnaireAnswersViewStore(rootStore), 'charityQuestionnaireAnswersViewStore')
@observer
class CharityQuestionnaireAnswers extends React.Component {
    render() {
        return <CharityQuestionnaireAnswersTemplate {...this.props} />
    }
}

export default CharityQuestionnaireAnswers;
