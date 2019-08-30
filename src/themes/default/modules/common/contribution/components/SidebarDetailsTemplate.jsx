import React from 'react';
import moment from 'moment';
import 'moment-timezone';
import _ from 'lodash';

function SidebarDetailsTemplate({ contribution, reviewModalParams }) {
    return (
        <React.Fragment >
            <h4>Details</h4>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-12">
                    <div>Status:</div>
                    <strong>{contribution.contributionStatus.name}</strong>
                    {reviewModalParams &&
                        <i
                            className="icomoon icon-check-double align--v--middle spc--left--tny"
                            onClick={() => reviewModalParams.open()}
                            title="Review">
                        </i>}
                </div>
                <div className="form__group f-col f-col-lrg-12">
                    <div>Conf. Number:</div>
                    <strong>{contribution.confirmationNumber}</strong>
                </div>
                <div className="form__group f-col f-col-lrg-12">
                    <div>Date Created:</div>
                    <strong>{moment(contribution.dateCreated).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('YYYY-MM-DD HH:mm')}</strong>
                </div>
                <div className="form__group f-col f-col-lrg-12">
                    <div>Date Updated:</div>
                    <strong>{moment(contribution.dateUpdated).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('YYYY-MM-DD HH:mm')}</strong>
                </div>
                <div className="form__group f-col f-col-lrg-12">
                    <div>Created By:</div>
                    <strong>
                        {contribution.createdByCoreUser ?
                            (contribution.createdByCoreUser.userId === contribution.donorAccountId ? contribution.donorAccount.donorName : `${contribution.createdByCoreUser.firstName} ${contribution.createdByCoreUser.lastName}`)
                            :
                            'System'
                        }</strong>
                </div>
            </div>
        </React.Fragment >
    );
}

export default SidebarDetailsTemplate;


