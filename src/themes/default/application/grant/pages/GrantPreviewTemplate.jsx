import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import {
    ApplicationEmptyState,
    FormatterResolver
} from 'core/components';
import { addressFormatter, isSome } from 'core/utils';
import { PreviewLayout } from 'core/layouts';
import { GrantProgressTimeline } from 'application/grant/components';
import _ from 'lodash'

function GrantPreviewTemplate({ grantPreviewViewStore, t }) {
    const {
        item,
        loaderStore,
        isEditable
    } = grantPreviewViewStore;

    const AuthDonorNameRow = withAuth(DonorNameRow);
    function DonorNameRow() {
        return <div className="row">
            <div className="col col-sml-12 col-lrg-6">
                <div className="type--base type--wgt--medium type--color--note">{t('GRANT.PREVIEW.FIELDS.DONOR_NAME_LABEL')}</div>
                <span className="input--preview">
                    {item && <React.Fragment>{item.donor.donorName}</React.Fragment>}
                </span>
            </div>
        </div>
    }

    return (
        <PreviewLayout
            store={grantPreviewViewStore}
            emptyRenderer={<ApplicationEmptyState />}
            loading={loaderStore.loading}
            layoutFooterVisible={isEditable}
        >
            <div className="row">
                <div className="col col-sml-12 col-lrg-8">
                    {item && !(item.donationStatus.abrv === 'processed' && !isSome(item.debitCharityTransaction)) && //old grants
                        <div className="card--primary card--med u-mar--bottom--med">
                            <GrantProgressTimeline item={item} />
                        </div>}
                    <div className="card--primary card--med u-mar--bottom--med">
                        <AuthDonorNameRow authorization='theDonorsFundAdministrationSection.update' />
                        <div className="row">
                            <div className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                <div className="type--base type--wgt--medium type--color--note">{t('GRANT.PREVIEW.FIELDS.CHARITY_LABEL')}</div>
                                <span className="input--preview">
                                    {item && <FormatterResolver
                                        item={{ charity: item.charity }}
                                        field='charity'
                                        format={{ type: 'charity', value: 'charity-name-display' }}
                                    />}
                                </span>
                            </div>
                            <div className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                <div className="type--base type--wgt--medium type--color--note">{t('GRANT.PREVIEW.FIELDS.AMOUNT_LABEL')}</div>
                                <span className="input--preview">
                                    {item && <FormatterResolver
                                        item={{ amount: item.amount }}
                                        field='amount'
                                        format={{ type: 'currency' }}
                                    />}
                                </span>
                            </div>
                            <div className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                <div className="type--base type--wgt--medium type--color--note">{t('GRANT.PREVIEW.FIELDS.CONFIRMATION_NUMBER_LABEL')}</div>
                                <span className="input--preview">
                                    {item && <React.Fragment>{item.confirmationNumber}</React.Fragment>}
                                </span>
                            </div>
                            <div className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                <div className="type--base type--wgt--medium type--color--note">{t('GRANT.PREVIEW.FIELDS.PURPOSE_TYPE_LABEL')}</div>
                                <span className="input--preview">
                                    {item && <React.Fragment>{item.grantPurposeType.name}</React.Fragment>}
                                </span>
                            </div>
                            <div className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                <div className="type--base type--wgt--medium type--color--note">{t('GRANT.PREVIEW.FIELDS.ACKNOWLEDGMENT_LABEL')}</div>
                                <span className="input--preview">
                                    {item && <React.Fragment>
                                        {item.grantAcknowledgmentType.abrv === 'name-fund-name-and-address' &&
                                            `${item.donor.donorName} - ${item.donor.fundName} - ${addressFormatter.format(_.find(item.donor.donorAddresses, { isPrimary: true }), 'full')}`}
                                        {item.grantAcknowledgmentType.abrv === 'fund-name-and-address' &&
                                            `${item.donor.fundName} - ${addressFormatter.format(_.find(item.donor.donorAddresses, { isPrimary: true }), 'full')}`}
                                        {item.grantAcknowledgmentType.abrv === 'fund-name' && item.donor.fundName}
                                        {item.grantAcknowledgmentType.abrv === 'remain-anonymous' && 'Anonymous'}
                                    </React.Fragment>}
                                </span>
                            </div>
                            {item && item.thirdPartyWebsite &&
                                <div className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                    <div className="type--base type--wgt--medium type--color--note">{t('GRANT.PREVIEW.FIELDS.THIRD_PARTY_WEBSITE_LABEL')}</div>
                                    <span className="input--preview">
                                        {item && <React.Fragment>{item.thirdPartyWebsite.name} - {item.thirdPartyWebsite.url}</React.Fragment>}
                                    </span>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </PreviewLayout>
    )
}

GrantPreviewTemplate.propTypes = {
    grantPreviewViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(GrantPreviewTemplate);
