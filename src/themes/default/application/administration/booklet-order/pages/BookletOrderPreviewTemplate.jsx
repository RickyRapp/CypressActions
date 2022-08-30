import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { PreviewLayout } from 'core/layouts';
import { OrderDetailsCardTemplate, CustomizedOrderDetailsTemplate } from 'themes/application/administration/booklet-order/components'
import { ApplicationEmptyState, SimpleBaasicTable } from 'core/components';

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
			<div className="row rof--form">
				<div className="col col-sml-12 col-lrg-8 col-xxlrg-6">
					<OrderDetailsCardTemplate item={item} t={t} />
				</div>
				<div className="col col-sml-12 col-lrg-8 col-xxlrg-6">
					<CustomizedOrderDetailsTemplate tableStore={tableStore} item={item} t={t} />
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
