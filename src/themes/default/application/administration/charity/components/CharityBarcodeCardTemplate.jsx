/* eslint-disable react/prop-types */
import React from 'react';
import { Barcode, BaasicButton } from 'core/components';
import NumberFormat from 'react-number-format';
import { BarcodeFormat } from '@zxing/library';
import { charityFormatter } from 'core/utils';

const CharityBarcodeCardTemplate = ({ charityGeneralDataViewStore, t }) => {
	const { item, copyToClipboard, regenerateApiKey, url } = charityGeneralDataViewStore;

	return (
		<div className="c-charity__wrapper">
			<div className="c-charity__barcode-card">
				<div>
					<div className="u-mar--bottom--sml">
						<p className="type--sml">{t('CHARITY.EDIT.FIELDS.CHARITY_ACCOUNT_NUMBER')} </p>
						{item && <NumberFormat displayType="text" value={item.charityAccountNumber} />}
					</div>

					<div className="u-mar--bottom--sml">
						<p className="type--sml">{t('CHARITY.EDIT.FIELDS.CHARITY_TAX_ID')} </p>
						{item && <NumberFormat format="##-#######" displayType="text" value={item.taxId} />}
					</div>

					<div className="u-mar--bottom--sml">
						<p className="type--sml">
							<span className='u-mar--right--tny'>{t('CHARITY.EDIT.FIELDS.CHARITY_API_KEY')}</span>
							{item && item.apiKey && (
								<BaasicButton
									className="btn btn--icon"
									onlyIconClassName="u-mar--right--tny"
									icon="u-icon u-icon--clipboard u-icon--base"
									label="Copy to clipboard"
									onlyIcon={true}
									onClick={copyToClipboard}
								></BaasicButton>
							)}
						</p>
						{item && item.apiKey}&nbsp;
					</div>

					{item &&
						(item.apiKey && (
							<div className="type--sml">
								<BaasicButton
									className="btn btn--secondary btn--base"
									label="Regenerate API Key"
									onClick={regenerateApiKey}
								></BaasicButton>
							</div>
						))}
					{item && item.verificationDocumentId && (
						<div>
							<p className="type--color--opaque">{t('CHARITY.EDIT.FIELDS.CHARITY_VERIFICATION_DOCUMENT')}</p>
							<a href={url + item.verificationDocumentId} target="_blank" className="type--wgt--bold">
								{item.verificationDocumentName}
							</a>
						</div>
					)}
				</div>

				{item && (
					<Barcode
						type={BarcodeFormat.QR_CODE}
						value={charityFormatter.format(item.taxId, { value: 'tax-id' })}
						height={150}
						width={150}
					/>
				)}
			</div>
		</div>
	);
};

export default CharityBarcodeCardTemplate;
