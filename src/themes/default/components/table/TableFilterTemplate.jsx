import React from "react";
import { defaultTemplate } from 'core/utils';
import { SearchFilter } from "core/components";

function TableFilter({ queryUtility, filterStore, children, t }) {
    return (
        <React.Fragment>
            <div className="display--ib">
                <SearchFilter
                    className="input input--med input--search   scale--focus w--250--px"
                    queryUtility={queryUtility}
                />
            </div>
            {renderFilter(filterStore, queryUtility, children, t)}
        </React.Fragment>
    );
}

function renderFilter(filterStore, queryUtility, filters, t) {
    if (!filters || React.Children.count(filters) === 0) return null;

    return (
        <React.Fragment>
            <button
                className="btn btn--med btn--secondary push"
                onClick={filterStore.toggleFilterVisibility}
            >
                <span className=" icomoon icon-filter-1 align--v--sub spc--right--tny" />
                <span className="align--v--bottom">{t('GRID.FILTERS_BUTTON')}</span>
            </button>
            {!filterStore.filterVisible ? null : (
                <div className="clearfix">
                    <h5 className="spc--top--med">{t('GRID.FILTERS_TITLE')}</h5>
                    <div className="separator separator--primary spc--top--sml spc--bottom--sml" />
                    <div className="spc--bottom--sml">
                        {filters}
                    </div>
                    <div className="col-sml-12 spc--top--sml spc--bottom--sml">
                        <button
                            className="btn btn--med btn--tertiary spc--right--tny"
                            onClick={() => queryUtility.fetch()}
                        >
                            FILTER
                        </button>
                        <button
                            className="btn btn--med btn--ghost"
                            onClick={() => queryUtility.filter.reset()}
                        >
                            CLEAR
                        </button>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

export default defaultTemplate(TableFilter);
