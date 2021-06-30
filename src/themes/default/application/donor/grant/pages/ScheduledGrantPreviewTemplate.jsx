import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    FormatterResolver,
    Date
} from 'core/components';
import { addressFormatter } from 'core/utils';
import { PreviewLayout } from 'core/layouts';
import _ from 'lodash'

function ScheduledGrantPreviewTemplate({ scheduledGrantPreviewViewStore, t }) {
    const {
        item,
        loaderStore,
        isEditable
    } = scheduledGrantPreviewViewStore;

    return (
        <PreviewLayout
            store={scheduledGrantPreviewViewStore}
            emptyRenderer={<ApplicationEmptyState />}
            loading={loaderStore.loading}
            layoutFooterVisible={isEditable}
        >
            <div className="row">
                <div className="col col-sml-12 col-lrg-8">
                    <div className="card--primary card--med u-mar--bottom--med">
                        <div className="row">
                            <div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                                <div className="type--base type--wgt--medium type--color--note">{t('GRANT.SCHEDULED_GRANT.PREVIEW.FIELDS.CHARITY_LABEL')}</div>
                                <span className="input--preview">
                                    {item && <FormatterResolver
                                        item={{ charity: item.charity }}
                                        field='charity'
                                        format={{ type: 'charity', value: 'charity-name-display' }}
                                    />}
                                </span>
                            </div>
                            <div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                                <div className="type--base type--wgt--medium type--color--note">{t('GRANT.SCHEDULED_GRANT.PREVIEW.FIELDS.DATE_CREATED_LABEL')}</div>
                                <span className="input--preview">
                                    {item && <Date format="full" value={item.dateCreated} />}
                                </span>
                            </div>
                            <div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                                <div className="type--base type--wgt--medium type--color--note">{t('GRANT.SCHEDULED_GRANT.PREVIEW.FIELDS.AMOUNT_LABEL')}</div>
                                <span className="input--preview">
                                    {item && <FormatterResolver
                                        item={{ amount: item.amount }}
                                        field='amount'
                                        format={{ type: 'currency' }}
                                    />}
                                </span>
                            </div>
                            <div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                                <div className="type--base type--wgt--medium type--color--note">{t('GRANT.SCHEDULED_GRANT.PREVIEW.FIELDS.NUMBER_OF_PAYMENTS')}</div>
                                <span className="input--preview">
                                    {item && <React.Fragment>{item.numberOfPayments}</React.Fragment>}
                                </span>
                            </div>
                            <div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                                <div className="type--base type--wgt--medium type--color--note">{t('GRANT.SCHEDULED_GRANT.PREVIEW.FIELDS.REMAINING_PAYMENTS')}</div>
                                <span className="input--preview">
                                    {item && <React.Fragment>{item.remainingNumberOfPayments}</React.Fragment>}
                                </span>
                            </div>
                            <div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                                <div className="type--base type--wgt--medium type--color--note">{t('GRANT.SCHEDULED_GRANT.PREVIEW.FIELDS.PURPOSE_TYPE_LABEL')}</div>
                                <span className="input--preview">
                                    {item && <React.Fragment>{item.grantPurposeType.name} {`${item.purposeNote ? ' - ' + item.purposeNote : ''}`}</React.Fragment>}
                                </span>
                            </div>
                            <div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                                <div className="type--base type--wgt--medium type--color--note">{t('GRANT.SCHEDULED_GRANT.PREVIEW.FIELDS.ACKNOWLEDGMENT_LABEL')}</div>
                                <span className="input--preview">
                                    {item && <React.Fragment>
                                        {item.grantAcknowledgmentType.abrv === 'name-and-address' &&
                                            `${item.donor.donorName} - ${addressFormatter.format(_.find(item.donor.donorAddresses, { isPrimary: true }), 'full')}`}
                                        {item.grantAcknowledgmentType.abrv === 'fund-name-and-address' &&
                                            `${item.donor.fundName} - ${addressFormatter.format(_.find(item.donor.donorAddresses, { isPrimary: true }), 'full')}`}
                                        {item.grantAcknowledgmentType.abrv === 'fund-name' && item.donor.fundName}
                                        {item.grantAcknowledgmentType.abrv === 'remain-anonymous' && 'Anonymous'}
                                    </React.Fragment>}
                                </span>
                            </div>
                            {item && item.thirdPartyWebsite &&
                                <div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                                    <div className="type--base type--wgt--medium type--color--note">{t('GRANT.SCHEDULED_GRANT.PREVIEW.FIELDS.CHARITY_WEBSITE_LABEL')}</div>
                                    <span className="input--preview">
                                        {item && <React.Fragment>{item.thirdPartyWebsite.name} - {item.thirdPartyWebsite.url}</React.Fragment>}
                                    </span>
                                </div>}
                            {item && item.grantScheduledPayment &&
                                <div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                                    <div className="type--base type--wgt--medium type--color--note">{t('GRANT.SCHEDULED_GRANT.PREVIEW.FIELDS.SCHEDULED_LABEL')}</div>
                                    <span className="input--preview">
                                        {item && <Date format="full" value={item.grantScheduledPayment.dateCreated} />}
                                    </span>
                                </div>}
                            <div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                                <div className="type--base type--wgt--medium type--color--note">{t('GRANT.SCHEDULED_GRANT.PREVIEW.FIELDS.ADDRESS')}</div>
                                <span className="input--preview">
                                    {item && <React.Fragment>{`${item.addressLine1}, ${item.addressLine2 ? item.addressLine2 + ', ': ''} ${item.city}, ${item.state}, ${item.zipCode}`}</React.Fragment>}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PreviewLayout>
    )
}

ScheduledGrantPreviewTemplate.propTypes = {
    scheduledGrantPreviewViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(ScheduledGrantPreviewTemplate);
