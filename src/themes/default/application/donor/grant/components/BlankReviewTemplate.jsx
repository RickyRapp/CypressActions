import React from 'react';
import { defaultTemplate } from 'core/hoc'
import PropTypes from 'prop-types';
import { BaasicButton, BaasicInput, FormatterResolver, NullableSwitch } from 'core/components';
import shouldRenderContentChildren from 'themes/components/content/shouldRenderContentChildren';

class BlankReviewTemplate extends React.Component {
    render() {
        const { modalParams, t, children } = this.props;
        const { item, reviewConfirm } = modalParams.data;
        console.log(item);
        return (
            <section>
                <div className="u-mar--bottom--med">
                    <h3 className="u-mar--bottom--sml">Review Blank Certificate</h3>
                    <div className="u-mar--bottom--lrg">*this certificate exceeds your limit, so you need to review it</div>
                    <section className="modal__list u-mar--bottom--med">
                        <div className="form__group__label">{t('GRANT.PREVIEW.FIELDS.CHARITY_LABEL')}</div>
                        <div className="modal__list__divider"></div>
                        {item && <FormatterResolver
                            className="modal__list__amount"
                            item={{ charity: item.charity }}
                            field='charity'
                            format={{ type: 'charity', value: 'name-taxid' }}
                        />}
                    </section>
                    <section className="modal__list u-mar--bottom--lrg">
                        <div className="form__group__label">{t('GRANT.PREVIEW.FIELDS.AMOUNT_LABEL')}</div>
                        <div className="modal__list__divider"></div>
                        {item && <FormatterResolver
                            item={{ amount: item.amount }}
                            field='amount'
                            format={{ type: 'currency' }}
                            className="modal__list__amount"
                        />}
                    </section>
                    <div className="form__group u-mar--bottom--med">
                        <NullableSwitch
                            value={item && item.isCertificateApproved}
                            onChange={(value) => item.isCertificateApproved = value}
                            yesLabel="SESSION.EDIT.DONOR_APPROVES"
                            noLabel="SESSION.EDIT.DONOR_DOES_NOT_APPROVE"
                        />
                    </div>
                    {item && !item.isCertificateApproved &&
                        <BaasicInput
                            id="checkDeclinationReason"
                            className="input input--lrg u-mar--bottom--med"
                            value={item.checkDeclinationReason}
                            onChange={event => item.checkDeclinationReason = (event.target.value)}
                            label="Please enter your reason for declining the check"
                            placeholder="Description"
                        />
                    }
                    <BaasicButton
                        type="button"
                        className="btn btn--base btn--primary u-mar--right--sml"
                        onClick={() => reviewConfirm(item)}
                        label="Confirm Review"
                    />
                </div>

                {shouldRenderContentChildren(children)
                    ? children
                    : <div>{children}</div>
                }
            </section>
        )
    }
}

BlankReviewTemplate.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func,
    children: PropTypes.any
};

export default defaultTemplate(BlankReviewTemplate);