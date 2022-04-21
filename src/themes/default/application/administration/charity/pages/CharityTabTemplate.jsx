import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Page } from 'core/layouts';
import { CharityGeneralData, CharityPersonalData } from 'application/administration/charity/components';
import { CharityQuestionnaireAnswers }from 'application/administration/charity/pages';
import { EmailList } from 'application/administration/email/pages';

function CharityTabTemplate({ charityTabViewStore, rootStore }) {
    const {
        loaderStore
    } = charityTabViewStore;

    return (
        <Page loading={loaderStore.loading} >
            <div className='u-mar--bottom--med'>
                <TabLayout store={charityTabViewStore}>
                    <div label={'CHARITY.TAB.GENERAL_DATA'}>
                        <CharityGeneralData />
                    </div>
                    <div label={'CHARITY.TAB.PERSONAL_DATA'}>
                        <CharityPersonalData />
                    </div>
                    <div label={'CHARITY.TAB.EMAIL'} className="u-mar--top--sml">
                        <EmailList charityId={rootStore.routerStore.routerState.params.id} />
                    </div>
                    <div label={'CHARITY.TAB.QUESTIONNAIRE_ANSWERS'} className="u-mar--top--sml">
                        <CharityQuestionnaireAnswers/>
                    </div>
                </TabLayout>
            </div>
        </Page>
    );
}

CharityTabTemplate.propTypes = {
    charityTabViewStore: PropTypes.object.isRequired,
    rootStore: PropTypes.object.isRequired
};

export default defaultTemplate(CharityTabTemplate);