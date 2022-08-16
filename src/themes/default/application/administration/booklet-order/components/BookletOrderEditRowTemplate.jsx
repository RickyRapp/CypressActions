import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicDropdownStore } from 'core/stores';
import { BaasicInput, BasicInput, NumericInput } from 'core/components';

const BookletOrderEditRowTemplate = function({
	denominationTypes,
	item,
	onAddBookletsChange,
	fetchFunc,
	bookletTypes,
}) {
	const isMaxBookletsSelected = item.bookletCount === item.booklets.length;
	const denominationType = denominationTypes.find(c => {
		return c.id === item.denominationTypeId;
	});
	const bookletType = bookletTypes.find(c => c.id === item.bookletTypeId);
	const bookletDropdownStore = new BaasicDropdownStore(
		{
			multi: true,
			placeholder: 'BOOKLET_ORDER.REVIEW.FIELDS.BOOKLET_PLACEHOLDER',
			initFetch: false,
			filterable: true,
			textField: 'code',
		},
		{
			fetchFunc: async searchQuery => {
				const arrayResult = await fetchFunc(
					searchQuery,
					denominationType ? denominationType.id : null,
					item.bookletTypeId
				);
				if (arrayResult.length === 1) {
					const temp = item.booklets.slice();
					temp.push(arrayResult[0]);
					bookletDropdownStore.onChange(temp);
				}
			},
			onChange: value => {
				let booklets = [];
				if (value) {
					if (value.length > item.bookletCount) {
						return;
					}
					booklets = value.map(c => {
						return { id: c.id, code: c.code };
					});
				}
				onAddBookletsChange(item, booklets);
			},
		}
	);

	return (
		<div className="booklet">
			<div className="booklet__price">
				{item && bookletTypes && bookletType.abrv !== 'classic' ? `${bookletType.name}` : 'Denomination: '}
				{denominationType && denominationType.value === 0
					? 'Blank'
					: bookletType.abrv === 'classic'
					? `$${denominationType.value}`
					: ''}
			</div>
			<div className="booklet__count">
				<div className="form__group__label">Booklet count</div>
				<NumericInput min={1} max={99} value={item.bookletCount} onChange={e => (item.bookletCount = e.target.value)} />
			</div>
		</div>
	);
};

BookletOrderEditRowTemplate.propTypes = {
	item: PropTypes.object.isRequired,
	fetchFunc: PropTypes.func.isRequired,
	onAddBookletsChange: PropTypes.func.isRequired,
	denominationTypes: PropTypes.array.isRequired,
	bookletTypes: PropTypes.array.isRequired,
};

const listNoDataRender = (element, isMaxBookletsSelected) => {
	const noData = (
		<h4 style={{ fontSize: '1em' }}>
			<span className="k-icon k-i-warning" style={{ fontSize: '2.5em' }} />
			<br />
			<br />
			no data here
		</h4>
	);

	const maxData = (
		<h4 style={{ fontSize: '1em' }}>
			<span className="k-icon k-i-warning" style={{ fontSize: '2.5em' }} />
			<br />
			<br />
			max booklet selected
		</h4>
	);

	return React.cloneElement(element, { ...element.props }, isMaxBookletsSelected ? maxData : noData);
};

export default defaultTemplate(BookletOrderEditRowTemplate);
