/* eslint-disable react/prop-types */
import React from 'react'
import moment from 'moment';

const CustomizedOrderDetailsTemplate = ({ tableStore, item, t }) => {
    function getExpiryDate(val) {
		let selectedValue = parseInt(val);
		let expireDate = moment();
		if (selectedValue) {
			expireDate.add(selectedValue, 'days');
			return expireDate.format('MMM Do YYYY');
		}
		return null;
	}

    return (
        <React.Fragment>
            {item &&
                (item.customName ||
                    item.customizedAddressLine1 ||
                    (item.expirationDays &&
                        tableStore &&
                        tableStore.data &&
                        tableStore.data.filter(x => !x.isPrePaid).length > 0)) && (
                    <div className="card--primary card--med">
                        <div className="type--base type--wgt--medium type--color--note">
                            {t('BOOKLET_ORDER.PREVIEW.CUSTOM_LABEL')}
                            <i className="u-icon u-icon--approve u-icon--base u-mar--left--tny"></i>
                        </div>
                        <span>
                            {item && (item.customName || item.expirationDays || item.customizedAddressLine1) && (
                                <div className="row">
                                    {item.customName && (
                                        <p className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                            <p className="type--base type--wgt--medium type--color--note">Name:</p>
                                            <span className="type--base type--color--text type--break--word">{item.customName}</span>
                                        </p>
                                    )}
                                    {item.customizedAddressLine1 && (
                                        <p className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                            <p className="type--base type--wgt--medium type--color--note">Address:</p>
                                            <span className="type--base type--color--text type--break--word">{item.customizedAddressLine1}</span>
                                        </p>
                                    )}
                                    {item.customizedAddressLine2 && (
                                        <p className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                            <p className="type--base type--wgt--medium type--color--note">Address 2:</p>
                                            <span className="type--base type--color--text type--break--word">{item.customizedAddressLine2}</span>
                                        </p>
                                    )}
                                    {item.customizedCity && (
                                        <p className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                            <p className="type--base type--wgt--medium type--color--note">City:</p>
                                            <span className="type--base type--color--text type--break--word">{item.customizedCity}</span>
                                        </p>
                                    )}
                                    {item.customizedState && (
                                        <p className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                            <p className="type--base type--wgt--medium type--color--note">State:</p>
                                            <span className="type--base type--color--text type--break--word">{item.customizedState}</span>
                                        </p>
                                    )}
                                    {item.customizedCity && (
                                        <p className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                            <p className="type--base type--wgt--medium type--color--note">Zip code:</p>
                                            <span className="type--base type--color--text type--break--word">{item.customizedZipCode}</span>
                                        </p>
                                    )}
                                    {tableStore &&
                                        tableStore.data &&
                                        tableStore.data.filter(x => !x.isPrePaid).length > 0 &&
                                        item.expirationDays && (
                                            <p className="booklet__list__item">
                                                Expiration date:{' '}
                                                <span className="type--base type--color--text type--break--word">{getExpiryDate(item.expirationDays)}</span>
                                            </p>
                                        )}
                                </div>
                            )}
                        </span>
                    </div>
                )}
        </React.Fragment>
    )
}

export default CustomizedOrderDetailsTemplate