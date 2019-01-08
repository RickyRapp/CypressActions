import React from "react";
import PropTypes from 'prop-types';
import { ListLayoutTemplate } from "themes/layouts";

const ListLayout = function(props) {
    return <ListLayoutTemplate {...props} />;
};

ListLayout.propTypes = {
    onCreate: PropTypes.func,
    title: PropTypes.string,
    loading: PropTypes.bool,
    children: PropTypes.any
};

export default ListLayout;
