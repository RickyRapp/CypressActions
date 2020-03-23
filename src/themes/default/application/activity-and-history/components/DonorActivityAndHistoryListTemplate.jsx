import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import { ListContent, EmptyState, BaasicDropdown } from 'core/components';
import { Content } from 'core/layouts';
import { SettledPaymentTransaction, ReservedPaymentTransaction } from 'application/activity-and-history/components';

const DonorActivityAndHistoryListTemplate = function ({ store }) {
    const { donorAccountDropdownStore, id } = store

    return (
            <ListContent>
                <div className="row u-mar--bottom--sml ">
                    <div className="col col-sml-12 col-lrg-6">
                        <AuthDropdownContent store={donorAccountDropdownStore} authorization='theDonorsFundAdministrationSection.read' />
                    </div>
                </div>
                {(id || donorAccountDropdownStore.value) ?
                    <React.Fragment>
                        <div className="u-mar--bottom--sml">
                            <Content>
                                <ReservedPaymentTransaction donorAccountId={id ? id : donorAccountDropdownStore.value.id} />
                            </Content>
                        </div>
                        <div className="u-mar--bottom--sml">
                            <Content>
                                <SettledPaymentTransaction donorAccountId={id ? id : donorAccountDropdownStore.value.id} />
                            </Content>
                        </div>
                    </React.Fragment>
                    :
                    <Content>
                        <EmptyState title='ACTIVITY_AND_HISTORY.LIST.EMPTY_STATE.TITLE' />
                    </Content>}
            </ListContent>
    )
};

const AuthDropdownContent = withAuth(BaasicDropdown);

DonorActivityAndHistoryListTemplate.propTypes = {
    store: PropTypes.object.isRequired
};

export default defaultTemplate(DonorActivityAndHistoryListTemplate);