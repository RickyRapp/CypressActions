import React from 'react';
import PropTypes from 'prop-types';
import { ListSelectLayoutTemplate } from 'themes/layouts';

const ListSelectLayout = function(props) {
  return <ListSelectLayoutTemplate {...props} />;
};

ListSelectLayout.propTypes = {
  onCreate: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.any,
  dropdownStore: PropTypes.object
};

export default ListSelectLayout;
