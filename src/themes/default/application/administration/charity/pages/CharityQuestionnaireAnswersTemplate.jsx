import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Content } from 'core/layouts';

function CharityQuestionnaireAnswersTemplate({ charityQuestionnaireAnswersViewStore, rootStore }) {
    const {
        item
    } = charityQuestionnaireAnswersViewStore;
    return (
        <React.Fragment>
            <div className="card--primary card--med">
                <Content>
                    { item && (
                        item.map( (answer) => {
                            return (
                                <div key={answer.id} className="u-mar--bottom--base">
                                    <p className="type--color--opaque"><span className="u-display--ib w--30--px">{answer.numberOfQuestion}.</span>{answer.charitySignUpQuestion.text}</p>
                                    <p className="type--wgt--bold"><span className="u-display--ib w--30--px">{" "}</span>{answer.answer}</p>
                                </div>
                                ) 
                        } )
                    )
                    }
                </Content>
            </div>
        </React.Fragment>
    );
}

CharityQuestionnaireAnswersTemplate.propTypes = {
    charityQuestionnaireAnswersViewStore: PropTypes.object.isRequired,
    rootStore: PropTypes.object.isRequired
};

export default defaultTemplate(CharityQuestionnaireAnswersTemplate);