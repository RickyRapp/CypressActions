import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Content } from 'core/layouts';
import { GrantList, ScheduledGrantList, GrantRequestList } from 'application/grant/pages';
import { BaasicModal } from 'core/components';
import { SelectDonor } from 'application/donor/components';

function GrantTabTemplate({ grantTabViewStore }) {
    const {
        loaderStore,
        selectDonorModal,
        setDonorId,
        handleTabClick
    } = grantTabViewStore;

    return (
        <Content loading={loaderStore.loading} >
            <div className='u-mar--bottom--med'>
                <TabLayout store={grantTabViewStore}>
                    <div label={'GRANT.TAB.LIST'}>
                        <GrantList onChangeDonorFilter={setDonorId} />
                    </div>
                    <div label={'GRANT.TAB.SCHEDULED_LIST'}>
                        <ScheduledGrantList onChangeDonorFilter={setDonorId} />
                    </div>
                    <div label={'GRANT.TAB.GRANT_REQUEST'}>
                        <GrantRequestList onChangeDonorFilter={setDonorId} handleTabClick={handleTabClick} />
                    </div>
                </TabLayout>
            </div>
            <BaasicModal modalParams={selectDonorModal}>
                <SelectDonor />
            </BaasicModal>
        </Content>
    );
}

GrantTabTemplate.propTypes = {
    grantTabViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(GrantTabTemplate);