import React from 'react';
import { defaultTemplate } from 'core/utils';

function UserPreferencesTemplate({ authStore }) {
  if (!authStore) {
    return null;
  }

  return (
    <div>
      <span>Username: </span>
      <span>{authStore.user.userName}</span>
    </div>
  );
}

export default defaultTemplate(UserPreferencesTemplate);
