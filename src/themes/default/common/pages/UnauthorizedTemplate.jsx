import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import Logo from 'themes/assets/img/logo-donors2.png';

function UnauthorizedTemplate({ rootStore }) {
    return (
        <section>
            <div className="container--login">
                <div className="card card--med card--primary type--center">
                    <img className="w--200--px" src={Logo} alt="Logo" />
                    <div className="u-mar--bottom--lrg">
                        <p>You are not authorized to view selected content.</p>
                    </div>
                    <div className="u-mar--bottom--med">
                        <button className="btn btn--base btn--primary" onClick={() => rootStore.routerStore.goTo(rootStore.getDashboard())}>
                            Dashboard
						</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

UnauthorizedTemplate.propTypes = {
    rootStore: PropTypes.object
};

export default defaultTemplate(UnauthorizedTemplate);
