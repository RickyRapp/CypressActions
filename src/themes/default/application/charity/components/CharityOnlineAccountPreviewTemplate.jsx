import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    FormatterResolver,
    Date
} from 'core/components';

function CharityOnlineAccountPreviewTemplate({ charityOnlineAccountPreviewViewStore, t }) {
    const {
        item,
    } = charityOnlineAccountPreviewViewStore;

    return (
        <div>
            <h3 className="u-mar--bottom--med">{t('CHARITY.PREVIEW.TITLE')}</h3>
            <div className="row">
                <div className="col col-sml-12 col-lrg-2">
                    <div className="form__group__label">{t('CHARITY.PREVIEW.FIELDS.ACCOUNT_CREATED_LABEL')}</div>
                    <span className="input--preview">
                        {item && item.coreUser.dateCreated && <Date value={item.coreUser.dateCreated} format={'short'} />}
                    </span>
                </div>
                <div className="col col-sml-12 col-lrg-2">
                    <div className="form__group__label">{t('CHARITY.PREVIEW.FIELDS.USERNAME_LABEL')}</div>
                    <span className="input--preview">
                        {item && item.coreUser.userName}
                    </span>
                </div>
                <div className="col col-sml-12 col-lrg-2">
                    <div className="form__group__label">{t('CHARITY.PREVIEW.FIELDS.ACCOUNT_TYPE_LABEL')}</div>
                    <span className="input--preview">
                        {item && item.charityAccountType.name}
                    </span>
                </div>
                <div className="col col-sml-12 col-lrg-2">
                    <div className="form__group__label">{t('CHARITY.PREVIEW.FIELDS.SUBSCRIPTION_TYPE_LABEL')}</div>
                    <span className="input--preview">
                        {item && item.subscriptionType.name}
                    </span>
                </div>
                <div className="col col-sml-12 col-lrg-2">
                    <div className="form__group__label">{t('CHARITY.PREVIEW.FIELDS.SUBSCRIPTION_AMOUNT_LABEL')}</div>
                    <span className="input--preview">
                        {item && <FormatterResolver
                            item={{ subscriptionAmount: item.subscriptionAmount }}
                            field='subscriptionAmount'
                            format={{ type: 'currency' }}
                        />}
                    </span>
                </div>
                <div className="col col-sml-12 col-lrg-2">
                    <div className="form__group__label">{t('CHARITY.PREVIEW.FIELDS.SUBSCRIPTION_NEXT_DATE_LABEL')}</div>
                    <span className="input--preview">
                        {item && item.subscriptionNextDate && <Date value={item.subscriptionNextDate} format={'short'} />}
                    </span>
                </div>
            </div>
        </div>
    )
}

CharityOnlineAccountPreviewTemplate.propTypes = {
    charityOnlineAccountPreviewViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(CharityOnlineAccountPreviewTemplate);
