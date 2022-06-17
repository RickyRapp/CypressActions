import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BaasicToggle,
} from 'core/components'
import ReactTooltip from 'react-tooltip';

const DonorOnlineGrantSettingTemplate = function ({ t, donorOnlineGrantSettingViewStore }) {
    const {
        loaderStore,
        form,
        setMicroGiving,
        grantAcknowledgmentTypeDropdownStore,
        grantPurposeTypeDropdownStore,
        microGiving
    } = donorOnlineGrantSettingViewStore;
    return (
        <div>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className="list--preferences__title">{t('DONOR.ONLINE_GRANT.TITLE')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">Enable Micro giving   <span data-tip={`Micro giving allows you to give under $100. Every transaction fee is $2,50.`} data-type="info" style={{ cursor: 'pointer' }}>
                        <i className="u-icon u-icon--base u-icon--info--link u-mar--left--tny"></i>
                        <ReactTooltip />
                    </span></div>
                  
                    <div className="list--preferences__dd">
                        <BaasicToggle wrapperClassName="u-display--flex u-display--flex--column u-display--flex--align--end" showLabel={false} value={microGiving} onChange={()=>setMicroGiving()} />
                    </div>
                </div>

                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </EditFormContent>
        </div>
    )
}

DonorOnlineGrantSettingTemplate.propTypes = {
    DonorOnlineGrantSettingTemplate: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorOnlineGrantSettingTemplate);
