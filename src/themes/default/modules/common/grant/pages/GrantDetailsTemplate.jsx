import React from 'react';
import { defaultTemplate } from 'core/utils';
import moment from 'moment';
import { Loader } from 'core/components';

function GrantDetailsTemplate({ grantDetailsViewStore }) {
    const {
        grant,
        loaderStore
    } = grantDetailsViewStore;

    return (
        <React.Fragment>
            {loaderStore.loading &&
                <Loader />}
            {grant &&
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-3">
                        <strong>Charity</strong>
                        {grant.charity.name}
                    </div>
                    <div className="form__group f-col f-col-lrg-3">
                        <strong>Amount</strong>
                        {grant.amount}
                    </div>

                    <div className="form__group f-col f-col-lrg-3">
                        <strong>Description</strong>
                        {grant.description}
                    </div>

                    <div className="form__group f-col f-col-lrg-3">
                        <strong>Date Created</strong>
                        {moment(grant.dateCreated).format('YYYY-MM-DD HH:mm:ss')}
                    </div>

                    <div className="form__group f-col f-col-lrg-3">
                        <strong>Date Updated</strong>
                        {moment(grant.dateUpdated).format('YYYY-MM-DD HH:mm:ss')}
                    </div>
                </div>}
        </React.Fragment>
    );
};

export default defaultTemplate(GrantDetailsTemplate);
