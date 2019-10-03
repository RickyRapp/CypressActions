import React from 'react';
import PropTypes from 'prop-types';
import { BaasicModalTemplate } from 'themes/components';
import { defaultTemplate } from 'core/utils';

const BaasicModal = function (props) {
  return <BaasicModalTemplate {...props} />
};

BaasicModal.propTypes = {
  modalParams: PropTypes.object.isRequired
};

export default defaultTemplate(BaasicModal);
