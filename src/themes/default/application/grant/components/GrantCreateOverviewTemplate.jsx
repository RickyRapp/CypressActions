import React from 'react';
import { defaultTemplate } from 'core/hoc'
import PropTypes from 'prop-types';
import { FormatterResolver } from 'core/components';
import shouldRenderContentChildren from 'themes/components/content/shouldRenderContentChildren';
import { addressFormatter, donorFormatter } from 'core/utils';
import _ from 'lodash';

class GrantCreateOverviewTemplate extends React.Component {
    render() {
        const { modalParams, t, children } = this.props;
        const { item } = modalParams.data;

        return (
            <section>
                <div className="u-mar--bottom--med">
                    <div className="form__group u-mar--bottom--sml">
                        <label className="form__group__label">{t('GRANT.PREVIEW.FIELDS.CHARITY_LABEL')}</label>
                        {item && <FormatterResolver
                            item={{ charity: item.charity }}
                            field='charity'
                            format={{ type: 'charity', value: 'charity-name-display' }}
                        />}
                    </div>
                    <div className="form__group u-mar--bottom--sml">
                        <label className="form__group__label">{t('GRANT.PREVIEW.FIELDS.SCHEDULED_LABEL')}</label>
                        Today
                    </div>
                    <div className="form__group u-mar--bottom--sml">
                        <label className="form__group__label">{t('GRANT.PREVIEW.FIELDS.AMOUNT_LABEL')}</label>
                        {item && <FormatterResolver
                            item={{ amount: item.amount }}
                            field='amount'
                            format={{ type: 'currency' }}
                        />}
                    </div>
                    <div className="form__group u-mar--bottom--sml">
                        <label className="form__group__label">{t('GRANT.PREVIEW.FIELDS.PURPOSE_TYPE_LABEL')}</label>
                        {item &&
                            <React.Fragment>{item.grantPurposeType.name}</React.Fragment>}
                    </div>
                    <div className="form__group u-mar--bottom--sml">
                        <label className="form__group__label">{t('GRANT.PREVIEW.FIELDS.ACKNOWLEDGMENT_LABEL')}</label>
                        <div className="form__group col col-sml-11 u-mar--top--med">
                            {item &&
                                donorFormatter.format(item.donor, { type: 'grant-acknowledgment-type', value: item.grantAcknowledgmentType.abrv })}
                        </div>
                    </div>
                </div>

                {shouldRenderContentChildren(children)
                    ? children
                    : <div>{children}</div>
                }
            </section>
        )
    }
}

GrantCreateOverviewTemplate.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func,
    children: PropTypes.any
};

export default defaultTemplate(GrantCreateOverviewTemplate);