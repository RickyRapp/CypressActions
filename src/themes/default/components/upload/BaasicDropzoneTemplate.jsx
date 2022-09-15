import React from 'react';
import PropTypes from 'prop-types';
import { Upload } from '@progress/kendo-react-upload';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton } from 'core/components';
import { isSome } from 'core/utils';

const BaasicDropzoneTemplate = function(props) {
	const { store, t, loading } = props;

	function onChange(event) {
		onChangeFn(event);
	}

	function onChangeFn(e) {
		if (props.onChange) {
			props.onChange(e);
		}
		store.onChange(e);
	}

	function onDeleteFn(e) {
		props.modalStore.showConfirm('Are you sure you want to delete image?', async () => {
			if (props.onDelete) {
				props.onDelete(e);
			}
			store.onDeleteUploaded(e);
		});
	}

	function getDisabled() {
		if (isSome(props.disabled)) {
			return props.disabled;
		}

		return store.options.disabled;
	}

	return (
		<React.Fragment> 
			<div>
				<label className="form__group__label">{t(store.options.label)}</label>
				<Upload
					className="u-mar--top--tny"
					{...store.options}
					autoUpload={false}
					batch={false}
					withCredentials={false}
					restrictions={{ allowedExtensions: store.options.acceptFiles }}
					onAdd={onChange}
					disabled={getDisabled()}
					multiple={store.options.multiple}
					accept={store.options.accept}
				></Upload>
				{loading && (
					<div className="loader--overlay">
						<div className="center">
							<div className="lds-ring">
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
							<div>Uploading...</div>
						</div>
					</div>
				)}
			</div>

			{store.originalFiles.length > 0 &&
				store.originalFiles.map(c => {
					return (
						<div key={c} className="col col-sml-6 col-lrg-3">
							{store.options.showPreview && (
								<React.Fragment>
									<div className="row">
										<div className="col col-sml-10">
											<ImagePreview image={store.options.routeService.getPreview(c)} />
										</div>
										<div className="col col-sml-2 u-display--flex u-display--flex--justify--center">
											<label className="form__group__label u-mar--right--tny">
												{store.options.deleteUploaded && (
													<BaasicButton
														className="btn btn--icon"
														icon={'u-icon u-icon--delete u-icon--base'}
														label={t('')}
														onlyIcon={true}
														onClick={() => onDeleteFn(c)}
													/>
												)}
											</label>
										</div>
									</div>
								</React.Fragment>
							)}
						</div>
					);
				})}

			<div className="k-upload__list">
				{store.files.length > 0 &&
					store.files.map(c => {
						let rawAttachment = c.getRawFile();
						return (
							<div key={c.uid} className="k-upload__list__item">
								{store.options.showLivePreview && (
									<React.Fragment>
										<ImagePreview
											image={window.URL.createObjectURL(new Blob([rawAttachment], { type: rawAttachment.type }))}
										/>
										<p className="k-upload__list__item__label">
											{c.name.split('').length > 32
												? c.name
														.split('')
														.splice(0, 32)
														.join('') + '...'
												: c.name}
										</p>
										{store.options.removeFromBuffer && (
											<BaasicButton
												className="k-upload__list__item__close btn btn--icon u-mar--right--tny"
												icon={'u-icon u-icon--close u-icon--tny'}
												label={t('')}
												onlyIcon={true}
												onClick={() => store.onRemoveFromBuffer(c)}
											/>
										)}
									</React.Fragment>
								)}
							</div>
						);
					})}
			</div>
		</React.Fragment>
	);
};

BaasicDropzoneTemplate.propTypes = {
	store: PropTypes.object.isRequired,
	modalStore: PropTypes.object,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	multi: PropTypes.bool,
	disabled: PropTypes.bool,
	t: PropTypes.func,
	acceptFiles: PropTypes.array,
	removeFromBuffer: PropTypes.bool,
	deleteUploaded: PropTypes.bool,
	onRemoveFromBuffer: PropTypes.func,
	onDeleteUploaded: PropTypes.func,
	loading: PropTypes.any,
};

const ImagePreview = function({ image }) {
	return (
		<div
			style={{
				display: 'inline-flex',
				justifyContent: "center",
				borderRadius: 6,
				border: '1px solid #eaeaea',
				width: '100%',
				height: 100,
				padding: 4,
				boxSizing: 'border-box',
			}}
		>
			<div
				style={{
					display: 'flex',
					minWidth: 0,
					overflow: 'hidden',
				}}
			>
				<img
					src={image}
					style={{
						display: 'block',
						width: 'auto',
						height: '100%',
					}}
				/>
			</div>
		</div>
	);
};

ImagePreview.propTypes = {
	image: PropTypes.any,
};

export default defaultTemplate(BaasicDropzoneTemplate);
