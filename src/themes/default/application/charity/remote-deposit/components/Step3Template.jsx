import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicFormControls, BaasicButton, BaasicModal, FormatterResolver } from 'core/components';
import { BlankCertificateModal } from '.';

class Step3Template extends React.Component {
	constructor(props) {
		super(props);
	}
	// componentDidMount() {
	// 	document.addEventListener('keydown', this.props.onBarcodeChange, true);
	// }

	// componentWillUnmount() {
	// 	document.removeEventListener('keydown', this.props.onBarcodeChange, true);
	// }
	render() {
		const {
			form,
			t,
			onPreviousStepClick,
			barcode,
			onBarcodeChange,
			sessionCertificates,
			blankCertificateModal,
			cancelCertificate,
			editCheck,
			removeFromCache,
			charity
		} = this.props;
		return (
			<React.Fragment>
				<div className="card--lrg">
					<div className="row">
						<div className="col col-sml-12 col-lrg-6">
							<div className="card--primary card--med u-mar--bottom--sml">
								<h3 className=" u-mar--bottom--med">General Data</h3>
								<div className="u-mar--bottom--lrg">
									<div className="row scanner__table--head">
										<div className="col col-lrg-1 type--base type--wgt--medium"></div>
										<div className="col col-lrg-2 type--base type--wgt--medium">{t('Certificate Number')}</div>
										<div className="col col-lrg-3 type--base type--wgt--medium">{t('Barcode')}</div>
										<div className="col col-lrg-2 type--base type--wgt--medium">{t('Denomination')}</div>
										<div className="col col-lrg-2 type--base type--wgt--medium">{t('Amount')}</div>
										<div className="col col-lrg-2 type--base type--wgt--medium">{t('Action')}</div>
									</div>
									{sessionCertificates.map((c, index) => {
										return (
											<div className="row scanner__table--body" key={c.barcode}>
												<div className="col col-lrg-1 type--sml type--wgt--medium">
													{index + 1}.
												</div>
												<div className="col col-lrg-2 type--sml type--wgt--medium">
													{c.bookletCode}-{c.certificateCode}
												</div>
												<div className="col col-lrg-3 type--sml type--wgt--medium">{c.barcode}</div>
												<div className="col col-lrg-2 type--sml type--wgt--medium">{`$${c.denominationTypeValue}`}</div>
												<div className="col col-lrg-2 type--sml type--wgt--medium">
													${c.certificateValue} {c.insufficientFunds ? ` - insufficient funds` : ''}
												</div>
												<div className="col col-lrg-2 type--sml type--wgt--medium">
													{c.isBlank ? <BaasicButton
														className="btn btn--icon"
														onlyIconClassName="u-mar--right--tny"
														icon="u-icon u-icon--edit u-icon--base"
														label="CONTRIBUTION.LIST.BUTTON.EDIT"
														onlyIcon={true}
														onClick={() => editCheck(c)}
													></BaasicButton> : null}
													<BaasicButton
														className="btn btn--icon"
														onlyIconClassName="u-mar--right--tny"
														icon="u-icon u-icon--close--secondary u-icon--base"
														label="CONTRIBUTION.LIST.BUTTON.CANCEL"
														onlyIcon={true}
														onClick={() => cancelCertificate(c.barcode)}
													></BaasicButton>
												</div>
											</div>
										);
									})}
								</div>

								<div className="row">
									<div className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
										<input
											type="text"
											className="input input--lrg input--text"
											id="barcode"
											value={barcode}
											onChange={onBarcodeChange}
											maxLength={10}
											onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
										/>

									</div>
								</div>
								<BaasicModal modalParams={blankCertificateModal} showClose={false}>
									<BlankCertificateModal />
								</BaasicModal>
							</div>
						</div>
						<div className="col col-sml-12 col-lrg-6">
							{/* <div className="card--primary card--med type--base type--wgt--regular u-mar--bottom--sml">
								How to scan certificates
							</div> */}
							<div className="card--primary card--med type--base type--wgt--regular u-mar--bottom--sml">
								<div className="card--tny card--secondary card--inline u-mar--bottom--sml">
									<span className="type--base type--wgt--medium type--color--opaque">
										Charity
									</span>
									<span className="type--base type--wgt--bold u-push w--400--px">
										{charity.label}
									</span>
								</div>
							</div>

							<div className="card--primary card--med type--base type--wgt--regular u-mar--bottom--sml">
								<div className="card--tny card--secondary u-mar--bottom--sml">
									<span className="type--base type--wgt--medium type--color--opaque">
										Checks scanned
									</span>
									<span className="type--base type--wgt--bold u-push">
										{`${sessionCertificates.length}`}
									</span>
								</div>

								<div className="card--tny card--secondary u-mar--bottom--sml">
									<span className="type--base type--wgt--medium type--color--opaque">
										{t('GRANT.PREVIEW.FIELDS.AMOUNT_LABEL')}
									</span>
									<span className="type--base type--wgt--bold u-push">
										{sessionCertificates.length > 0 && sessionCertificates.map(c => c.insufficientFunds) && <FormatterResolver
											item={{ amount: sessionCertificates.map(c => c.certificateValue).reduce((a, b) => a + b) }}
											field='amount'
											format={{ type: 'currency' }}
										/>}
									</span>
								</div>

								<div className="card--tny card--secondary u-mar--bottom--sml">
									<span className="type--base type--wgt--medium type--color--opaque">
										Fees
									</span>
									<span className="type--base type--wgt--bold u-push">
									{sessionCertificates.length > 0 && sessionCertificates.map(c => c.insufficientFunds) && <FormatterResolver
										item={{ amount: ( sessionCertificates.map(c => c.denominationTypeValue).reduce((a, b) => a + b) - sessionCertificates.map(c => c.certificateValue).reduce((a, b) => a + b) ) }}
										field='amount'
										format={{ type: 'currency' }}
									/>}
									</span>
								</div>

								{/* <div className="col col-sml-6">
									Fees
								</div>
								<div className="col col-sml-6">
									{sessionCertificates.length > 0 && sessionCertificates.map(c => c.insufficientFunds) && <FormatterResolver
										item={{ amount: sessionCertificates.map(c => (c.isBlank ? c.certificateValue : (c.denominationTypeValue - c.certificateValue))).reduce((a, b) => a + b) }}
										field='amount'
										format={{ type: 'currency' }}
									/>}
								</div> */}

								<div className="card--tny card--secondary u-mar--bottom--sml">
									<span className="type--base type--wgt--medium type--color--opaque">
										Total (before fees)
									</span>
									<span className="type--base type--wgt--bold u-push">
									{sessionCertificates.length > 0 && <FormatterResolver
										item={{ amount: sessionCertificates.map(c => c.denominationTypeValue).reduce((a, b) => a + b) }}
										field='amount'
										format={{ type: 'currency' }}
									/>}
									</span>
								</div>
								{/* <div className="col col-sml-6">
									<span className=" type--color--note">Total</span> (before fees)
								</div>
								<div className="col col-sml-6">
									{sessionCertificates.length > 0 && <FormatterResolver
										item={{ amount: sessionCertificates.map(c => c.denominationTypeValue).reduce((a, b) => a + b) }}
										field='amount'
										format={{ type: 'currency' }}
									/>}
								</div> */}
							</div>
							
							<div className="card--primary card--med type--base type--wgt--regular u-mar--bottom--sml">
								<div className="card--tny card--secondary u-mar--bottom--sml">
									<span className="type--base type--wgt--medium type--color--opaque">
										Insufficient checks
									</span>
									<span className="type--base type--wgt--bold u-push">
										{sessionCertificates.length > 0 && sessionCertificates.map(c => c.insufficientFunds) && <FormatterResolver
											item={{ amount: sessionCertificates.filter(c => c.insufficientFunds).map(c => c.certificateValue).reduce((a, b) => a + b, 0) }}
											field='amount'
											format={{ type: 'currency' }}
										/>}
									</span>
								</div>

								<div className="card--tny card--secondary u-mar--bottom--sml">
									<span className="type--base type--wgt--medium type--color--opaque">
										<span className=" type--color--note">Grand total</span> (including insufficient checks)
									</span>
									<span className="type--base type--wgt--bold u-push">
										{sessionCertificates.length > 0 && <FormatterResolver
											item={{ amount: sessionCertificates.map(c => c.certificateValue).reduce((a, b) => a + b) }}
											field='amount'
											format={{ type: 'currency' }}
										/>}
									</span>
								</div>
							</div>
						</div>
						<div className="col col-lrg-6">
							<div className="scanner__footer">
								<div>
									<BaasicButton
										className="btn btn--med btn--med--wide btn--primary u-mar--right--sml"
										onClick={onPreviousStepClick}
										label="SESSION.CREATE.STEP2.BUTTONS.BACK"
									/>
									<BaasicButton
										className="btn btn--med btn--med--wide btn--primary u-mar--right--sml"
										onClick={removeFromCache}
										label="Cancel Session"
									/>
								</div>
								<BaasicFormControls
									form={form}
									onSubmit={form.onSubmit}
									// disableSave={sessionCertificates.length === 0}
									label="SESSION.CREATE.STEP2.BUTTONS.SAVE"
								/>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment >
		);
	}
}

Step3Template.propTypes = {
	t: PropTypes.func.isRequired,
	form: PropTypes.object.isRequired,
	onPreviousStepClick: PropTypes.func.isRequired,
	barcode: PropTypes.string.isRequired,
	onBarcodeChange: PropTypes.func.isRequired,
	sessionCertificates: PropTypes.any.isRequired,
	blankCertificateModal: PropTypes.any,
	cancelCertificate: PropTypes.any,
	editCheck: PropTypes.any,
	removeFromCache: PropTypes.any,
	charity: PropTypes.object.isRequired
};

export default defaultTemplate(Step3Template);
