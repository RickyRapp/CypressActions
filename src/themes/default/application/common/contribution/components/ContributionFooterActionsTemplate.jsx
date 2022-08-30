import React from 'react';
import { BaasicButton } from 'core/components';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const ContributionFooterActionsTemplate = ({ info, clipboardText, downloadFile }) => {
	return (
		<div>
			{info && (
				<React.Fragment>
					<p className="type--color--note type--wgt--bold u-mar--bottom--med">{info}</p>
					<div className="u-separator--primary u-mar--bottom--med"></div>
				</React.Fragment>
			)}

			<div className="c-footer__actions u-mar--bottom--sml">
				<BaasicButton
					className="btn btn--lrg btn--primary"
					onClick={() => {
						navigator.clipboard.writeText(clipboardText);
					}}
					label="Copy to clipboard"
				/>
				<BaasicButton className="btn btn--lrg btn--primary" onClick={downloadFile} label="Download" />
			</div>
		</div>
	);
};

export default defaultTemplate(ContributionFooterActionsTemplate);

ContributionFooterActionsTemplate.propTypes = {
	info: PropTypes.string,
	clipboardText: PropTypes.any,
	downloadFile: PropTypes.any,
};
