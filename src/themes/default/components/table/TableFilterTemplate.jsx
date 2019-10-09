import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { SearchFilter } from 'core/components';

const TableFilterTemplate = function(props) {
    const {queryUtility, filterStore, t, children} = props;
    // const hideFilter = (!children || React.Children.count(children) === 0) || props.showClear;
    const clearVisible = (children != null || React.Children.count(children) > 0) || props.showClear;
    return (
        <React.Fragment>
        <div className='filter--table__wrap'>
            <div className='filter--table u-mar--bottom--sml'>
                <SearchFilter
                    className='input input--sml input--search'
                    queryUtility={queryUtility}
                    clearVisible={clearVisible}
                />
            </div>
        </div>
            {renderFilter(filterStore, queryUtility, children, t)}
        </React.Fragment>
    );
};

TableFilterTemplate.propTypes = {
    queryUtility: PropTypes.object.isRequired,
    filterStore: PropTypes.object.isRequired,
    showClear: PropTypes.bool,
    t: PropTypes.any,
    children: PropTypes.any
};

TableFilterTemplate.defaultProps = {
    showClear: false
};

function renderFilter(filterStore, queryUtility, filters, t) {
    if (!filters || React.Children.count(filters) === 0) return null;
    return (
        <React.Fragment>
            <button
                className='btn btn--sml btn--secondary push'
                onClick={filterStore.toggleFilterVisibility}
            >
                <span className=' icomoon tiny icon-filter-1 align--v--middle spc--right--tny' />
                <span className='align--v--bottom'>{t('GRID.FILTERS_BUTTON')}</span>
            </button>
            {!filterStore.filterVisible ? null : (
                <div className='u-group'>
                    <h5 className='spc--top--sml'>{t('GRID.FILTERS_TITLE')}</h5>
                    <div className='separator separator--primary spc--top--tny spc--bottom--sml' />
                    <div>
                        {filters}
                    </div>
                    <div className='col-sml-12 spc--top--sml spc--bottom--sml'>
                        <button
                            className='btn btn--sml btn--tertiary spc--right--tny'
                            onClick={() => queryUtility.fetch()}
                        >
                        <span className='align--v--bottom' >{t('GRID.FILTER.SEARCH_BUTTON')}</span>
                        </button>
                        <button
                            className='btn btn--sml btn--ghost'
                            onClick={() => queryUtility.resetFilter()}
                        >
                            {t('GRID.FILTER.CLEAR_BUTTON')}
                        </button>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

export default defaultTemplate(TableFilterTemplate);
