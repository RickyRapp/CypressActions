import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { FormatterResolver } from 'core/components';
import { PageHeader } from 'core/layouts';

const CharityPageHeaderOverviewTemplate = function ({ charityPageHeaderOverviewViewStore, rootStore, t }) {
    const {
        charity,
        Types,
        type
    } = charityPageHeaderOverviewViewStore;

    switch (type) {
        case Types.Profile:
            return <RenderProfile charity={charity} rootStore={rootStore} t={t} />
        default:
            return null;
    }
}

CharityPageHeaderOverviewTemplate.propTypes = {
    charityPageHeaderOverviewViewStore: PropTypes.object.isRequired,
    rootStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

const RenderProfile = ({ charity, rootStore, t }) => {
    return (
        <PageHeader>
            <div className="card card--primary card--med">
                <div className="row">
                    <div className="col col-sml-6 col-lrg-2">
                        {t('CHARITY.PAGE_HEADER.OVERVIEW.BALANCE')}
                        {charity &&
                            <FormatterResolver
                                item={{ balance: charity.balance }}
                                field='balance'
                                format={{ type: 'currency' }}
                            />}
                    </div>
                    <div className="col col-sml-6 col-lrg-2">
                        <a
                            className=""
                            onClick={() => rootStore.routerStore.goTo('master.app.main.activity-and-history.tab', null, { id: charity && charity.id, tab: 1 })}>
                            {t('CHARITY.PAGE_HEADER.OVERVIEW.ACTIVITY')}
                        </a>
                    </div>
                    {charity && charity.coreUserId &&
                        <div className="col col-sml-6 col-lrg-2">
                            <a
                                className=""
                                onClick={() => rootStore.routerStore.goTo('master.app.main.user.edit', { id: charity.coreUserId })}>
                                {t('CHARITY.PAGE_HEADER.OVERVIEW.LOGIN')}
                            </a>
                        </div>}
                </div>
            </div>
        </PageHeader>
    )
}

RenderProfile.propTypes = {
    charity: PropTypes.object,
    rootStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityPageHeaderOverviewTemplate);