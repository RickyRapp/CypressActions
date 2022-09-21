import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicFormControls, BaasicButton, BaasicModal, FormatterResolver } from 'core/components';
import { BlankCertificateModal } from '.';
import { CharityRemoteDepositInfoTemplate } from './'
class Step3Template extends React.Component {
	constructor(props) {
		super(props);
	}

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
			<div className="container--sidebar">
				<div>
					<div className="card--primary card--med u-mar--bottom--sml">
						{/* <h3 className=" u-mar--bottom--med">General Data</h3> */}
						<div className="u-mar--bottom--med">
							<div className="row scanner__table--head">
								<div className="col col-lrg-1 type--base type--wgt--medium"></div>
								<div className="col col-lrg-2 type--base type--wgt--medium">{t('Certificate Number')}</div>
								<div className="col col-lrg-3 type--base type--wgt--medium">{t('Barcode')}</div>
								<div className="col col-lrg-2 type--base type--wgt--medium type--right">{t('Denomination')}</div>
								<div className="col col-lrg-2 type--base type--wgt--medium type--right">{t('Amount')}</div>
								<div className="col col-lrg-2 type--base type--wgt--medium type--center">{t('Action')}</div>
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
										<div className="col col-lrg-2 type--sml type--wgt--medium type--right">{`$${c.denominationTypeValue}`}</div>
										<div className="col col-lrg-2 type--sml type--wgt--medium type--right">
											${c.certificateValue} {c.insufficientFunds ? ` - insufficient funds` : ''}
										</div>
										<div className="col col-lrg-2 type--sml type--wgt--medium type--center">
											{c.isBlank ? <BaasicButton
												className="btn btn--icon"
												onlyIconClassName="u-mar--right--tny"
												icon="u-icon u-icon--edit u-icon--sml"
												label="CONTRIBUTION.LIST.BUTTON.EDIT"
												onlyIcon={true}
												onClick={() => editCheck(c)}
											></BaasicButton> : null}
											<BaasicButton
												className="btn btn--icon"
												onlyIconClassName="u-mar--right--tny"
												icon="u-icon u-icon--close--secondary u-icon--sml"
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

						<div className="u-separator--primary u-mar--bottom--med u-mar--top--sml"></div>

						<div className="u-display--flex flex--primary">
							<BaasicButton
								className="btn btn--med btn--med--wide btn--primary u-mar--right--sml"
								onClick={removeFromCache}
								label="Cancel Session"
							/>

							<div>
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

				<div>
					<CharityRemoteDepositInfoTemplate sessionCertificates={sessionCertificates} charity={charity} t={t} />
				</div>
			</div >
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
