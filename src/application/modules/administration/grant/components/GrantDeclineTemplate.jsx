import React from 'react';
import { BaasicButton } from 'core/components';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function GrantConfirmTemplate({ modalParams, t }) {
    const {
        onCancel,
        onDecline
    } = modalParams.data;

    const declinationReason = [{id: 1, name:'Legally binding pledge'},
    {id: 2, name:'Charity failed to provide necessary documents'},
    {id: 3, name:'Charity has seen its status revoked by the IRS'},
    {id: 4, name:'This grant does not comply with the Donors Funds’ Policies and guidelines'}]

    return (
        <div className="modal__list__wrap">

            <h3 className="u-mar--bottom--med">Decline grant?</h3>
            <section className="modal__list u-mar--bottom--med">
                <div><b>Please choose a reason for grant declination:</b></div>
            </section>
            <section>
            {declinationReason.map(c => {
                                return (
                                    <div key={c.id} >
                                        <input style={{cursor: 'pointer'}} 
                                            type="radio"
                                            name="declinationReason"
                                            id={c.id}
                                        /> 
                                        <label style={{cursor: 'pointer'}} htmlFor={c.id}> {c.name}</label>
                                    </div>
                                )
                            })}
            </section>
            <br />
            <div className="u-display--flex">
                <BaasicButton
                    className="btn btn--med btn--med--wide btn--ghost"
                    label={t('EDIT_FORM_LAYOUT.CANCEL')}
                    onClick={onCancel}
                />
                <div className="u-mar--left--auto">
                    <BaasicButton onClick={onDecline} className="btn btn--med btn--med--wide btn--primary" label="Decline" />
                </div>
            </div>
        </div>
    );
}

GrantConfirmTemplate.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(GrantConfirmTemplate);
