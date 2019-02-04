import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';

class SearchFilterTemplate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      queryUtility,
      propertyName = 'search',
      className,
      placeholder = 'Search',
      ...other
    } = this.props;

    return (
      <React.Fragment>
        <div className="pos--rel display--ib  spc--right--sml">
          <input
            className={className}
            type="text"
            placeholder={placeholder}
            value={queryUtility.filter[propertyName] || ''}
            onChange={e => {
              queryUtility.filter[propertyName] = e.target.value;
            }}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                queryUtility.fetch();
              }
            }}
          />
          {queryUtility.filter[propertyName] &&
            queryUtility.filter[propertyName] !== '' && (
              <button
                className="btn btn--input-icon  input__icon"
                onClick={() => (queryUtility.filter[propertyName] = null)}
              >
                <i className="icomoon icon-remove" />
              </button>
            )}
        </div>
        <button className="btn btn--med btn--tertiary">
          <i className="icomoon icon-search tiny align--v--baseline spc--right--tny" />
          <span
            className="align--v--bottom"
            onClick={() => queryUtility.fetch()}
          >
            Search
          </span>
        </button>
      </React.Fragment>
    );
  }
}

SearchFilterTemplate.propTypes = {
  queryUtility: PropTypes.object,
  propertyName: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string
};

SearchFilterTemplate.defaultProps = {
  propertyName: 'search',
  placeholder: 'Search'
};

export default defaultTemplate(SearchFilterTemplate);
