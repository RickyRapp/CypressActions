import React from 'react'
import PropTypes from 'prop-types';
import { Date } from 'core/components';

const OrderDetailsCardTemplate = ({ item, t }) => {
    return (
        <div className="card--primary card--med u-mar--bottom--sml">
            <div className="row">
                <div className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                    <div className="type--base type--wgt--medium type--color--note">
                        {t('BOOKLET_ORDER.PREVIEW.STATUS_LABEL')}
                    </div>
                    <span className="input--preview">{item && item.bookletOrderStatus.name}</span>
                </div>
                <div className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                    <div className="type--base type--wgt--medium type--color--note">
                        {t('BOOKLET_ORDER.PREVIEW.DATE_CREATED_LABEL')}
                    </div>
                    <span className="input--preview">{item && <Date format="full" value={item.dateCreated} />}</span>
                </div>
                <div className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                    <div className="type--base type--wgt--medium type--color--note">
                        {t('BOOKLET_ORDER.PREVIEW.DATE_UPDATED_LABEL')}
                    </div>
                    <span className="input--preview">{item && <Date format="full" value={item.dateUpdated} />}</span>
                </div>
                <div className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                    <div className="type--base type--wgt--medium type--color--note">
                        {t('BOOKLET_ORDER.PREVIEW.CONFRIMATION_NUMBER_LABEL')}
                    </div>
                    <span className="input--preview">{item && item.confirmationNumber}</span>
                </div>
                <div className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                    <div className="type--base type--wgt--medium type--color--note">
                        {t('BOOKLET_ORDER.PREVIEW.DELIVERY_METHOD_LABEL')}
                    </div>
                    <span className="input--preview">
                        {item && item.deliveryMethodType.name}
                        {item &&
                            (item.deliveryMethodType.abrv === 'mail-usps' ||
                                item.deliveryMethodType.abrv === 'express-mail') && <span>- {item.trackingNumber}</span>}
                    </span>
                </div>
                <div className="col col-sml-12 col-med-4 u-mar--bottom--sml">
                    <div className="type--base type--wgt--medium type--color--note">
                        {t('BOOKLET_ORDER.PREVIEW.FOLDER_LABEL')}
                    </div>
                    <span className="input--preview">
                        {item && item.orderFolder && <i className="u-icon u-icon--approve u-icon--base"></i>}
                    </span>
                </div>
                <div className="col col-sml-12 col-med-4">
                    <div className="type--base type--wgt--medium type--color--note">
                        {t('BOOKLET_ORDER.PREVIEW.CUSTOM_LABEL')}
                    </div>
                    <span className="input--preview">
                        {item && item.customName && <i className="u-icon u-icon--approve u-icon--base"></i>}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailsCardTemplate

OrderDetailsCardTemplate.propTypes = {
    item: PropTypes.object,
    t: PropTypes.func,
};