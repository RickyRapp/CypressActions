import React from 'react';
import { ActionColumnTemplate } from 'themes/components';

function ActionRow(props) {
  return <ActionColumnTemplate.Row {...props} />;
}

function ActionHeader(props) {
  return <ActionColumnTemplate.Header {...props} />;
}

export default {
  Row: ActionRow,
  Header: ActionHeader
};
