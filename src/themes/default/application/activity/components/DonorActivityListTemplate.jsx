import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import { ListContent, EmptyState, BaasicDropdown } from 'core/components';
import { Content } from 'core/layouts';
import { SettledPaymentTransaction, ReservedPaymentTransaction } from 'application/activity/components';

const DonorActivityListTemplate = function ({ store }) {
    const { donorDropdownStore, id } = store

    return (
        <ListContent>
            <div className="row u-mar--bottom--sml ">
                <div className="col col-sml-12 col-lrg-6">
                    <AuthDropdownContent store={donorDropdownStore} authorization='theDonorsFundAdministrationSection.read' />
                </div>
            </div>
            {(id || donorDropdownStore.value) ?
                <React.Fragment>
                    <Content>
                        <ReservedPaymentTransaction donorId={id ? id : donorDropdownStore.value.id} />
                    </Content>
                    <Content>
                        <SettledPaymentTransaction donorId={id ? id : donorDropdownStore.value.id} />
                    </Content>
                </React.Fragment>
                :
                <Content>
                    <EmptyState title='ACTIVITY_AND_HISTORY.LIST.EMPTY_STATE.TITLE' />
                </Content>}
        </ListContent>
    )
};

const AuthDropdownContent = withAuth(BaasicDropdown);

DonorActivityListTemplate.propTypes = {
    store: PropTypes.object.isRequired
};

export default defaultTemplate(DonorActivityListTemplate);