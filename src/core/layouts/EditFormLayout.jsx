import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { EditFormLayoutTemplate } from 'themes/layouts';

const EditFormLayout = function(props) {
    return <EditFormLayoutTemplate {...props} />;
};

EditFormLayout.propTypes = {
    store: PropTypes.object,    
    loading: PropTypes.bool,
    layoutFooterVisible: PropTypes.bool,
};

export default inject(
    // eslint-disable-next-line
    (i, props) => ({
    rootStore: i.rootStore,
}))(EditFormLayout);
