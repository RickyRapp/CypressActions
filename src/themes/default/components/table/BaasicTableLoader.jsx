import React from 'react';

class BaasicTableLoader extends React.Component {
    render() {
        const loadingPanel = (
            <div className='k-loading-mask'>
                <span className='k-loading-text'>Loading</span>
                <div className='k-loading-image'></div>
                <div className='k-loading-color'></div>
            </div>
        );

        return loadingPanel;
    }
}

export default BaasicTableLoader;