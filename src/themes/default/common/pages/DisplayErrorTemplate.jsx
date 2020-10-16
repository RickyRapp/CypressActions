import React from 'react';
import PropTypes from 'prop-types';

function DisplayErrorTemplate({ errorStore }) {
    const { error, rootStore } = errorStore;

    const backLink = (
        <button
            className="btn btn--sml btn--primary display--ib"
            onClick={() => rootStore.routerStore.goTo('master.app.main.dashboard')}
        >
            GO TO DASHBOARD
        </button>
    );
    return (
        <React.Fragment>
            <div className="layout--error">
                <div className="u-mar--top--lrg type--center">
                    <svg width="100px" viewBox="0 0 48 32">
                        <path
                            fill="#348cfc"
                            d="M29.9,19.5C29.7,19.8,29.4,20,29,20c-0.2,0-0.4,0-0.5-0.1c-2.8-1.7-6.2-1.7-9,0c-0.4,0.3-1.1,0.2-1.4-0.2s-0.2-1.1,0.2-1.4
                            c0.1,0,0.1-0.1,0.2-0.1c3.4-2,7.6-2,11,0C30,18.4,30.1,19,29.9,19.5C29.9,19.5,29.9,19.5,29.9,19.5z M18.7,8.3L18.4,8l0.3-0.3
                            c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L17,6.6l-0.3-0.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L15.6,8l-0.3,0.3c-0.4,0.4-0.4,1,0,1.4
                            c0,0,0,0,0,0c0.4,0.4,1,0.4,1.4,0c0,0,0,0,0,0L17,9.4l0.3,0.3c0.4,0.4,1,0.4,1.4,0c0,0,0,0,0,0C19.1,9.3,19.1,8.7,18.7,8.3
                            C18.7,8.3,18.7,8.3,18.7,8.3z M32.7,6.3c-0.4-0.4-1-0.4-1.4,0c0,0,0,0,0,0L31,6.6l-0.3-0.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4
                            L29.6,8l-0.3,0.3c-0.4,0.4-0.4,1,0,1.4c0,0,0,0,0,0c0.4,0.4,1,0.4,1.4,0c0,0,0,0,0,0L31,9.4l0.3,0.3c0.4,0.4,1,0.4,1.4,0
                            c0,0,0,0,0,0c0.4-0.4,0.4-1,0-1.4c0,0,0,0,0,0L32.4,8l0.3-0.3C33.1,7.3,33.1,6.7,32.7,6.3C32.7,6.3,32.7,6.3,32.7,6.3z M48,25v4
                            c0,1.7-1.3,3-3,3H3c-1.7,0-3-1.3-3-3v-4c0-0.6,0.4-1,1-1h2V1c0-0.6,0.4-1,1-1h40c0.6,0,1,0.4,1,1v23h2C47.6,24,48,24.4,48,25z M5,24
                            h38V2H5V24z M46,26H2v3c0,0.6,0.4,1,1,1h42c0.6,0,1-0.4,1-1V26z"
                        />
                    </svg>
                    <div className="u-mar--top--med u-mar--bottom--med">{backLink}</div>
                    <div className="spc--y--med error__desc">
                        {error.message}
                        {error.description !== '' && <span>{error.description}</span>}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

DisplayErrorTemplate.propTypes = {
    errorStore: PropTypes.object,
};

export default DisplayErrorTemplate;
