import React from 'react';
import { defaultTemplate } from 'core/utils';

function DisplayError({ errorStore }) {
  const { errors, rootStore } = errorStore;

  const homeLink = (
    <a onClick={() => rootStore.routerStore.navigate(rootStore.initialState)}>
      GO HOME
    </a>
  );
  if (errors) {
    return (
      <React.Fragment>
        <ul>
          {Object.keys(errors).map(key => {
            return (
              <li key={key}>
                {key} {errors[key]}
              </li>
            );
          })}
        </ul>
        {homeLink}
      </React.Fragment>
    );
  } else {
    return <div>{homeLink}</div>;
  }
}

export default defaultTemplate(DisplayError);
