import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Page } from 'core/layouts';
import { CharityWebsiteList } from 'application/administration/charity-website/pages'

function CharityWebsiteTabTemplate({ charitiyWebsiteTabViewStore }) {
    const {
        loaderStore
    } = charitiyWebsiteTabViewStore;

    return (
        <Page loading={loaderStore.loading} >
            <div className='u-mar--bottom--med'>
                <TabLayout store={charitiyWebsiteTabViewStore}>
                        <div label={'CHARITY_WEBSITE.TAB.LIST.THIRD_PARTY_API'} className="u-mar--top--sml layout--nested">
                            <CharityWebsiteList websiteType={ "ThirdParyAPI" } />
                        </div>
                        <div label={'CHARITY_WEBSITE.TAB.LIST.PROCESSING_COMPANY'} className="u-mar--top--sml layout--nested">
                            <CharityWebsiteList websiteType={ "ProcessingCompany" } />
                        </div>
                        <div label={'CHARITY_WEBSITE.TAB.LIST.FUNDRAISING_PLATFORMS'} className="u-mar--top--sml layout--nested">
                            <CharityWebsiteList websiteType={ "FundraisingPlatforms" } />
                        </div>
                </TabLayout>
            </div>
        </Page>
    );
}

CharityWebsiteTabTemplate.propTypes = {
    charitiyWebsiteTabViewStore: PropTypes.object.isRequired,
    websiteType: PropTypes.string
};

export default defaultTemplate(CharityWebsiteTabTemplate);