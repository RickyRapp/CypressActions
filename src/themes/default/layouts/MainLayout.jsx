import * as React from 'react';
import PropTypes from 'prop-types';
import { Header, Footer, Loader, Menu } from 'core/components';
import { defaultTemplate } from "core/utils";

function MainLayoutTemplate({ render, initialized, ...props }) {
    if (!initialized) return <Loader />;

    return (
        <div>
            <div className="footer__content">
                <Header />
                <main className="main">
                    <div>
                        <div className="layout__aside">
                            <Menu />
                        </div>

                        <div className="layout__main">
                            {render(props)}
                        </div>

                    </div>
                </main>
            </div>
            <Footer />
        </div>
    )
}

MainLayoutTemplate.propTypes = {
    render: PropTypes.func
}

export default defaultTemplate(MainLayoutTemplate);