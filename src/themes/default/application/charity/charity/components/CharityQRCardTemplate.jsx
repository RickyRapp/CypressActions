/* eslint-disable react/prop-types */
import React from 'react';
import { BaasicButton } from 'core/components';
import NumberFormat from 'react-number-format';
import { charityFormatter } from 'core/utils';
import QRCode from 'qrcode.react';

const CharityQRCardTemplate = ({ charityGeneralDataViewStore, t }) => {
	const { downloadQrCode, copyToClipboard, item } = charityGeneralDataViewStore;

	return (
		<div className="c-charity__barcode-card u-display--ib u-mar--bottom--med">
			<div className="row row--form">
				<div className="col col-sml-8">
					<div>
						<div className="u-mar--bottom--sml">
							<label className="form__group__label u-mar--right--tny">
								{t('CHARITY.EDIT.FIELDS.CHARITY_ACCOUNT_NUMBER')}
							</label>
							<p>{item && <NumberFormat displayType="text" value={item.charityAccountNumber} />}</p>
						</div>

						<div className="u-mar--bottom--sml">
							<label className="form__group__label u-mar--right--tny">{t('CHARITY.EDIT.FIELDS.CHARITY_TAX_ID')}</label>
							<p>{item && <NumberFormat format="##-#######" displayType="text" value={item.taxId} />}</p>
						</div>
					</div>
				</div>

				<div className="col col-sml-4 u-mar--bottom--sml">
					<label className="form__group__label ">
						{t('CHARITY.EDIT.FIELDS.CHARITY_QR_CODE')}
						<BaasicButton
							type="button"
							onlyIconClassName="u-mar--left--tny"
							className="btn btn--icon"
							onClick={downloadQrCode}
							onlyIcon={true}
							label="Download"
							icon="u-icon u-icon--download u-icon--base"
						/>
					</label>
					<div className="u-mar--top--sml">
						{item && (
							<QRCode
								id="charity-qr"
								value={charityFormatter.format(item.taxId, { value: 'tax-id' })}
								size={70}
								includeMargin={false}
							/>
						)}
					</div>
				</div>

				<div className="col col-sml-12">
					<label className="form__group__label">
						{t('CHARITY.EDIT.FIELDS.CHARITY_API_KEY')}
						{item && item.apiKey && (
							<BaasicButton
								className="btn btn--icon"
								onlyIconClassName="u-mar--left--tny"
								icon="u-icon u-icon--clipboard u-icon--base"
								label="Copy to clipboard"
								onlyIcon={true}
								onClick={copyToClipboard}
							></BaasicButton>
						)}{' '}
					</label>
					<p className="type--break--word">{item && item.apiKey}</p>
				</div>
			</div>
		</div>
	);
};

export default CharityQRCardTemplate;
