import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page, PageNavigation } from 'core/layouts';
import { GrantTab } from 'application/grant/pages';
import { ActivityTransaction } from 'application/activity/pages';

function ActivityTabTemplate({ activityTabViewStore, t }) {
    const {
        loaderStore,
        activeHeaderTab,
        handleHeaderTabClick
    } = activityTabViewStore;

    return (
        <Page loading={loaderStore.loading} >
            <PageNavigation hideNavigation={true}>
                <div className="content__header">
                    <div className="row">
                        <div className='col col-lrg-2'>
                            <h2>{t('ACTIVITY.MY_GIVING')}</h2>
                        </div>
                        <div className='col col-lrg-2' onClick={() => handleHeaderTabClick(1)}>
                            {t('ACTIVITY.TRANSACTIONS')}
                        </div>
                        <div className='col col-lrg-2' onClick={() => handleHeaderTabClick(2)}>
                            {t('ACTIVITY.DEPOSITS')}
                        </div>
                        <div className='col col-lrg-2' onClick={() => handleHeaderTabClick(3)}>
                            {t('ACTIVITY.GRANTS')}
                        </div>
                    </div>
                </div>
            </PageNavigation>
            {activeHeaderTab === 1 && <ActivityTransaction />}
            {activeHeaderTab === 2 && <span>2</span>}
            {activeHeaderTab === 3 && <GrantTab />}
        </Page>
    );
}

ActivityTabTemplate.propTypes = {
    activityTabViewStore: PropTypes.object.isRequired,
    rootStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(ActivityTabTemplate);