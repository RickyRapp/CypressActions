import _ from 'lodash';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { SearchFilter, BaasicButton } from 'core/components';

function TableFilterTemplate(props) {
    const {
        queryUtility,
        filterStore,
        searchClassName,
        inputWrapperClass,
        filterClassName,
        children,
        nextToSearch,
        showButtons,
        showSearch,
        showToggle,
        fetchDisabled,
        hideOnFetch,
        debounce,
    } = props;

    const debounceCallback = _.debounce(queryUtility.fetch, debounce);

    // const hideFilter = (!children || React.Children.count(children) === 0) || props.showClear;
    const clearVisible = props.showClear;
    return (
        <React.Fragment>
            <div className={`u-mar--bottom--sml ${searchClassName || ''}`.trim()}>
                {showSearch && (
                    <SearchFilter
                        className={`input input--lrg input--search ${filterStore.filterVisible ? 'is-expanded' : ''}`}
                        inputWrapperClass={`${inputWrapperClass} u-mar--right--sml`}
                        queryUtility={queryUtility}
                        clearVisible={clearVisible}
                        onSearch={debounceCallback}
                        disableSearch={fetchDisabled}
                    />
                )}
                {showButtons && children && (
                    <Fragment>
                        {showToggle && (
                            <BaasicButton
                                className={`btn btn--icon filter__expand ${filterStore.filterVisible ? 'is-active' : ''}`}
                                icon="btn--ghost btn--icon--lrg u-icon u-icon--filter u-icon--xxmed"
                                onlyIcon={true}
                                onClick={filterStore.toggleFilterVisibility}
                                label={filterStore.filterVisible ? 'GRID.COLLAPSE_FILTERS_BUTTON' : 'GRID.EXPAND_FILTERS_BUTTON'}
                            />
                        )}
                        {nextToSearch && (
                            <Fragment>
                                <BaasicButton
                                    className="btn btn--sml btn--primary u-mar--left--sml"
                                    label="GRID.FILTER.SEARCH_BUTTON"
                                    onClick={() => {
                                        queryUtility.fetch();

                                        if (hideOnFetch) filterStore.filterVisible = false;
                                    }}
                                    disabled={fetchDisabled}
                                />
                                <BaasicButton
                                    className="btn btn--sml btn--ghost u-mar--left--sml"
                                    label="GRID.FILTER.CLEAR_BUTTON"
                                    onClick={() => queryUtility.resetFilter()}
                                    disabled={fetchDisabled}
                                />
                            </Fragment>
                        )}
                    </Fragment>
                )}
            </div>
            <div className={`${filterClassName || ''}`.trim()}>
                {renderFilter(filterStore, queryUtility, children, nextToSearch, showSearch && showToggle, fetchDisabled)}
            </div>
        </React.Fragment>
    );
}

TableFilterTemplate.propTypes = {
    queryUtility: PropTypes.object.isRequired,
    filterStore: PropTypes.object.isRequired,
    searchClassName: PropTypes.string,
    inputWrapperClass: PropTypes.string,
    filterClassName: PropTypes.string,
    showClear: PropTypes.bool,
    t: PropTypes.any,
    children: PropTypes.any,
    nextToSearch: PropTypes.bool,
    showButtons: PropTypes.bool,
    showSearch: PropTypes.bool,
    showToggle: PropTypes.bool,
    tags: PropTypes.object,
    fetchDisabled: PropTypes.bool,
    hideOnFetch: PropTypes.bool,
    debounce: PropTypes.number,
};

TableFilterTemplate.defaultProps = {
    showClear: false,
    nextToSearch: false,
    showButtons: true,
    showSearch: true,
    showToggle: true,
    fetchDisabled: false,
    hideOnFetch: false,
    debounce: 300,
};

function renderFilter(filterStore, queryUtility, filters, nextToSearch, showSeparator, fetchDisabled) {
    if (!filters || React.Children.count(filters) === 0) return null;

    return (
        <React.Fragment>
            {!filterStore.filterVisible ? null : (
                <form
                    onSubmit={e => {
                        queryUtility.fetch();
                        e.preventDefault();
                    }}
                >
                    {/* <h5 className="spc--top--sml">{t('GRID.FILTERS_TITLE')}</h5> */}
                    {showSeparator && <div />}
                    <div className="row">{filters}</div>
                    {!nextToSearch && (
                        <div className="row">
                            <div className="col col-sml-12">
                                <BaasicButton
                                    className="btn btn--med btn--med--wide btn--primary u-mar--right--tny"
                                    label="GRID.FILTER.SEARCH_BUTTON"
                                    onClick={() => queryUtility.fetch()}
                                    disabled={fetchDisabled}
                                    />
                                <BaasicButton
                                    className="btn btn--med btn--med--wide btn--ghost"
                                    label="GRID.FILTER.CLEAR_BUTTON"
                                    onClick={() => queryUtility.resetFilter()}
                                    disabled={fetchDisabled}
                                    />
                            </div>
                        </div>
                    )}
                </form>
            )}
        </React.Fragment>
    );
}

export default defaultTemplate(TableFilterTemplate);
