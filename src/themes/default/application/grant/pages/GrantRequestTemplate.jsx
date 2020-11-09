import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import _ from 'lodash'
import { BasicInput, NumberFormatInputField, NumericInputField } from 'core/components';

function GrantRequestTemplate({ grantRequestEditViewStore, t }) {
    const {
        form,
        contentLoading
    } = grantRequestEditViewStore;

    return (
        <ApplicationEditLayout store={grantRequestEditViewStore}>
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
    grantRequestEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(GrantRequestTemplate);
