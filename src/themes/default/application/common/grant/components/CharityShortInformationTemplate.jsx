import React from 'react';
import PropTypes from 'prop-types';
import { addressFormatter, isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { defaultTemplate } from 'core/hoc';

const CharityShortInformationTemplate = function ({ charity, t, onChangeDefaultAddressClick, isChangedDefaultAddress, grantRequestId }) {
    const taxId = `${charity.taxId.slice(0, 2)}-${charity.taxId.slice(2)}`;

    return (
        <React.Fragment>
            <h3 className="">{t('GRANT.CREATE.CHARITY_INFORMATION_TITLE')}</h3>
            <div className="row row--form u-mar--top--sml">
                <div className="col col-sml-12 u-mar--bottom--sml">
                    <div className="charity-information__card ">
                        <span className="type--base type--wgt--regular type--color--opaque">{t('GRANT.CREATE.CHARITY_INFORMATION_NAME')}</span>
                        <span className="type--base type--wgt--medium u-mar--left--auto type--right">{charity.name}</span>
                    </div>
                </div>
                <div className="col col-sml-12 u-mar--bottom--sml">
                    <div className="charity-information__card ">
                        <span className="type--base type--wgt--regular type--color--opaque">{t('GRANT.CREATE.CHARITY_INFORMATION_TAX_ID')}</span>
                        <span className="type--base type--wgt--medium u-mar--left--auto type--right">{taxId}</span>
                    </div>
                </div>
                <div className="col col-sml-12 u-mar--bottom--sml">
                    <div className="charity-information__card ">
                        <span className="type--base type--wgt--regular type--color--opaque">{t('GRANT.CREATE.CHARITY_INFORMATION_IS_ACH_AVAILABLE')}</span>
                        <span className="type--base type--wgt--medium u-mar--left--auto type--right">{charity.isAchAvailable ? 'Yes' : 'No'}</span>
                    </div>
                </div>
                {!isChangedDefaultAddress &&
                    <div className="col col-sml-12 u-mar--bottom--sml">
                        <div className="charity-information__card ">
                            <span className="type--base type--wgt--regular type--color--opaque">{t('GRANT.CREATE.CHARITY_INFORMATION_ADDRESS')}</span>
                            <span className="type--base type--wgt--medium u-mar--left--auto type--right">{charity.charityAddresses ? addressFormatter.format(charity.charityAddresses.find(c => c.isPrimary), 'full') : addressFormatter.format(charity, 'full')}</span>
                        </div>
                    </div>}
            </div>
            {isNullOrWhiteSpacesOrUndefinedOrEmpty(grantRequestId) &&
                <a href="#" onClick={onChangeDefaultAddressClick} className="u-mar--bottom--med u-display--b type--underline">
                    <i className="u-icon u-icon--base u-icon--pin u-mar--right--sml"></i>
                    {isChangedDefaultAddress ? t('GRANT.CREATE.BUTTON.SET_DEFAULT_DEFAULT_ADDRESS') : t('GRANT.CREATE.BUTTON.CHANGE_DEFAULT_ADDRESS')}
                </a>
            }
        </React.Fragment>
    )
};

CharityShortInformationTemplate.propTypes = {
    charity: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    onChangeDefaultAddressClick: PropTypes.func,
    isChangedDefaultAddress: PropTypes.bool,
    grantRequestId: PropTypes.string,

};

export default defaultTemplate(CharityShortInformationTemplate);
