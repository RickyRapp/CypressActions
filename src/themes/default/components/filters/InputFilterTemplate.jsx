import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { Input } from 'core/components';

class InputFilterTemplate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {
      queryUtility,
      className,
      type,
      placeholder,
      name,
      isClearable
    } = this.props;

    return (
      <React.Fragment>
        <input
          className={className}
          type={type}
          placeholder={placeholder}
          value={queryUtility.filter[name] || ''}
          onChange={e => { queryUtility.filter[name] = e.target.value; }}
          onKeyPress={e => { if (e.key === 'Enter') { queryUtility.fetch(); } }}
        />
        {isClearable && queryUtility.filter[name] &&
          queryUtility.filter[name] !== '' &&
          (
            <button
              className="btn btn--input-icon  input__icon"
              onClick={() => (queryUtility.filter[name] = null)}
            >
              <i className="icomoon icon-remove" />
            </button>
          )}
      </React.Fragment>
    );
  }
}

InputFilterTemplate.propTypes = {
  queryUtility: PropTypes.object,
  name: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  isClearable: PropTypes.bool
};

InputFilterTemplate.defaultProps = {
  name: 'search',
  className: 'input input--med input--search w--250--px',
  placeholder: 'Search',
  type: 'text',
  isClearable: true

};

export default defaultTemplate(InputFilterTemplate);
