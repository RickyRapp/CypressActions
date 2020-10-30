import React from 'react';
import { defaultTemplate } from 'core/hoc';
import { Helmet } from 'react-helmet';

function HomeTemplate() {

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Simplifying the Art of Giving - The Donors' Fund</title>
                <meta name="description" content="The Donors’ Fund affords you an instant tax deduction, and all the ease and flexibility to distribute as you choose." />
                <meta name="keywords" content="the donors fund, tax deduction, donation, charities" />
            </Helmet>
            Home
        </div>
    );
}

export default defaultTemplate(HomeTemplate);