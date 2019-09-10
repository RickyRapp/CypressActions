import * as React from 'react';
import PropTypes from 'prop-types';
import { Header, Loader, Menu, NotificationSidebar } from 'core/components';
import { defaultTemplate } from 'core/utils';
import { BaasicConfirmModal } from 'core/components';

function ScanLayoutTemplate({ render, ...props }) {
  return <main className="body--secondary">{render(props)}</main>;
}

ScanLayoutTemplate.propTypes = {
  render: PropTypes.func
};

export default defaultTemplate(ScanLayoutTemplate);
