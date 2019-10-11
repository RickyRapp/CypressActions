import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import { ListContent, EmptyState, BaasicDropdown } from 'core/components';
import { Page, Content } from 'core/layouts';
import { SettledPaymentTransaction, ReservedPaymentTransaction } from 'application/activity-and-history/components';

const DonorActivityAndHistoryListTemplate = function ({ donorActivityAndHistoryViewStore }) {
    const { donorAccountDropdownStore, id } = donorActivityAndHistoryViewStore

    return (
        <Page>
            <ListContent>
                <div className="u-mar--bottom--sml">
                    <div className="col col-sml-12 col-med-6 col-lrg-3">
                        <AuthDropdownContent store={donorAccountDropdownStore} authorization='theDonorsFundAdministrationSection.read' />
                    </div>
                </div>
                {(id || donorAccountDropdownStore.value) ?
                    <React.Fragment>
                        <Content>
                            <ReservedPaymentTransaction id={id ? id : donorAccountDropdownStore.value.id} />
                        </Content>
                        <Content>
                            <SettledPaymentTransaction id={id ? id : donorAccountDropdownStore.value.id} />
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

DonorActivityAndHistoryListTemplate.propTypes = {
    donorActivityAndHistoryViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(DonorActivityAndHistoryListTemplate);