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
		secondColClassName,
		additionalComponent,
		btnClassName
	} = props;

	const debounceCallback = _.debounce(queryUtility.fetch, debounce);

	// const hideFilter = (!children || React.Children.count(children) === 0) || props.showClear;
	const clearVisible = props.showClear;
	return (
		<React.Fragment>
			<div className="search search--table">
				<div className="search__wrapper">
					{showSearch && (
						<SearchFilter
							className={`input input--med input--search search__input--noborder ${
								filterStore.filterVisible ? 'is-expanded' : ''
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
								<div className="search__btn__advanced" onClick={filterStore.toggleFilterVisibility}>
									<i className={`search__btn__icon u-icon u-icon--filter u-icon--base`}></i>
									<span className="search__btn__text">Advanced Search</span>
									<i className={`u-icon u-icon--arrow-down--primary u-icon--sml ${
											filterStore.filterVisible ? 'u-rotate--180' : ''
										}`}
									></i>
								</div>
							)}
						</Fragment>
					)}
				</div>

				{additionalComponent &&
					<div className="search__additional">
						{additionalComponent}
					</div>
				}

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
	additionalComponent: PropTypes.any,
	nextToSearch: PropTypes.bool,
	showButtons: PropTypes.bool,
	showSearch: PropTypes.bool,
	showToggle: PropTypes.bool,
	tags: PropTypes.object,
	fetchDisabled: PropTypes.bool,
	hideOnFetch: PropTypes.bool,
	debounce: PropTypes.number,
	colClassName: PropTypes.string,
	secondColClassName: PropTypes.string,
	btnClassName: PropTypes.string
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
					{filters}
					{!nextToSearch && (
						<div className="u-display--flex u-mar--top--med--to-xlrg u-mar--bottom--med">
							<BaasicButton
								className="btn btn--lrg btn--primary"
								label="GRID.FILTER.SEARCH_BUTTON"
								onClick={() => queryUtility.fetch()}
								disabled={fetchDisabled}
							/>
							<BaasicButton
								className="btn btn--lrg btn--ghost u-mar--left--sml"
								label="GRID.FILTER.CLEAR_BUTTON"
								onClick={() => queryUtility.resetFilter()}
								disabled={fetchDisabled}
							/>
						</div>
					)}
				</form>
			)}
		</React.Fragment>
	);
}

export default defaultTemplate(TableFilterTemplate);
