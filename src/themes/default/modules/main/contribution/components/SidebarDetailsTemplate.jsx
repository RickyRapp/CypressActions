import React from 'react';
import moment from 'moment';
import 'moment-timezone';
import _ from 'lodash';

function SidebarDetailsTemplate({ contribution, contributionStatuses }) {
    return (
        <React.Fragment >
            <h4>Details</h4>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-12">
                    <div>Status:</div>
                    <strong>{_.find(contributionStatuses, { id: contribution.contributionStatusId }).name}</strong>
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
                    {contribution.createdByCoreUser ?
                        <strong>{`${contribution.createdByCoreUser.firstName} ${contribution.createdByCoreUser.lastName}`}</strong>
                        :
                        <strong>System</strong>
                    }
                </div>
            </div>
        </React.Fragment >
    );
}

export default SidebarDetailsTemplate;


