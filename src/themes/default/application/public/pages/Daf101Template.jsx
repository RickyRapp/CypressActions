import React from 'react';
import { defaultTemplate } from 'core/hoc';
import { Helmet } from 'react-helmet';

function Daf101Template() {

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DAF - The Donors' Fund</title>
            </Helmet>
            DAF 101
        </div>
    );
}

export default defaultTemplate(Daf101Template);