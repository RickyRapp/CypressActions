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
			<div className="container--sidebar">

				<div className="card--primary card--med">
					<div className="row">
						<div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
							<div className="type--base type--wgt--medium type--color--note">{t('BOOKLET_ORDER.PREVIEW.DONOR_LABEL')}</div>
							<span className="input--preview">
								{item && item.donor.donorName}
							</span>
						</div>
						<div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
							<div className="type--base type--wgt--medium type--color--note">{t('BOOKLET_ORDER.PREVIEW.STATUS_LABEL')}</div>
							<span className="input--preview">
								{item && item.bookletOrderStatus.name}
							</span>
						</div>
						<div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
							<div className="type--base type--wgt--medium type--color--note">{t('BOOKLET_ORDER.PREVIEW.DATE_CREATED_LABEL')}</div>
							<span className="input--preview">
								{item && <Date format="full" value={item.dateCreated} />}
							</span>
						</div>
						<div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
							<div className="type--base type--wgt--medium type--color--note">{t('BOOKLET_ORDER.PREVIEW.DATE_UPDATED_LABEL')}</div>
							<span className="input--preview">
								{item && <Date format="full" value={item.dateUpdated} />}
							</span>
						</div>
						<div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
							<div className="type--base type--wgt--medium type--color--note">{t('BOOKLET_ORDER.PREVIEW.CONFRIMATION_NUMBER_LABEL')}</div>
							<span className="input--preview">
								{item && item.confirmationNumber}
							</span>
						</div>
						<div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
							<div className="type--base type--wgt--medium type--color--note">{t('BOOKLET_ORDER.PREVIEW.DELIVERY_METHOD_LABEL')}</div>
							<span className="input--preview">
								{item && item.deliveryMethodType.name}
								{item && (item.deliveryMethodType.abrv === 'mail-usps' || item.deliveryMethodType.abrv === 'express-mail') &&
									<span>- {item.trackingNumber}</span>}
							</span>
						</div>
						<div className="col col-sml-12 col-med-3 u-mar--bottom--sml">
							<div className="type--base type--wgt--medium type--color--note">{t('BOOKLET_ORDER.PREVIEW.FOLDER_LABEL')}</div>
							<span className="input--preview">
								{item && item.orderFolder && <i className="u-icon u-icon--approve u-icon--base"></i>}
							</span>
						</div>
						<div className="col col-sml-12 col-lrg-12 u-mar--bottom--sml">
							<div className="type--base type--wgt--medium type--color--note u-mar--bottom--tny">{t('BOOKLET_ORDER.PREVIEW.ORDER_LABEL')}</div>
							<span className="input--preview">
								<SimpleBaasicTable
									tableStore={tableStore}
								/>
							</span>
						</div>
					</div>
				</div>
				<div>
					{item && item.customName &&
						<div className="card--primary card--med">
							<div className="type--base type--wgt--medium type--color--note">
								{t('BOOKLET_ORDER.PREVIEW.CUSTOM_LABEL')}
								<i className="u-icon u-icon--approve u-icon--base u-mar--left--tny"></i>
							</div>
							<span className="input--preview">
								{item && (item.customName || item.expirationDays) &&
									<div>
										{item.customName && <p className="booklet__list__item">Name: <span className="type--base type--color--text">{item.customName}</span></p>}
										{item.shippingAddressLine1 && <p className="booklet__list__item">Address: <span className="type--base type--color--text">{item.shippingAddressLine1}</span></p>}
										{item.shippingAddressLine2 && <p className="booklet__list__item">Address 2: <span className="type--base type--color--text">{item.shippingAddressLine2}</span></p>}
										{item.shippingCity && <p className="booklet__list__item">City: <span className="type--base type--color--text">{item.shippingCity}</span></p>}
										{item.shippingState && <p className="booklet__list__item">State: <span className="type--base type--color--text">{item.shippingState}</span></p>}
										{item.shippingCity && <p className="booklet__list__item">Zip code: <span className="type--base type--color--text">{item.shippingZipCode}</span></p>}
									</div>
								}
							</span>
						</div>
					}
				</div>
			</div>
		</PreviewLayout>
	);
};

BookletOrderPreviewTemplate.propTypes = {
	bookletOrderPreviewViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(BookletOrderPreviewTemplate);
