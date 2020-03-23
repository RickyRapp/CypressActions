import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Page, PageNavigation } from 'core/layouts';
import { BookletList } from 'application/booklet/pages';
import { BookletOrderList } from 'application/booklet-order/pages';

function BookletTabTemplate({ bookletTabViewStore }) {
    const {
        activeIndex,
        loaderStore
    } = bookletTabViewStore;

    let title = 'BOOKLET.LIST.TITLE';
    if (activeIndex === 0)
        title = 'BOOKLET.LIST.TITLE';
    else if (activeIndex === 1)
        title = 'BOOKLET_ORDER.LIST.TITLE';

    return (
        <Page loading={loaderStore.loading} >
            <PageNavigation title={title}></PageNavigation>
            <div className='u-mar--bottom--med'>
                <TabLayout store={bookletTabViewStore}>
                    <div label={'BOOKLET.TAB.BOOKLET'}>
                        <BookletList />
                    </div>
                    <div label={'BOOKLET.TAB.BOOKLET_ORDER'}>
                        <BookletOrderList />
                    </div>
                </TabLayout>
            </div>
        </Page>
    );
}

BookletTabTemplate.propTypes = {
    bookletTabViewStore: PropTypes.object.isRequired,
    rootStore: PropTypes.object.isRequired
};

export default defaultTemplate(BookletTabTemplate);