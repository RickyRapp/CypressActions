import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BasicInput,
	BaasicFieldDropdown,
	BaasicFormControls,
	EditFormContent,
	NumberFormatInputField,
	BaasicButton,
	BaasicModal,
} from 'core/components';
import {
	CharityBankAccountList,
	CharityAddressListTable,
	CharityDescription,
	CharityUploadLogo,
	CharityUploadPhoto,
} from 'application/charity/charity/components';
import { CharityWithdrawFund } from 'application/administration/charity/components';
import { CharityQRCardTemplate } from '../components';
function CharityGeneralDataTemplate({ charityGeneralDataViewStore, t }) {
	const {
		form,
		item,
		charityTypeDropdownStore,
		charityStatusDropdownStore,
		withdrawFundModalParams,
		openWithdrawFundModalClick,
        onEnableEditClick,        
	} = charityGeneralDataViewStore;

	return (
		<div>
			<div className="u-mar--bottom--sml">
				<EditFormContent form={form}>
					<React.Fragment>
						<div className="card--med card--primary">
							<h3 className="u-mar--bottom--med">{t('CHARITY.EDIT.FIELDS.TITLE')}</h3>
							{item && item.availableBalance > 0 && (
								<BaasicButton
									authorization={'theDonorsFundAdministrationSection.update'}
									className="btn btn--sml btn--sml--wide btn--primary u-push"
									label="CHARITY.EDIT.BUTTON.WITHDRAW_FUNDS"
									onClick={openWithdrawFundModalClick}
								/>
							)}

                            <CharityQRCardTemplate charityGeneralDataViewStore={charityGeneralDataViewStore} t={t} />

							<div className="row row--form u-mar--bottom--med">
								<div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
									<BasicInput field={form.$('name')} disabled={true} />
								</div>
								<div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
									<BasicInput field={form.$('dba')} />
								</div>
								<div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
									<BaasicFieldDropdown field={form.$('charityTypeId')} disabled={true} store={charityTypeDropdownStore} />
								</div>
								<div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
									<BaasicFieldDropdown field={form.$('charityStatusId')} disabled={true} store={charityStatusDropdownStore} />
								</div>
								<div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
									<BasicInput field={form.$('url')} />
								</div>
							</div>
							<div className="u-mar--bottom--sml">
								<h3 className="type--med type--wgt--medium">Contact info</h3>
								<div className="row row--form">
									<div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
										<BasicInput field={form.$('contactInformationName')} />
									</div>
									<div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
										<BasicInput field={form.$('contactInformationEmail')} />
									</div>
									<div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
										<NumberFormatInputField field={form.$('contactInformationNumber')} />
									</div>
								</div>
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
					</React.Fragment>
					{/* <div className="cursor--pointer" title="Click to edit" onClick={onEnableEditClick}>
							<div className="row">
								<div className="col col-sml-12 col-lrg-6 col-xxlrg-4 u-mar--bottom--med">
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Name:</p>
									<p className="type--base type--wgt--bold">{item ? `${item.name}` : ''}</p>
								</div>
								<div className="col col-sml-12 col-lrg-6 col-xxlrg-4 u-mar--bottom--med">
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
										{t('CHARITY.EDIT.FIELDS.CHARITY_ACCOUNT_NUMBER')}
									</p>
									<p className="type--base type--wgt--bold">{item && item.charityAccountNumber}</p>
								</div>
								<div className="col col-sml-12 col-lrg-6 col-xxlrg-4 u-mar--bottom--med">
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
										{t('CHARITY.EDIT.FIELDS.CHARITY_TAX_ID')}
									</p>
									<p className="type--base type--wgt--bold"> {item && item.taxId}&nbsp; </p>
								</div>
								<div className="col col-sml-12 col-lrg-6 col-xxlrg-4 u-mar--bottom--med">
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Contact Name:</p>
									<p className="type--base type--wgt--bold">{item && item.contactInformationName}</p>
								</div>
								<div className="col col-sml-12 col-lrg-6 col-xxlrg-4">
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Contact Email:</p>
									<p className="type--base type--wgt--bold">{item && item.contactInformationEmail}</p>
								</div>
							</div>
						</div> 
                        */}
				</EditFormContent>

				<BaasicModal modalParams={withdrawFundModalParams}>
					<CharityWithdrawFund />
				</BaasicModal>
			</div>

			<CharityDescription />
			<CharityAddressListTable />
			<CharityBankAccountList />
			<CharityUploadLogo />
			<CharityUploadPhoto />
		</div>
	);
}

CharityGeneralDataTemplate.propTypes = {
	charityGeneralDataViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(CharityGeneralDataTemplate);
