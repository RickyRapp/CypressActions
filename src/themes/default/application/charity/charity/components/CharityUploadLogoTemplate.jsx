import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BaasicDropzone
} from 'core/components'
import { isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';

const CharityUploadLogoTemplate = function ({t, charityUploadLogoViewStore}){

    const {
        imageUploadStore,
        loaderStore,
        form
    } = charityUploadLogoViewStore;

    return(
        <div>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className="list--preferences__title">{t('CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.NAME')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">{t('CHARITY.CARD_PREFERENCES.GENERAL_NOTIFICATIONS.FIELDS.NOTIFY_APPROVED_GRANT')}</div>
                    <div className="list--preferences__dd">
                        <BaasicDropzone store={imageUploadStore} disabled={!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('coreMediaVaultEntryId').value)} />
                    </div>
                </div>

                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
                
            </EditFormContent>  
        </div>
    );


}

CharityUploadLogoTemplate.propTypes = {
    charityUploadLogoViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityUploadLogoTemplate);