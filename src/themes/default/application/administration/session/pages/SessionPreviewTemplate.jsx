import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState, FormatterResolver, Date, SimpleBaasicTable
} from 'core/components';
import { PreviewLayout } from 'core/layouts';

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
            <div className="card--primary card--med u-mar--bottom--med">
                <div className="row">
                    <div className="col col-sml-12 col-lrg-4 u-mar--bottom--med">
                        <div className="type--med type--wgt--medium">{t('SESSION.PREVIEW.FIELDS.CHARITY_LABEL')}</div>
                        <span className="type--base type--color--opaque">
                            {item && item.charity && <FormatterResolver
                                item={{ charity: item.charity }}
                                field='charity'
                                format={{ type: 'charity', value: 'charity-name-display' }}
                            />}
                        </span>
                    </div>
                    <div className="col col-sml-12 col-lrg-4 u-mar--bottom--med">
                        <div className="type--med type--wgt--medium">{t('SESSION.PREVIEW.FIELDS.FULL_NAME_LABEL')}</div>
                        <span className="type--base type--color--opaque">
                            {item && item.fullName}
                        </span>
                    </div>
                    <div className="col col-sml-12 col-lrg-4 u-mar--bottom--med">
                        <div className="type--med type--wgt--medium">{t('SESSION.PREVIEW.FIELDS.PHONE_NUMBER_LABEL')}</div>
                        <span className="type--base type--color--opaque">
                            {item && item.phoneNumber}
                        </span>
                    </div>
                    <div className="col col-sml-12 col-lrg-4 u-mar--bottom--med">
                        <div className="type--med type--wgt--medium">{t('SESSION.PREVIEW.FIELDS.EMAIL_LABEL')}</div>
                        <span className="type--base type--color--opaque">
                            {item && item.email}
                        </span>
                    </div>
                    <div className="col col-sml-12 col-lrg-4 u-mar--bottom--med">
                        <div className="type--med type--wgt--medium">{t('SESSION.PREVIEW.FIELDS.CONFIRMATION_NUMBER_LABEL')}</div>
                        <span className="type--base type--color--opaque">
                            {item && item.confirmationNumber}
                        </span>
                    </div>
                    <div className="col col-sml-12 col-lrg-4 u-mar--bottom--med">
                        <div className="type--med type--wgt--medium">{t('SESSION.PREVIEW.FIELDS.DATE_CREATED_LABEL')}</div>
                        <span className="type--base type--color--opaque">
                            {item && <Date format="full" value={item.dateCreated} />}
                        </span>
                    </div>
                </div>
            </div>

            <div className="card--primary card--med u-mar--bottom--med">
                <h3 className="u-mar--bottom--med">Certificates</h3>
                <SimpleBaasicTable
                    tableStore={tableStore}
                />
                <div className="row u-mar--top--lrg">
                    <div className="form__group col col-lrg-12">
                        {t('SESSION.EDIT.TOTAL_AMOUNT')} <FormatterResolver
                            item={{ amount: item && item.amount }}
                            field='amount'
                            format={{ type: 'currency' }}
                        />
                    </div>
                    <div className="form__group col col-lrg-12">
                        {t('SESSION.EDIT.TOTAL_AMOUNT_AFTER_FEE')} <FormatterResolver
                            item={{ amount: item && item.totalAmountForCharity }}
                            field='amount'
                            format={{ type: 'currency' }}
                        />
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
