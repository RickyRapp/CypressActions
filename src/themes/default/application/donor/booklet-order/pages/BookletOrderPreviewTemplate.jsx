import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { PreviewLayout } from 'core/layouts';
import { ApplicationEmptyState, Date, SimpleBaasicTable } from 'core/components';
import moment from 'moment';

const BookletOrderPreviewTemplate = function({ bookletOrderPreviewViewStore, t }) {
	const { item, loaderStore, tableStore } = bookletOrderPreviewViewStore;

	function getExpiryDate(val) {
		let selectedValue = parseInt(val);
		let expireDate = moment();
		if (selectedValue) {
			expireDate.add(selectedValue, 'days');
			return expireDate.format('MMM Do YYYY');
		}
		return null;
	}

	return (
		<PreviewLayout
			store={bookletOrderPreviewViewStore}
			emptyRenderer={<ApplicationEmptyState />}
			loading={loaderStore.loading}
			layoutFooterVisible={false}
		>
			<div className="row">
				<div className="col col-sml-12 col-lrg-8 col-xxlrg-6">
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
				</div>
				<div className="col col-sml-12 col-lrg-4 col-xxlrg-6">
					{item &&
						(item.customName ||
							item.customizedAddressLine1 ||
							(item.expirationDays &&
								tableStore &&
								tableStore.data &&
								tableStore.data.filter(x => !x.isPrePaid).length > 0)) && (
							<div className="card--primary card--med">
								<div className="type--base type--wgt--medium type--color--note">
									{t('BOOKLET_ORDER.PREVIEW.CUSTOM_LABEL')}
									<i className="u-icon u-icon--approve u-icon--base u-mar--left--tny"></i>
								</div>
								<span>
									{item && (item.customName || item.expirationDays || item.customizedAddressLine1) && (
										<div className="row">
											{item.customName && (
												<p className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
													<p className="type--base type--wgt--medium type--color--note">Name:</p>
													<span className="type--base type--color--text type--break--word">{item.customName}</span>
												</p>
											)}
											{item.customizedAddressLine1 && (
												<p className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
													<p className="type--base type--wgt--medium type--color--note">Address:</p>
													<span className="type--base type--color--text type--break--word">{item.customizedAddressLine1}</span>
												</p>
											)}
											{item.customizedAddressLine2 && (
												<p className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
													<p className="type--base type--wgt--medium type--color--note">Address 2:</p>
													<span className="type--base type--color--text type--break--word">{item.customizedAddressLine2}</span>
												</p>
											)}
											{item.customizedCity && (
												<p className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
													<p className="type--base type--wgt--medium type--color--note">City:</p>
													<span className="type--base type--color--text type--break--word">{item.customizedCity}</span>
												</p>
											)}
											{item.customizedState && (
												<p className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
													<p className="type--base type--wgt--medium type--color--note">State:</p>
													<span className="type--base type--color--text type--break--word">{item.customizedState}</span>
												</p>
											)}
											{item.customizedCity && (
												<p className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
													<p className="type--base type--wgt--medium type--color--note">Zip code:</p>
													<span className="type--base type--color--text type--break--word">{item.customizedZipCode}</span>
												</p>
											)}
											{tableStore &&
												tableStore.data &&
												tableStore.data.filter(x => !x.isPrePaid).length > 0 &&
												item.expirationDays && (
													<p className="booklet__list__item">
														Expiration date:{' '}
														<span className="type--base type--color--text type--break--word">{getExpiryDate(item.expirationDays)}</span>
													</p>
												)}
										</div>
									)}
								</span>
							</div>
						)}
				</div>
				<div className="col col-sml-12">
					<div className="type--base type--wgt--medium type--color--note u-mar--bottom--tny">
						{t('BOOKLET_ORDER.PREVIEW.ORDER_LABEL')}
					</div>
					<span className="input--preview">
						<SimpleBaasicTable tableStore={tableStore} />
					</span>
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
