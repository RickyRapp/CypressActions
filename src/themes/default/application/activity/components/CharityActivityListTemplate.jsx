import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import { ListContent, EmptyState, BaasicDropdown } from 'core/components';
import { Content } from 'core/layouts';
import { SettledPaymentTransaction } from 'application/activity/components';

const DonorActivityListTemplate = function ({ store }) {
    const { charityDropdownStore, id } = store

    return (
        <ListContent>
            <div className="row u-mar--bottom--sml ">
                <div className="col col-sml-12 col-lrg-6">
                    <AuthDropdownContent store={charityDropdownStore} authorization='theDonorsFundAdministrationSection.read' />
                </div>
            </div>

            <Content>
                {(id || charityDropdownStore.value) ?
                    <SettledPaymentTransaction charityId={id ? id : charityDropdownStore.value.id} />
                    :
                    <EmptyState title='ACTIVITY_AND_HISTORY.LIST.EMPTY_STATE.TITLE' />}
            </Content>
        </ListContent>
    )
};

const AuthDropdownContent = withAuth(BaasicDropdown);

DonorActivityListTemplate.propTypes = {
    store: PropTypes.object.isRequired
};

export default defaultTemplate(DonorActivityListTemplate);