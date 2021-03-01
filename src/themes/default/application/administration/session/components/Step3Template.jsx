import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicFormControls, BaasicButton, BaasicInput, BaasicModal } from 'core/components';
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
			form, t, onPreviousStepClick, barcode, onBarcodeChange, sessionCertificates, blankCertificateModal
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
										<div className="col col-lrg-3 type--base type--wgt--medium">{t('Denomination')}</div>
										<div className="col col-lrg-3 type--base type--wgt--medium">{t('Amount')}</div>
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
												<div className="col col-lrg-3 type--sml type--wgt--medium">{`$${c.denominationTypeValue}`}</div>
												<div className="col col-lrg-3 type--sml type--wgt--medium">
													${c.certificateValue} {c.insufficientFunds ? ` - insufficient funds` : ''}
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
										/>

									</div>
								</div>
								<BaasicModal modalParams={blankCertificateModal} showClose={false}>
									<BlankCertificateModal />
								</BaasicModal>
							</div>
						</div>
						<div className="col col-sml-12 col-lrg-6">
							<div className="card--primary card--med type--base type--wgt--regular u-mar--bottom--sml">
								How to scan certificates
						</div>
						</div>
						<div className="col col-lrg-6">
							<div className="scanner__footer">
								<BaasicButton
									className="btn btn--med btn--med--wide btn--primary u-mar--right--sml"
									onClick={onPreviousStepClick}
									label="SESSION.CREATE.STEP2.BUTTONS.BACK"
								/>
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
};

export default defaultTemplate(Step3Template);
