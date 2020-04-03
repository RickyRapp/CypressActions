import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState, FormatterResolver, Date, SimpleBaasicTable
} from 'core/components';
import { PreviewLayout } from 'core/layouts';
import _ from 'lodash'
import { charityFormatter } from 'core/utils';

function SessionPreviewTemplate({ sessionPreviewViewStore, t }) {
    const {
        item,
        tableStore,
        loaderStore
    } = sessionPreviewViewStore;

    return (
        <PreviewLayout
            store={sessionPreviewViewStore}
            emptyRenderer={<ApplicationEmptyState />}
            loading={loaderStore.loading}
            layoutFooterVisible={false}
        >
            <div className="card card--form card--primary card--med u-mar--bottom--med">
                <div className="row u-mar--bottom--lrg">
                    <div className="col col-sml-12 col-lrg-4">
                        <div className="form__group__label">{t('SESSION.PREVIEW.FIELDS.CHARITY_LABEL')}</div>
                        <span className="input--preview">
                            {item && item.charity && <FormatterResolver
                                item={{ charity: item.charity }}
                                field='charity'
                                format={{ type: 'charity', value: 'charity-name-display' }}
                            />}
                        </span>
                    </div>
                    <div className="col col-sml-12 col-lrg-4">
                        <div className="form__group__label">{t('SESSION.PREVIEW.FIELDS.ORGANIZATION_NAME_LABEL')}</div>
                        <span className="input--preview">
                            {item && `${item.charityName} / ${item.charityEmail || '-'} / ${item.taxId ? charityFormatter.format(item.taxId, { value: 'tax-id' }) : '-'}`}
                        </span>
                    </div>
                    <div className="col col-sml-12 col-lrg-4">
                        <div className="form__group__label">{t('SESSION.PREVIEW.FIELDS.FULL_NAME_LABEL')}</div>
                        <span className="input--preview">
                            {item && item.fullName}
                        </span>
                    </div>
                    <div className="col col-sml-12 col-lrg-4">
                        <div className="form__group__label">{t('SESSION.PREVIEW.FIELDS.PHONE_NUMBER_LABEL')}</div>
                        <span className="input--preview">
                            {item && item.phoneNumber}
                        </span>
                    </div>
                    <div className="col col-sml-12 col-lrg-4">
                        <div className="form__group__label">{t('SESSION.PREVIEW.FIELDS.EMAIL_LABEL')}</div>
                        <span className="input--preview">
                            {item && item.email}
                        </span>
                    </div>
                    <div className="col col-sml-12 col-lrg-4">
                        <div className="form__group__label">{t('SESSION.PREVIEW.FIELDS.CONFIRMATION_NUMBER_LABEL')}</div>
                        <span className="input--preview">
                            {item && item.confirmationNumber}
                        </span>
                    </div>
                    <div className="col col-sml-12 col-lrg-4">
                        <div className="form__group__label">{t('SESSION.PREVIEW.FIELDS.DATE_CREATED_LABEL')}</div>
                        <span className="input--preview">
                            {item && <Date format="full" value={item.dateCreated} />}
                        </span>
                    </div>
                </div>
            </div>

            <div className="card card--form card--primary card--med u-mar--bottom--med">
                <h3 className="u-mar--bottom--med">Certificates</h3>
                <SimpleBaasicTable
                    tableStore={tableStore}
                />
                <div className="row u-mar--top--lrg">
                    <div className="form__group col-lrg-12">
                        {t('SESSION.EDIT.TOTAL_AMOUNT')} ${item && (_.sumBy(item.sessionCertificates, (sessionCert) => {
                            return (sessionCert.certificate.booklet.denominationType.abrv === 'blank' ?
                                sessionCert.blankCertificateValue : sessionCert.certificate.booklet.denominationType.value) * 100
                        })) / 100}
                    </div>
                    <div className="form__group col-lrg-12">
                        {t('SESSION.EDIT.TOTAL_AMOUNT_AFTER_DEDUCTION')} ${item && item.amount}
                    </div>
                </div>
            </div>
        </PreviewLayout>
    )
}

SessionPreviewTemplate.propTypes = {
    sessionPreviewViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(SessionPreviewTemplate);
