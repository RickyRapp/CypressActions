import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { FormatterResolver } from 'core/components';
import { PageHeader } from 'core/layouts';

const DonorPageHeaderOverviewTemplate = function ({ donorPageHeaderOverviewViewStore, rootStore, t }) {
    const {
        donor,
        Types,
        type
    } = donorPageHeaderOverviewViewStore;

    switch (type) {
        case Types.Donor:
            return <RenderDonor donor={donor} rootStore={rootStore} t={t} />
        case Types.Contribution:
            return <RenderContribution donor={donor} rootStore={rootStore} t={t} />
        case Types.Grant:
            return <RenderGrant donor={donor} rootStore={rootStore} t={t} />
        case Types.BookletOrder:
            return <RenderBookletOrder donor={donor} rootStore={rootStore} t={t} />
        default:
            return null;
    }
}

DonorPageHeaderOverviewTemplate.propTypes = {
    donorPageHeaderOverviewViewStore: PropTypes.object.isRequired,
    rootStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

const RenderDonor = ({ donor, rootStore, t }) => {
    return (
        <PageHeader>
            <div className="card card--primary card--med">
                <div className="row">
                    <div className="col col-sml-6 col-lrg-2">
                        {t('DONOR.PAGE_HEADER.OVERVIEW.PRESENT_BALANCE')}
                        {donor &&
                            <FormatterResolver
                                item={{ presentBalance: donor.presentBalance }}
                                field='presentBalance'
                                format={{ type: 'currency' }}
                            />}
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        {t('DONOR.PAGE_HEADER.OVERVIEW.AVAILABLE_BALANCE')}
                        {donor &&
                            <FormatterResolver
                                item={{ availableBalance: donor.availableBalance }}
                                field='availableBalance'
                                format={{ type: 'currency' }}
                            />}
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        <a
                            className=""
                            onClick={() => rootStore.routerStore.goTo('master.app.main.user.edit', { id: donor && donor.id })}>
                            {t('DONOR.PAGE_HEADER.OVERVIEW.LOGIN')}
                        </a>
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        <a
                            className=""
                            onClick={() => rootStore.routerStore.goTo('master.app.main.activity-and-history.tab', null, { id: donor && donor.id, tab: 0 })}>
                            {t('DONOR.PAGE_HEADER.OVERVIEW.ACTIVITY')}
                        </a>
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        <a
                            className=""
                            onClick={() => rootStore.routerStore.goTo('master.app.main.contribution.list', null, { id: donor && donor.id })}>
                            {t('DONOR.PAGE_HEADER.OVERVIEW.CONTRIBUTION')}
                        </a>
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        <a
                            className=""
                            onClick={() => rootStore.routerStore.goTo('master.app.main.grant.tab', null, { id: donor && donor.id })}>
                            {t('DONOR.PAGE_HEADER.OVERVIEW.GRANT')}
                        </a>
                    </div>
                </div>
            </div>
        </PageHeader>
    )
}

RenderDonor.propTypes = {
    donor: PropTypes.object,
    rootStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

const RenderContribution = ({ donor, rootStore, t }) => {
    return (
        <PageHeader>
            <div className="card card--primary card--med">
                <div className="row">
                    <div className="col col-sml-6 col-lrg-2">
                        <a
                            className=""
                            onClick={() => rootStore.routerStore.goTo('master.app.main.donor.edit', { id: donor && donor.id })}>
                            {donor && donor.donorName}
                        </a>
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        {t('DONOR.PAGE_HEADER.OVERVIEW.PRESENT_BALANCE')}
                        {donor &&
                            <FormatterResolver
                                item={{ presentBalance: donor.presentBalance }}
                                field='presentBalance'
                                format={{ type: 'currency' }}
                            />}
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        {t('DONOR.PAGE_HEADER.OVERVIEW.AVAILABLE_BALANCE')}
                        {donor &&
                            <FormatterResolver
                                item={{ availableBalance: donor.availableBalance }}
                                field='availableBalance'
                                format={{ type: 'currency' }}
                            />}
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        <a
                            className=""
                            onClick={() => rootStore.routerStore.goTo('master.app.main.activity-and-history.tab', null, { id: donor && donor.id, tab: 0 })}>
                            {t('DONOR.PAGE_HEADER.OVERVIEW.ACTIVITY')}
                        </a>
                    </div>
                </div>
            </div>
        </PageHeader>
    )
}

RenderContribution.propTypes = {
    donor: PropTypes.object,
    rootStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

const RenderGrant = ({ donor, rootStore, t }) => {
    return (
        <PageHeader>
            <div className="card card--primary card--med">
                <div className="row">
                    <div className="col col-sml-6 col-lrg-2">
                        <a
                            className=""
                            onClick={() => rootStore.routerStore.goTo('master.app.main.donor.edit', { id: donor && donor.id })}>
                            {donor && donor.donorName}
                        </a>
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        {t('DONOR.PAGE_HEADER.OVERVIEW.PRESENT_BALANCE')}
                        {donor &&
                            <FormatterResolver
                                item={{ presentBalance: donor.presentBalance }}
                                field='presentBalance'
                                format={{ type: 'currency' }}
                            />}
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        {t('DONOR.PAGE_HEADER.OVERVIEW.AVAILABLE_BALANCE')}
                        {donor &&
                            <FormatterResolver
                                item={{ availableBalance: donor.availableBalance }}
                                field='availableBalance'
                                format={{ type: 'currency' }}
                            />}
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        <a
                            className=""
                            onClick={() => rootStore.routerStore.goTo('master.app.main.activity-and-history.tab', null, { id: donor && donor.id, tab: 0 })}>
                            {t('DONOR.PAGE_HEADER.OVERVIEW.ACTIVITY')}
                        </a>
                    </div>
                </div>
            </div>
        </PageHeader>
    )
}

RenderGrant.propTypes = {
    donor: PropTypes.object,
    rootStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

const RenderBookletOrder = ({ donor, rootStore, t }) => {
    return (
        <PageHeader>
            <div className="card card--primary card--med">
                <div className="row">
                    <div className="col col-sml-6 col-lrg-2">
                        <a
                            className=""
                            onClick={() => rootStore.routerStore.goTo('master.app.main.donor.edit', { id: donor && donor.id })}>
                            {donor && donor.donorName}
                        </a>
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        {t('DONOR.PAGE_HEADER.OVERVIEW.PRESENT_BALANCE')}
                        {donor &&
                            <FormatterResolver
                                item={{ presentBalance: donor.presentBalance }}
                                field='presentBalance'
                                format={{ type: 'currency' }}
                            />}
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        {t('DONOR.PAGE_HEADER.OVERVIEW.AVAILABLE_BALANCE')}
                        {donor &&
                            <FormatterResolver
                                item={{ availableBalance: donor.availableBalance }}
                                field='availableBalance'
                                format={{ type: 'currency' }}
                            />}
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        <a
                            className=""
                            onClick={() => rootStore.routerStore.goTo('master.app.main.activity-and-history.tab', null, { id: donor && donor.id, tab: 0 })}>
                            {t('DONOR.PAGE_HEADER.OVERVIEW.ACTIVITY')}
                        </a>
                    </div>
                </div>
            </div>
        </PageHeader>
    )
}

RenderBookletOrder.propTypes = {
    donor: PropTypes.object,
    rootStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorPageHeaderOverviewTemplate);