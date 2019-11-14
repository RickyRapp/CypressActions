import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { FormatterResolver } from 'core/components';
import { PageHeader } from 'core/layouts';

const DonorAccountPageHeaderOverviewTemplate = function ({ donorAccountPageHeaderOverviewViewStore, rootStore, t }) {
    const {
        donorAccount,
        Types,
        type
    } = donorAccountPageHeaderOverviewViewStore;

    switch (type) {
        case Types.DonorAccount:
            return <RenderDonorAccount donorAccount={donorAccount} rootStore={rootStore} t={t} />
        case Types.Contribution:
            return <RenderContribution donorAccount={donorAccount} rootStore={rootStore} t={t} />
        case Types.Grant:
            return <RenderGrant donorAccount={donorAccount} rootStore={rootStore} t={t} />
        default:
            return null;
    }
}

DonorAccountPageHeaderOverviewTemplate.propTypes = {
    donorAccountPageHeaderOverviewViewStore: PropTypes.object.isRequired,
    rootStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

const RenderDonorAccount = ({ donorAccount, rootStore, t }) => {
    return (
        <PageHeader>
            <div className="card card--primary card--med">
                <div className="row">
                    <div className="col col-sml-6 col-lrg-2">
                        {t('DONOR_ACCOUNT.PAGE_HEADER.OVERVIEW.PRESENT_BALANCE')}
                        {donorAccount &&
                            <FormatterResolver
                                item={{ presentBalance: donorAccount.presentBalance }}
                                field='presentBalance'
                                format={{ type: 'currency' }}
                            />}
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        {t('DONOR_ACCOUNT.PAGE_HEADER.OVERVIEW.AVAILABLE_BALANCE')}
                        {donorAccount &&
                            <FormatterResolver
                                item={{ availableBalance: donorAccount.availableBalance }}
                                field='availableBalance'
                                format={{ type: 'currency' }}
                            />}
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        <a
                            className=""
                            onClick={() => rootStore.routerStore.goTo('master.app.main.activity-and-history.admin-donor-view', null, { id: donorAccount && donorAccount.id })}>
                            {t('DONOR_ACCOUNT.PAGE_HEADER.OVERVIEW.ACTIVITY')}
                        </a>
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        <a
                            className=""
                            onClick={() => rootStore.routerStore.goTo('master.app.main.contribution.list', null, { id: donorAccount && donorAccount.id })}>
                            {t('DONOR_ACCOUNT.PAGE_HEADER.OVERVIEW.CONTRIBUTION')}
                        </a>
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        <a
                            className=""
                            onClick={() => rootStore.routerStore.goTo('master.app.main.grant.list', null, { id: donorAccount && donorAccount.id })}>
                            {t('DONOR_ACCOUNT.PAGE_HEADER.OVERVIEW.GRANT')}
                        </a>
                    </div>
                </div>
            </div>
        </PageHeader>
    )
}

RenderDonorAccount.propTypes = {
    donorAccount: PropTypes.object,
    rootStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

const RenderContribution = ({ donorAccount, rootStore, t }) => {
    return (
        <PageHeader>
            <div className="card card--primary card--med">
                <div className="row">
                    <div className="col col-sml-6 col-lrg-2">
                        <a
                            className=""
                            onClick={() => rootStore.routerStore.goTo('master.app.main.donor-account.edit', { id: donorAccount && donorAccount.id })}>
                            {donorAccount && donorAccount.donorName}
                        </a>
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        {t('DONOR_ACCOUNT.PAGE_HEADER.OVERVIEW.PRESENT_BALANCE')}
                        {donorAccount &&
                            <FormatterResolver
                                item={{ presentBalance: donorAccount.presentBalance }}
                                field='presentBalance'
                                format={{ type: 'currency' }}
                            />}
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        {t('DONOR_ACCOUNT.PAGE_HEADER.OVERVIEW.AVAILABLE_BALANCE')}
                        {donorAccount &&
                            <FormatterResolver
                                item={{ availableBalance: donorAccount.availableBalance }}
                                field='availableBalance'
                                format={{ type: 'currency' }}
                            />}
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        <a
                            className=""
                            onClick={() => rootStore.routerStore.goTo('master.app.main.activity-and-history.admin-donor-view', null, { id: donorAccount && donorAccount.id })}>
                            {t('DONOR_ACCOUNT.PAGE_HEADER.OVERVIEW.ACTIVITY')}
                        </a>
                    </div>
                </div>
            </div>
        </PageHeader>
    )
}

RenderContribution.propTypes = {
    donorAccount: PropTypes.object,
    rootStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

const RenderGrant = ({ donorAccount, rootStore, t }) => {
    return (
        <PageHeader>
            <div className="card card--primary card--med">
                <div className="row">
                    <div className="col col-sml-6 col-lrg-2">
                        <a
                            className=""
                            onClick={() => rootStore.routerStore.goTo('master.app.main.donor-account.edit', { id: donorAccount && donorAccount.id })}>
                            {donorAccount && donorAccount.donorName}
                        </a>
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        {t('DONOR_ACCOUNT.PAGE_HEADER.OVERVIEW.PRESENT_BALANCE')}
                        {donorAccount &&
                            <FormatterResolver
                                item={{ presentBalance: donorAccount.presentBalance }}
                                field='presentBalance'
                                format={{ type: 'currency' }}
                            />}
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        {t('DONOR_ACCOUNT.PAGE_HEADER.OVERVIEW.AVAILABLE_BALANCE')}
                        {donorAccount &&
                            <FormatterResolver
                                item={{ availableBalance: donorAccount.availableBalance }}
                                field='availableBalance'
                                format={{ type: 'currency' }}
                            />}
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        <a
                            className=""
                            onClick={() => rootStore.routerStore.goTo('master.app.main.activity-and-history.admin-donor-view', null, { id: donorAccount && donorAccount.id })}>
                            {t('DONOR_ACCOUNT.PAGE_HEADER.OVERVIEW.ACTIVITY')}
                        </a>
                    </div>
                </div>
            </div>
        </PageHeader>
    )
}

RenderGrant.propTypes = {
    donorAccount: PropTypes.object,
    rootStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorAccountPageHeaderOverviewTemplate);