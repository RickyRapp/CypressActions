import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEmptyState } from 'core/components';
import { isSome } from 'core/utils';
import { PreviewLayout } from 'core/layouts';
import { GrantProgressTimeline } from 'application/administration/grant/components';
import { GrantPreviewLoaderTemplate, GrantsPreviewCardTemplate } from '../components';
import { ProgressTimelineLoaderTemplate } from 'themes/components';

function GrantPreviewTemplate({ grantPreviewViewStore, t }) {
	const { item, loaderStore, isEditable, statusList } = grantPreviewViewStore;

	return (
		<PreviewLayout
			store={grantPreviewViewStore}
			emptyRenderer={<ApplicationEmptyState />}
			loading={false}
			layoutFooterVisible={isEditable}
		>
			<div>
				<div className="container--base">
					{loaderStore.loading ? (
						<ProgressTimelineLoaderTemplate />
					) : (
						<React.Fragment>
							{item &&
							!(item.donationStatus.abrv === 'processed' && !isSome(item.debitCharityTransaction)) && ( //old grants
									<GrantProgressTimeline item={item} statusList={statusList} />
								)}
						</React.Fragment>
					)}
				</div>
				<div className="container--sml">
					<div className="card--primary card--med u-mar--bottom--med">
						{loaderStore.loading ? <GrantPreviewLoaderTemplate numLines={8} /> : <GrantsPreviewCardTemplate item={item} t={t} />}
					</div>
				</div>
			</div>
		</PreviewLayout>
	);
}

GrantPreviewTemplate.propTypes = {
	grantPreviewViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(GrantPreviewTemplate);
