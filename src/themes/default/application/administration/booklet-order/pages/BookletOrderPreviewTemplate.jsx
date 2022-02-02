import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { PreviewLayout } from 'core/layouts';
import { ApplicationEmptyState, Date, SimpleBaasicTable } from 'core/components';

const BookletOrderPreviewTemplate = function ({ bookletOrderPreviewViewStore, t }) {
	const {
		item,
		loaderStore,
		tableStore
	} = bookletOrderPreviewViewStore;

	return (
		<PreviewLayout
			store={bookletOrderPreviewViewStore}
			emptyRenderer={<ApplicationEmptyState />}
			loading={loaderStore.loading}
			layoutFooterVisible={false}
		>
			<div className="card--primary card--med u-mar--bottom--base container--sml">
				<div className="row">
					<div className="col col-sml-12 col-med-6 u-mar--bottom--sml">
						<div className="type--base type--wgt--medium type--color--note">{t('BOOKLET_ORDER.PREVIEW.DONOR_LABEL')}</div>
						<span className="input--preview">
							{item && item.donor.donorName}
						</span>
					</div>
					<div className="col col-sml-12 col-med-6 u-mar--bottom--sml">
						<div className="type--base type--wgt--medium type--color--note">{t('BOOKLET_ORDER.PREVIEW.STATUS_LABEL')}</div>
						<span className="input--preview">
							{item && item.bookletOrderStatus.name}
						</span>
					</div>
					<div className="col col-sml-12 col-med-6 u-mar--bottom--sml">
						<div className="type--base type--wgt--medium type--color--note">{t('BOOKLET_ORDER.PREVIEW.DATE_CREATED_LABEL')}</div>
						<span className="input--preview">
							{item && <Date format="full" value={item.dateCreated} />}
						</span>
					</div>
					<div className="col col-sml-12 col-med-6 u-mar--bottom--sml">
						<div className="type--base type--wgt--medium type--color--note">{t('BOOKLET_ORDER.PREVIEW.DATE_UPDATED_LABEL')}</div>
						<span className="input--preview">
							{item && <Date format="full" value={item.dateUpdated} />}
						</span>
					</div>
					<div className="col col-sml-12 col-med-6 u-mar--bottom--sml">
						<div className="type--base type--wgt--medium type--color--note">{t('BOOKLET_ORDER.PREVIEW.CONFRIMATION_NUMBER_LABEL')}</div>
						<span className="input--preview">
							{item && item.confirmationNumber}
						</span>
					</div>
					<div className="col col-sml-12 col-med-6 u-mar--bottom--sml">
						<div className="type--base type--wgt--medium type--color--note">{t('BOOKLET_ORDER.PREVIEW.DELIVERY_METHOD_LABEL')}</div>
						<span className="input--preview">
							{item && item.deliveryMethodType.name}
							{item && (item.deliveryMethodType.abrv === 'mail-usps' || item.deliveryMethodType.abrv === 'express-mail') &&
								<span>- {item.trackingNumber}</span>}
						</span>
					</div>
				</div>
			</div>
			<div>
				<div className="type--med type--wgt--medium">{t('BOOKLET_ORDER.PREVIEW.ORDER_LABEL')}</div>
				<span className="input--preview">
					<SimpleBaasicTable
						tableStore={tableStore}
					/>
				</span>
			</div>
		</PreviewLayout>
	);
};

BookletOrderPreviewTemplate.propTypes = {
	bookletOrderPreviewViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(BookletOrderPreviewTemplate);
