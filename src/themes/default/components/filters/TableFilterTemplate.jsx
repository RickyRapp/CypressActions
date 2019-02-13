import React from 'react';
import { defaultTemplate } from 'core/utils';
import { SearchFilter } from 'core/components';

function TableFilter({ queryUtility, filterStore, children, t }) {
  return (
    <React.Fragment>
      <div className="display--ib">{/*  TODO: ask designer why without this div, previous button from baasic-pager is on top of table */}
      </div>
      <button
        className="btn btn--med btn--secondary push"
        onClick={filterStore.toggleFilterVisibility}
      >
        <span className=" icomoon tiny icon-filter-1 align--v--middle spc--right--tny" />
        <span className="align--v--bottom">{t('Filters')}</span>
      </button>
      {!filterStore.filterVisible ? null : (
        <div className="clearfix">
          <h5 className="spc--top--med">{t('Filters')}</h5>
          <div className="separator separator--primary spc--top--sml spc--bottom--sml" />
          <div className="spc--bottom--sml">{children}</div>
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
