import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicDropdown, BaasicButton } from 'core/components';

const ExportTemplate = function ({ store, t, hideLimit }) {
    const {
        onExportClick,
        exportLimitStore,
        exportFieldStore,
        exportTypeStore,
        loading
    } = store;

    return (
        <div className="row row--form row__align--end">
            <div className="col col-sml-6 col-lrg-3 col-xxlrg-2">
                <label className="form__group__label">{t('EXPORT_TYPES')}</label>
                <BaasicDropdown store={exportTypeStore} />
            </div>
            {
                hideLimit ? null : 
                <div className="col col-sml-6 col-lrg-3 col-xxlrg-2">
                    <label className="form__group__label">{t('EXPORT_LIMITS')}</label>
                    <BaasicDropdown store={exportLimitStore} />
                </div>
            }
            {
                hideLimit ? 
                <div className="col col-sml-12 col-lrg-9 col-xxlrg-8 u-mar--top--sml">
                    <label className="form__group__label">{t('EXPORT_FIELDS')}</label>
                    <BaasicDropdown store={exportFieldStore} />
                </div> : 
                <div className="col col-sml-12 col-lrg-6 col-xxlrg-6 u-mar--top--sml">
                    <label className="form__group__label">{t('EXPORT_FIELDS')}</label>
                    <BaasicDropdown store={exportFieldStore} />
                </div>
            }
            <div className="col col-sml-12 col-xxlrg-2 type--right u-mar--top--sml">
                <BaasicButton
                    className="btn btn--primary btn--med"
                    onClick={onExportClick}
                    label={t('EXPORT')}
                    disabled={loading}
                />
            </div>
        </div>
    );
};

ExportTemplate.propTypes = {
    store: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    hideLimit: PropTypes.bool
};

export default defaultTemplate(ExportTemplate);
