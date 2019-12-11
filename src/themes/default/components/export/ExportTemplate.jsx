import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicDropdown, BaasicButton } from 'core/components';

const ExportTemplate = function ({ store, t }) {
    const {
        onExportClick,
        exportLimitStore,
        exportFieldStore,
        exportTypeStore,
        loading
    } = store;

    return (
        <div className="row">
            <div className="col col-sml-1">
                <label>{t('EXPORT_TYPES')}</label>
                <BaasicDropdown store={exportTypeStore} />
            </div>
            <div className="col col-sml-1">
                <label>{t('EXPORT_LIMITS')}</label>
                <BaasicDropdown store={exportLimitStore} />
            </div>
            <div className="col col-sml-8">
                <label>{t('EXPORT_FIELDS')}</label>
                <BaasicDropdown store={exportFieldStore} />
            </div>
            <div className="col col-sml-2">
                <BaasicButton
                    className="btn btn--primary btn--sml u-mar--top--med"
                    onClick={onExportClick}
                    label={t('EXPORT')}
                    icon={loading ? 'synchronize-arrows-1 rotate' : ''}
                    disabled={loading}
                />
            </div>
        </div>

    );
};

ExportTemplate.propTypes = {
    store: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(ExportTemplate);
