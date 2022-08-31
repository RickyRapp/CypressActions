import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, FormatterResolver } from 'core/components';

function Step4Template({ t, onNextStepClick, currentCount, session, sessionCertificates, charity }) {
	return (
		<div className="container--sidebar">
			<div className="card--med card--primary">
				<div className="u-separator--primary u-padd--bottom--sml u-mar--bottom--med">
					<span className="type--med type--wgt--bold">
						{t('SESSION.CREATE.STEP4.SESSION_NUMBER')}:
						<span className="type--wgt--bold u-mar--left--sml">{session && session.confirmationNumber}</span>
					</span>
					<span className="type--med type--wgt--bold u-push">
						{t('SESSION.CREATE.STEP4.TOTAL')}:{' '}
						<span className="type--wgt--bold u-mar--left--sml">{sessionCertificates.length > 0 && <FormatterResolver
							item={{ amount: sessionCertificates.map(c => c.certificateValue).reduce((a, b) => a + b) }}
							field='amount'
							format={{ type: 'currency' }}
						/>}</span>
					</span>
				</div>

				<div className="type--base type--wgt--regular u-mar--bottom--sml">
					<div className="row">
						<div className="col col-sml-6 u-mar--bottom--med type--base">
							<p>Charity</p>
							<p className="type--wgt--bold">{charity.label}</p>
						</div>
						<div className="col col-sml-6 u-mar--bottom--med type--base">
							<p>Checks scanned</p>
							<p className="type--wgt--bold">{sessionCertificates.length}</p>
						</div>

						<div className="col col-sml-6 u-mar--bottom--med type--base">
							<p>Fees</p>
							<p className="type--wgt--bold">
								{sessionCertificates.length > 0 &&
									sessionCertificates.map(c => c.insufficientFunds) &&
									<FormatterResolver
										item={{ amount: (sessionCertificates.map(c => c.denominationTypeValue).reduce((a, b) => a + b) - sessionCertificates.map(c => c.certificateValue).reduce((a, b) => a + b)) }}
										field='amount'
										format={{ type: 'currency' }}
									/>
								}
							</p>
						</div>
						{
							sessionCertificates.filter(x => x.insufficientFunds).length > 0 ?
								<React.Fragment>
									<div className="col col-sml-6 u-mar--bottom--sml">
										Insufficient checks
									</div>
									<div className="col col-sml-6 u-mar--bottom--sml">
										{sessionCertificates.length > 0 && sessionCertificates.map(c => c.insufficientFunds) && <FormatterResolver
											item={{ amount: sessionCertificates.filter(c => c.insufficientFunds).map(c => c.certificateValue).reduce((a, b) => a + b, 0) }}
											field='amount'
											format={{ type: 'currency' }}
										/>}
									</div>
								</React.Fragment> :
								<div className="col col-sml-6 u-mar--bottom--sml">
									Insufficient checks
									<p className="type--wgt--bold">No insufficient checks</p>
								</div>
						}

						<div className="col col-sml-6 u-mar--bottom--sml">
							<p>Total (before fees)</p>
							<p className="type--wgt--bold">
								{sessionCertificates.length > 0 ?
									<FormatterResolver
										item={{ amount: sessionCertificates.map(c => c.denominationTypeValue).reduce((a, b) => a + b) }}
										field='amount'
										format={{ type: 'currency' }}
									/>
									:
									"-"
								}
							</p>
						</div>

						<div className="col col-sml-6 u-mar--bottom--sml">
							<p>Grand total (including insufficient checks)</p>
							<p className="type--wgt--bold">
								{sessionCertificates.length > 0 ?
									<FormatterResolver
										item={{ amount: sessionCertificates.map(c => c.certificateValue).reduce((a, b) => a + b) }}
										field='amount'
										format={{ type: 'currency' }}
									/>
									:
									"-"
								}
							</p>
						</div>
						<div className="col col-sml-6 u-mar--bottom--sml">

						</div>
					</div>
				</div>

				<div className="u-separator--primary u-padd--bottom--sml"></div>

				<div className="container container--sml type--center u-mar--top--lrg">
					<div className="type--sml type--wgt--regular">
						{t('SESSION.CREATE.STEP4.FINISH_MESSAGE1')}
						{t('SESSION.CREATE.STEP4.FINISH_MESSAGE2')}
						<br />
						{t('SESSION.CREATE.STEP4.FINISH_MESSAGE3')}
					</div>
				</div>

				<div className="u-separator--primary u-padd--bottom--med"></div>

				<div className="type--center u-mar--top--lrg">
					<BaasicButton
						className="btn btn--med btn--med--wide btn--secondary"
						onClick={onNextStepClick}
						label="SESSION.CREATE.STEP4.BUTTONS.FINISH"
					/>
				</div>
			</div>
		</div>
	);
}

Step4Template.propTypes = {
	t: PropTypes.func.isRequired,
	onNextStepClick: PropTypes.func.isRequired,
	session: PropTypes.object.isRequired,
	currentCount: PropTypes.number.isRequired,
	sessionCertificates: PropTypes.any,
	charity: PropTypes.object.isRequired
};

export default defaultTemplate(Step4Template);
