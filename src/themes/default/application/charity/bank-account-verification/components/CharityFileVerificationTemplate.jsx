import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicButton, BaasicDropzone, BaasicFormControls
} from 'core/components';

const CharityFileVerificationTemplate = function ({charityFileVerificationViewStore}) {
	const {
        item,
        form,
        exportFile,
        imageUploadStore,
        uploadVerificationFile
    } = charityFileVerificationViewStore;

	return (
		<React.Fragment>
            <div className="row row--form">
                <div className="row row__align--end">
					<BaasicDropzone
						store={imageUploadStore}
					/>
					{
						item ? (
							item.charityMedia && (
								(item.isImage) ?
									(
										<div className="imageheight_sml">
											<img alt="" src={URL.createObjectURL(item.charityMedia)} />
										</div>
									)
									: (
										<BaasicButton
											className='btn btn--sml btn--primary'
											label='Download'
											onClick={() => exportFile()}
										/>
									))
						) : null
					}
				</div>
            </div>
            <div className="info-card--footer">
                <span className="u-mar--right--sml">
					<BaasicFormControls form={form} onSubmit={uploadVerificationFile} />
				</span>
            </div>
		</React.Fragment>
	);
};

CharityFileVerificationTemplate.propTypes = {
	t: PropTypes.func,
	charityFileVerificationViewStore : PropTypes.object.isRequired
};

export default defaultTemplate(CharityFileVerificationTemplate);
