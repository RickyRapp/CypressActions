import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { RouterView } from 'mobx-state-router';
import { ToastContainer } from 'react-toastify';
import { PropTypes } from 'prop-types';
import { Loader } from 'core/components';

import '@progress/kendo-theme-default/dist/all.css';

@inject(e => ({
    appStore: e.rootStore.appStore,
    routerStore: e.rootStore.routerStore,
    routerMaps: e.rootStore.routerMaps
}))
@observer
export default class App extends Component {
    async componentDidMount() {
        await this.props.appStore.initialize();
    }

    render() {
        const { routerStore, routerMaps, appStore } = this.props;
        if (!appStore.initialized) return <Loader />;

        return (
            <React.Fragment>
                <RouterView routerStore={routerStore} viewMap={routerMaps} />
                <ToastContainer
                    position='bottom-right'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
                {/* process.env.NODE_ENV !== 'production' && <MobxReactFormDevTools.UI/> */}
            </React.Fragment>
        );
    }
}

App.propTypes = {
    appStore: PropTypes.object,
    routerStore: PropTypes.object,
    routerMaps: PropTypes.array
}