import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Page } from 'core/layouts';
import { BookletOrderList, FolderList } from 'application/administration/booklet-order/pages';

function BookletTabTemplate({ bookletTabViewStore }) {
    const {
        loaderStore
    } = bookletTabViewStore;

    return (
        <React.Fragment>
            <Page loading={loaderStore.loading} >
                <div className='u-mar--bottom--med'>
                    <TabLayout store={bookletTabViewStore}>
                        <div label='Booklet Orders' className="u-mar--top--sml layout--nested">
                            <BookletOrderList />
                        </div>
                        <div label='Folder Orders' className="u-mar--top--sml">
                            <FolderList />
                        </div>
                    </TabLayout>
                </div>
            </Page>
        </React.Fragment>
    );
}

BookletTabTemplate.propTypes = {
    bookletTabViewStore: PropTypes.object.isRequired,
};

export default defaultTemplate(BookletTabTemplate);