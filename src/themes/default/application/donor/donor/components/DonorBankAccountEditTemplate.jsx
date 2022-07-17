import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFormControls,
    NumberFormatInputField,
    BasicFieldCheckbox, BaasicButton, EditFormContent, BaasicDropzone
} from 'core/components';
import { CharityPlaid } from 'application/charity/charity/components';

function DonorBankAccountEditTemplate({ donorBankAccountEditViewStore }) {
    const {
        title,
        form,
        onCancelEditClick,
        onBlurRoutingNumber,
        useDonorContactInformations,
        bankAccountCount,
        item,
        imageUploadStore
    } = donorBankAccountEditViewStore;

    return (
        <EditFormContent form={form} >
            <div className="card--med card--primary">
            <div>
				{!item && <span>Create new bank account manually or using : </span>}
					<div className="col col-sml-12 col-lrg-6">
						<div className="u-mar--bottom--sml w--100--to-med">
						<CharityPlaid
                            entityType={"donor"}
							bankAccount={item}
						/>
						</div>
					</div>
				</div>

                <h3 className="type--med type--wgt--medium type--color--opaque u-mar--bottom--med">{title}</h3>
                <div className="row row--form u-mar--bottom--sml">
                    <div className="form__group col col-sml-12 col-lrg-3">
                        <BasicInput field={form.$('accountNumber')} disabled={item != null} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-3">
                        <NumberFormatInputField field={form.$('routingNumber')} onBlur={onBlurRoutingNumber} disabled={item != null} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-3">
                        <BasicInput field={form.$('name')} />
                    </div>
                </div>

                <div className="row row--form">
                    <div className="form__group col col-sml-12">
                        <div className="u-display--flex">
                            <div>
                                <label className="form__group__label u-mar--right--med">Third party account?</label>
                                <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isThirdPartyAccount')} />
                            </div>
                            <div>
                                {bankAccountCount > 0 ? <span><label className="form__group__label u-mar--right--med">Primary account?</label>
                                <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isPrimary')} /></span> : null}
                            </div>
                            <div>
                                {bankAccountCount > 0 ? <span><label className="form__group__label u-mar--right--med">Is disabled?</label>
                                <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isDisabled')} disabled={item != null && ( item && item.isPrimary)} /></span> : null}
                            </div>
                        </div>
                        <div className="u-display--flex">

                        </div>
                    </div>
                </div>
                
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
											<img alt="" src={URL.createObjectURL(item.charityMedia)}  />
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

                {form.$('isThirdPartyAccount').value &&
                    <React.Fragment>
                        <div className="row row--form row__align--end">
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <BasicInput field={form.$('accountHolderName')}  disabled={item != null} />
                            </div>
                            <div className="form__group col col-sml-12 col-lrg-6">
                                <BasicInput field={form.$('addressLine1')} />
                            </div>
                            <div className="form__group col col-sml-12 col-lrg-6">
                                <BasicInput field={form.$('addressLine2')} />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-3">
                                <BasicInput field={form.$('city')} />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-3">
                                <BasicInput field={form.$('state')} />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-4">
                                <BasicInput field={form.$('zipCode')} />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-2">
                                <BaasicButton
                                    onClick={() => useDonorContactInformations('address')}
                                    className='btn btn--100 btn--tertiary'
                                    type='button'
                                    label="BANK_ACCOUNT.EDIT.BUTTON.USE_PRIMARY_ADDRESS"
                                />
                            </div>
                        </div>

                        <div className="row row--form row__align--end">
                            <div className="form__group col col-sml-6 col-lrg-4">
                                <BasicInput field={form.$('email')} />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-2">
                                <BaasicButton
                                    onClick={() => useDonorContactInformations('emailAddress')}
                                    className='btn btn--100 btn--tertiary'
                                    type='button'
                                    label="BANK_ACCOUNT.EDIT.BUTTON.USE_PRIMARY_EMAIL_ADDRESS"
                                />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-4">
                                <NumberFormatInputField field={form.$('number')} />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-2">
                                <BaasicButton
                                    onClick={() => useDonorContactInformations('phoneNumber')}
                                    className='btn btn--100 btn--tertiary'
                                    type='button'
                                    label="BANK_ACCOUNT.EDIT.BUTTON.USE_PRIMARY_PHONE_NUMBER"
                                />
                            </div>
                        </div>
                    </React.Fragment>}
            </div>

            <div className="info-card--footer">
                <BaasicButton
                    type='button'
                    className="btn btn--med btn--med--wide btn--ghost"
                    onClick={onCancelEditClick}
                    label='Cancel'
                />
                {item != null && 
                    <BaasicFormControls
                    form={form}
                    onSubmit={form.onSubmit}
                    disabled={item != null}
                    className="btn btn--med btn--med--wide btn--secondary" />
                }
                
            </div>
        </EditFormContent>
    );
}

DonorBankAccountEditTemplate.propTypes = {
    donorBankAccountEditViewStore: PropTypes.object,
    t: PropTypes.func
};

export default defaultTemplate(DonorBankAccountEditTemplate);
