import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Page, PageNavigation } from 'core/layouts';
import { GrantList, ScheduledGrantList, GrantRequestList } from 'application/grant/pages';
import { BaasicButton, BaasicModal } from 'core/components';
import { SelectDonor } from 'application/donor-account/components';

function GrantTabTemplate({ grantTabViewStore, t }) {
    const {
        loaderStore,
        createFunc,
        activeIndex,
        selectDonorModal,
        setDonorAccountId,
        canCreate,
        handleTabClick
    } = grantTabViewStore;

    let title = 'Grants';
    if (activeIndex === 0)
        title = 'Grants';
    else if (activeIndex === 1)
        title = 'Scheduled grants';
    else if (activeIndex === 2)
        title = 'Grant requests';

    return (
        <Page loading={loaderStore.loading} >
            <PageNavigation title={title}>
                {canCreate &&
                    <BaasicButton
                        authorization={'theDonorsFundGrantSection.create'}
                        className="btn btn--base btn--primary"
                        label={'LIST_LAYOUT.CREATE_BUTTON'}
                        onClick={createFunc} />}
            </PageNavigation>
            <div className='u-mar--bottom--med'>
                <TabLayout store={grantTabViewStore}>
                    <div label={'GRANT.TAB.LIST'}>
                        <GrantList onChangeDonorFilter={setDonorAccountId} />
                    </div>
                    <div label={'GRANT.TAB.SCHEDULED_LIST'}>
                        <ScheduledGrantList onChangeDonorFilter={setDonorAccountId} />
                    </div>
                    <div label={'GRANT.TAB.GRANT_REQUEST'}>
                        <GrantRequestList onChangeDonorFilter={setDonorAccountId} handleTabClick={handleTabClick} />
                    </div>
                </TabLayout>
            </div>
            <BaasicModal modalParams={selectDonorModal}>
                <SelectDonor />
            </BaasicModal>
        </Page>
    );
}

GrantTabTemplate.propTypes = {
    grantTabViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(GrantTabTemplate);