import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Content } from 'core/layouts';
import { ScheduledGrantList, GrantRequestList } from 'application/grant/pages';
import { BaasicModal } from 'core/components';
import { SelectDonor } from 'application/donor/components';
import { PastGrantList } from 'application/donation/pages';
import { BookletList } from 'application/booklet/pages';
import { BookletOrderList } from 'application/booklet-order/pages';

function GrantTabTemplate({ grantTabViewStore }) {
    const {
        loaderStore,
        selectDonorModal
    } = grantTabViewStore;

    return (
        <Content loading={loaderStore.loading} >
            <div className='u-mar--bottom--med'>
                <TabLayout store={grantTabViewStore}>
                    <div label={'GRANT.TAB.PAST_GRANT'}>
                        <PastGrantList />
                    </div>
                    <div label={'GRANT.TAB.SCHEDULED_LIST'}>
                        <ScheduledGrantList />
                    </div>
                    <div label={'GRANT.TAB.GRANT_REQUEST'}>
                        <GrantRequestList />
                    </div>
                    <div label={'GRANT.TAB.CERTIFICATE_LIST'}>
                        <BookletList />
                    </div>
                    <div label={'GRANT.TAB.BOOKLET_ORDER_LIST'}>
                        <BookletOrderList />
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