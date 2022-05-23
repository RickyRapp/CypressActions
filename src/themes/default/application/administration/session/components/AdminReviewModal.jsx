import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
} from 'core/components'

const AdminReviewModal = function ({ modalParams, t }) {
    const {
        certificate,
        onClick, 
        imgSrc,
        onDisapprove
    } = modalParams.data;

    return (
        <section>
            <h3 className="u-mar--bottom--med">Admin review</h3>
            <div className="row">
                <div className="form__group col col-lrg-12">
                    <p><b>Open certificate amount: </b>${certificate.openCertificateAmount}</p><br />
                    <p>Certificate scan:</p><br/ >
                    <img style={{"border": '1px dashed orange'}} src={imgSrc} />
                    <br /><b><a href={imgSrc} target="_blank">&#x21E9; Blank Certificate</a></b>  <br />
                </div>
                
                <div className="form__group col col-lrg-12 u-mar--top--med">
                    <BaasicButton
                        className="btn btn--base btn--primary u-mar--right--med"
                        label='Approve blank certificate'
                        onClick={() => onClick(certificate)}
                        disabled={certificate.certificateValue < 1 ? true : false}>
                    </BaasicButton>
                    <BaasicButton
                        className="btn btn--base btn--primary"
                        label='Disapprove blank certificate'
                        onClick={() => onDisapprove(certificate)}
                        disabled={certificate.certificateValue < 1 ? true : false}>
                    </BaasicButton>
                </div>
            </div>
        </section>
    )
}

AdminReviewModal.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(AdminReviewModal);
