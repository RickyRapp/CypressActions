import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicButton, BaasicDropzone, BaasicFormControls
} from 'core/components';

const CharityFileVerificationTemplate = function ({charityFileVerificationViewStore}) {
	const {
        imageUploadStore,
        uploadVerificationFile
    } = charityFileVerificationViewStore;

	return (
		<React.Fragment>
			<div className="card--primary card--plaid">
						<div className="card--plaid__container">
							<i class="u-icon u-icon--verification u-icon--verification-manual"></i>

							<h2 className="card--plaid__title u-mar--bottom--med">Manual verification</h2>
							<p className="card--plaid__text">Verify your connection to this organization by uploading the following documents.</p>

							<ul className="card--plaid__list">
								<li>US Drivers License</li>
								<li><strong>Charity Name</strong> charity bank statement</li>
							</ul>

							<BaasicDropzone
								store={imageUploadStore}
							/>

							<button 
								className="btn btn--med btn--secondary" 
								onClick={uploadVerificationFile}  
								type="button">
									Verify Manually 
									<span>Both documents are required.</span>
							</button>
						</div>
				</div>
		</React.Fragment>
	);
};

CharityFileVerificationTemplate.propTypes = {
	t: PropTypes.func,
	charityFileVerificationViewStore : PropTypes.object.isRequired
};

export default defaultTemplate(CharityFileVerificationTemplate);
