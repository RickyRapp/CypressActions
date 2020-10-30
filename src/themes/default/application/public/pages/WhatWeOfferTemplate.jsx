import React from 'react';
import { defaultTemplate } from 'core/hoc';
import { Helmet } from 'react-helmet';

function WhatWeOfferTemplate() {

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>What We Offer - The Donors' Fund</title>
            </Helmet>
            What We Offer
        </div>
    );
}

export default defaultTemplate(WhatWeOfferTemplate);