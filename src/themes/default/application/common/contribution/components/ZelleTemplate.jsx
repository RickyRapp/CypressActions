import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const ZelleTemplate = ({ bankAccount }) => {
	return (
		<div>
			<div className="card--column--med">
				<div className="row">
					<span className="col col-sml-12 col-lrg-6 type--base type--wgt--medium type--color--opaque">
						Our Zelle email address
					</span>
					<span className="col col-sml-12 col-lrg-6 type--base type--wgt--bold type--break--all u-push">
						QP@TheDonorsFund.org
					</span>
				</div>
			</div>

			<div className="card--column--med">
				<div className="row">
					<span className="col col-sml-12 col-lrg-6 type--base type--wgt--medium type--color--opaque">Zelle Memo</span>
					<span className="col col-sml-12 col-lrg-6 type--base type--wgt--bold type--break--all u-push">
						{bankAccount ? bankAccount.accountNumber : 'xxxx-xxxx-xxxx-xxxx(your full account number)'}{' '}
					</span>
				</div>
			</div>
		</div>
	);
};

export default defaultTemplate(ZelleTemplate);

ZelleTemplate.propTypes = {
	bankAccount: PropTypes.any,
};
