import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, EditFormContent, BaasicFormControls, BaasicDropzone } from 'core/components';
import { isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';

const CharityUploadLogoTemplate = function({ t, charityUploadLogoViewStore }) {
	const { imageUploadStore, form, onEnableEditClick, item } = charityUploadLogoViewStore;

	return (
		<div>
			<EditFormContent form={form}>
				<div className="card--med card--primary u-mar--bottom--med">
					<h3 className="u-mar--bottom--med">{t('CHARITY.UPLOAD_LOGO.TITLE')}</h3>
					<div className="row">
						<div className={`col col-sml-12 col-lrg-${item ? 8 : 12}`}>
							<BaasicDropzone
								store={imageUploadStore}
								disabled={!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('coreMediaVaultEntryId').value)}
							/>
						</div>
						{item ? (
                            <div className="col col-sml-12 col-lrg-4">
                                <p className="form__group__label">Current Logo</p>
                                
                                <div className="card--image card--med u-mar--bottom--sml type--center">
                                    <img className="k-upload__image--original" alt="" src={URL.createObjectURL(item)} />
                                </div>
                            </div>
						) : null}
					</div>
					<div className="info-card--footer">
						{/* <BaasicButton
                            type="button"
                            className="btn btn--med btn--med--wide btn--ghost u-mar--right--sml"
                            onClick={onEnableEditClick}
                            label="Cancel"
                        /> */}
						<BaasicFormControls form={form} onSubmit={form.onSubmit} />
					</div>
				</div>
			</EditFormContent>
		</div>
	);
};

CharityUploadLogoTemplate.propTypes = {
	charityUploadLogoViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
};

export default defaultTemplate(CharityUploadLogoTemplate);
