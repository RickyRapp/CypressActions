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
		colClassName,
	} = props;

	const debounceCallback = _.debounce(queryUtility.fetch, debounce);

	// const hideFilter = (!children || React.Children.count(children) === 0) || props.showClear;
	const clearVisible = props.showClear;
	return (
		<React.Fragment>
			<div className={`${searchClassName || ''}`.trim()}>
				<div className={`${colClassName ? 'row row--form' : ''}`.trim()}>
					<div className={`${colClassName ? colClassName : ''}`.trim()}>
						<div className="search__wrapper">
							{showSearch && (
								<SearchFilter
									className={`input input--med input--search search__input--noborder ${filterStore.filterVisible ? 'is-expanded' : ''
										}`}
									inputWrapperClass={`${inputWrapperClass}`}
									queryUtility={queryUtility}
									clearVisible={clearVisible}
									onSearch={debounceCallback}
									disableSearch={fetchDisabled}
								/>
							)}

							{showButtons && children && (
								<Fragment>
									{showToggle && (
										<div className="search__filter__btn" onClick={filterStore.toggleFilterVisibility}>
											<i
												className={`search__filter__btn__icon u-icon u-icon--filter u-icon--base search__wrapper__item`}
											></i>
											<span className="search__filter__btn__text search__wrapper__item">Advanced Search</span>
											<i
												className={`u-icon u-icon--arrow-down--primary u-icon--sml ${filterStore.filterVisible ? 'u-rotate--180' : ''
													}`}
											></i>
										</div>
									)}
								</Fragment>
							)}
						</div>
					</div>
				</div>

				{showButtons && children && (
					<Fragment>
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
			<div className={`${filterClassName || 'u-mar--top--sml'}`.trim()}>
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
	colClassName: PropTypes.string,
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
					<div className="row row--form">{filters}</div>
					{!nextToSearch && (
						<div className="row row--form u-mar--top--tny u-mar--bottom--sml">

							<div className="col col-sml-6 col-lrg-3">
								<BaasicButton
									className="btn btn--100 btn--primary"
									label="GRID.FILTER.SEARCH_BUTTON"
									onClick={() => queryUtility.fetch()}
									disabled={fetchDisabled}
								/>
							</div>
							<div className="col col-sml-6 col-lrg-3">
								<BaasicButton
									className="btn btn--100 btn--ghost"
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
