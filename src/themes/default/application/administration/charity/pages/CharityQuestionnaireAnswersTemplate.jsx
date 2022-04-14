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
                <Content >
                    { item && (
                        item.map( (anwser) => {
                            return <li>{anwser.numberOfQuestion}: {anwser.charitySignUpQuestion.text}  - {anwser.answer}</li>
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