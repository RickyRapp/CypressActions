import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { BasicInput, NumericInputField } from 'core/components';

function GrantRequestTemplate({ grantRequestCreateViewStore, t }) {
    const {
        form,
        contentLoading
    } = grantRequestCreateViewStore;

    return (
        <ApplicationEditLayout store={grantRequestCreateViewStore}>
            <Content loading={contentLoading} >
                <h3 className="u-mar--bottom--med">{t('GRANT_REQUEST.CREATE.TITLE')}</h3>
                <div className="row">
                    <div className="form__group col col-lrg-12">
                        <BasicInput field={form.$('phoneNumber')} />
                    </div>
                    <div className="form__group col col-lrg-12">
                        <NumericInputField field={form.$('amount')} />
                    </div>
                </div>
            </Content>
        </ApplicationEditLayout>
    )
}

GrantRequestTemplate.propTypes = {
    grantRequestCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(GrantRequestTemplate);
