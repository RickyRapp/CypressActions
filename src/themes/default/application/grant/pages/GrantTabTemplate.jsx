import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Page, PageNavigation } from 'core/layouts';
import { GrantList, ScheduledGrantList } from 'application/grant/pages';
import { BaasicButton, BaasicModal } from 'core/components';
import { SelectDonor } from 'application/donor-account/components';

function GrantTabTemplate({ grantTabViewStore, t }) {
    const {
        loaderStore,
        createFunc,
        activeIndex,
        selectDonorModal,
        setDonorAccountId
    } = grantTabViewStore;

    return (
        <Page loading={loaderStore.loading} >
            <PageNavigation title={activeIndex == 0 ? 'Grants' : 'Scheduled grants'}>
                <BaasicButton authorization={'theDonorsFundGrantSection.create'} t={t}
                    className="btn btn--base btn--primary" label={'LIST_LAYOUT.CREATE_BUTTON'} onClick={createFunc}></BaasicButton>
            </PageNavigation>
            <div className='u-mar--bottom--med'>
                <TabLayout store={grantTabViewStore}>
                    <div label={'GRANT.TAB.LIST'}>
                        <GrantList onChangeDonorFilter={setDonorAccountId} />
                    </div>
                    <div label={'GRANT.TAB.SCHEDULED_LIST'}>
                        <ScheduledGrantList onChangeDonorFilter={setDonorAccountId} />
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