/* eslint-disable react/prop-types */
import React from 'react'
import { Date } from 'core/components';
import { CardItem } from 'themes/components';

const GeneralInformationTemplate = ({ item, t }) => {
    return (
        <div>
            <h3 className=" u-mar--bottom--med">{t('CONTRIBUTION.DETAILS.GENERAL_INFORMATION')}</h3>

            <div className="card--secondary card--med">
                <CardItem label={t('SESSION.PREVIEW.FIELDS.CHARITY_LABEL')} value={item && item.charity && item.charity.name} />
                <CardItem label={t('SESSION.PREVIEW.FIELDS.FULL_NAME_LABEL')} value={item && item.fullName} />
                <CardItem label={t('SESSION.PREVIEW.FIELDS.PHONE_NUMBER_LABEL')} value={item && item.phoneNumber} />
                <CardItem label={t('SESSION.PREVIEW.FIELDS.EMAIL_LABEL')} value={item && item.email} />
                <CardItem label={t('SESSION.PREVIEW.FIELDS.CONFIRMATION_NUMBER_LABEL')} value={item && item.confirmationNumber} />
                <CardItem label={t('SESSION.PREVIEW.FIELDS.ORIGINAL_CONFIRMATION_NUMBER_LABEL')} value={item && item.originalConfirmationNumber} />
                <CardItem label={t('SESSION.PREVIEW.FIELDS.DATE_CREATED_LABEL')} value={item && <Date format="full" value={item.dateCreated} />} />
                <CardItem label={t('SESSION.PREVIEW.FIELDS.CHECK_COUNT_LABEL')} value={item && item.checkCount} />
                <CardItem
                    label={t('SESSION.PREVIEW.FIELDS.ESTIMATED_AMOUNT_LABEL')}
                    value={item && (
                        <React.Fragment>
                            {item && item.estimatedAmount}
                            <b>&nbsp;{item && item.estimatedAmount && (item.amount - item.estimatedAmount > 0 ? '(↑)' : (item.amount - item.estimatedAmount == 0 ? '(=)' : '(↓)'))}</b>
                        </React.Fragment>
                    )} />
            </div>
        </div>
    )
}

export default GeneralInformationTemplate