import React from 'react';
import PropTypes from 'prop-types';
import { BaasicButton } from 'core/components';
import { addressFormatter, isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { defaultTemplate } from 'core/hoc';

const CharityShortInformationTemplate = function ({ charity, t, onChangeDefaultAddressClick, isChangedDefaultAddress, grantRequestId }) {
    return (
        <React.Fragment>
            <h3 className="">{t('GRANT.CREATE.CHARITY_INFORMATION_TITLE')}</h3>
            <div className="row u-mar--top--sml">
                <div className="col col-sml-12 u-mar--bottom--sml">
                    <div className="charity-information__card ">
                        <span className="type--base type--wgt--regular type--color--opaque">{t('GRANT.CREATE.CHARITY_INFORMATION_NAME')}</span>
                        <span className="type--base type--wgt--medium">{charity.name}</span>
                    </div>
                </div>
                <div className="col col-sml-12 u-mar--bottom--sml">
                    <div className="charity-information__card ">
                        <span className="type--base type--wgt--regular type--color--opaque">{t('GRANT.CREATE.CHARITY_INFORMATION_TAX_ID')}</span>
                        <span className="type--base type--wgt--medium">{charity.taxId}</span>
                    </div>
                </div>
                <div className="col col-sml-12 u-mar--bottom--sml">
                    <div className="charity-information__card ">
                        <span className="type--base type--wgt--regular type--color--opaque">{t('GRANT.CREATE.CHARITY_INFORMATION_IS_ACH_AVAILABLE')}</span>
                        <span className="type--base type--wgt--medium">{charity.isAchAvailable ? 'Yes' : 'No'}</span>
                    </div>
                </div>
                {!isChangedDefaultAddress &&
                    <div className="col col-sml-12 u-mar--bottom--sml">
                        <div className="charity-information__card ">
                            <span className="type--base type--wgt--regular type--color--opaque">{t('GRANT.CREATE.CHARITY_INFORMATION_ADDRESS')}</span>
                            <span className="type--base type--wgt--medium">{addressFormatter.format(charity.charityAddresses.filter(c => c.isPrimary === true), 'full')}</span>
                        </div>
                    </div>}
            </div>
            {isNullOrWhiteSpacesOrUndefinedOrEmpty(grantRequestId) &&
                <BaasicButton
                    className="btn btn--sml btn--link u-mar--bottom--sml"
                    label={isChangedDefaultAddress ? 'GRANT.CREATE.BUTTON.SET_DEFAULT_DEFAULT_ADDRESS' : 'GRANT.CREATE.BUTTON.CHANGE_DEFAULT_ADDRESS'}
                    onClick={onChangeDefaultAddressClick}>
                </BaasicButton>}
        </React.Fragment>}
    )
};

CharityShortInformationTemplate.propTypes = {
    charity: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityShortInformationTemplate);
