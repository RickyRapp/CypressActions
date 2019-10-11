import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import { ListContent, EmptyState, BaasicDropdown } from 'core/components';
import { Page, Content } from 'core/layouts';
import { SettledPaymentTransaction } from 'application/activity-and-history/components';

const CharityActivityAndHistoryListTemplate = function ({ charityActivityAndHistoryViewStore }) {
    const { charityDropdownStore, id } = charityActivityAndHistoryViewStore

    return (
        <Page>
            <ListContent>
                <div className="u-mar--bottom--sml">
                    <div className="col col-sml-12 col-med-6 col-lrg-3">
                        <AuthDropdownContent store={charityDropdownStore} authorization='theDonorsFundAdministrationSection.read' />
                    </div>
                </div>
                {(id || charityDropdownStore.value) ?
                    <React.Fragment>
                        <Content>
                            <SettledPaymentTransaction id={id ? id : charityDropdownStore.value.id} />
                        </Content>
                    </React.Fragment>
                    :
                    <Content>
                        <EmptyState title='ACTIVITY_AND_HISTORY.LIST.EMPTY_STATE.TITLE' />
                    </Content>}
            </ListContent>
        </Page>
    )
};

const AuthDropdownContent = withAuth(BaasicDropdown);

CharityActivityAndHistoryListTemplate.propTypes = {
    charityActivityAndHistoryViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(CharityActivityAndHistoryListTemplate);