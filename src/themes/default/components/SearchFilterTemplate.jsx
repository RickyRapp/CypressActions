import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

class SearchFilterTemplate extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange = event => {
        const { queryUtility, propertyName } = this.props;

        queryUtility.filter[propertyName] = event.target.value;
    };

    onKeyPress = event => {
        if (event.key === 'Enter') {
            this.props.queryUtility.fetch();
        }
    };

    onInlineReset = () => {
        const { queryUtility, propertyName } = this.props;

        queryUtility.filter[propertyName] = null;

        queryUtility.fetch();
    };

    render() {
        const {
            queryUtility,
            propertyName = 'search',
            className,
            t,
            placeholder = 'Search',
            clearVisible
        } = this.props;

        return <React.Fragment>
            <div className="row">
                <div className="col col-sml-12 col-lrg-3">
                    <div className='inputgroup u-mar--bottom--sml'>
                        <div className='inputgroup--main'>
                            <input className={className} type="text" placeholder={placeholder}
                                value={queryUtility.filter[propertyName] || ""}
                                onChange={this.onChange}
                                onKeyPress={this.onKeyPress} />
                            {queryUtility.filter[propertyName] && queryUtility.filter[propertyName] !== '' &&
                                <span className='filter__btn--clear' onClick={this.onInlineReset}>
                                    <i className='u-icon u-icon--sml u-icon--close' />
                                </span>
                            }
                        </div>

                        <div className="inputgroup--aside">
                            <button className='btn btn--sml btn--primary spc--right--sml' onClick={() => queryUtility.fetch()}>
                                <i className='icomoon icon-search tiny align--v--baseline spc--right--tny' />
                                <span className='align--v--bottom'>
                                    {t('GRID.FILTER.SEARCH_BUTTON')}
                                </span>
                            </button>

                        </div>
                        {clearVisible &&
                            <div className="inputgroup--aside inputgroup--aside--special">
                                <button className='btn btn--sml btn--ghost' onClick={() => queryUtility.resetFilter()}>
                                    {t('GRID.FILTER.CLEAR_BUTTON')}
                                </button>
                            </div>
                        }

                    </div>
                </div>
            </div>

        </React.Fragment>;
    }
}

SearchFilterTemplate.propTypes = {
    queryUtility: PropTypes.object,
    propertyName: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    clearVisible: PropTypes.bool,
    t: PropTypes.func
};

SearchFilterTemplate.defaultProps = {
    propertyName: 'search',
    placeholder: 'Search',
    clearVisible: false
};

export default defaultTemplate(SearchFilterTemplate);
