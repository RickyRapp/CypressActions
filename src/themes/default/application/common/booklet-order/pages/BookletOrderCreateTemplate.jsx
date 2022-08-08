import React from 'react';
import PropTypes from 'prop-types';
import {
	BaasicButton,
	FormatterResolver,
	BasicInput,
	BasicRadio,
	BaasicFormControls,
	Address,
	BaasicModal,
    BaasicFieldDropdown,
    BasicFieldCheckbox
} from 'core/components';

import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, PageFooter } from 'core/layouts';
import { BookletOrderButtonCounterTemplate } from '../components';
import { isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { DonorAutomaticContributionEditTemplate } from 'themes/application/donor/donor/components';
import {
	BookletOrderMixedPopup,
	BookletSummaryCardLoader,
	BookletSummaryCard,
	BookletOrderChecksLoaderTemplate,
} from '../components';

const BookletOrderCreateTemplate = function({ store, t }) {
	const {
		form,
		donor,
		deliveryMethodTypes,
		denominationTypes,
		onChangeShippingAddressClick,
		onRemoveBookletClick,
		onAddBookletClick,
		orderContents,
		mixed500BookletAmount,
		mixed2000BookletAmount,
		bookletTypes,
		showMoreOptions,
		onShowMoreOptionsClick,
		isDefaultShippingAddress,
		onShowAllBooksClick,
		protectionPlanModalParams,
		needsProtectionPlan,
		needsMoreFunds,
		confirmModal,
		click500,
		click2000,
		onShowBookletsClick,
		isAdmin,
		isPrefilledCustomize,
		totalPrepaidAmount,
		resetCustomizeDefaults,
        setCustomizeDefaults,
        customizedExpirationDateDropdownStore,
        onShowAddOnItemsClick,
        showAddOnitems,
        expiryDate
	} = store;

	const isMobile = window.innerWidth < 543;

	return (
		<React.Fragment>
			<ApplicationEditLayout store={store}>
				<div className="u-mar--bottom--med">
					<div className="container--sidebar">
						<div>
							<div className="card--primary card--med">
								{!donor ? (
									<BookletOrderChecksLoaderTemplate />
								) : (
									<React.Fragment>
										<div>
											<button
												onClick={onShowAllBooksClick}
												className={`btn btn--${
													isMobile ? '100' : 'base  type--inherit'
												} btn--primary u-mar--right--sml u-mar--bottom--sml`}
											>
												Previous Orders
											</button>
											<button
												onClick={onShowBookletsClick}
												className={`btn btn--${
													isMobile ? '100' : 'base  type--inherit'
												} btn--primary u-mar--bottom--sml`}
											>
												My Checkbooks
											</button>
										</div>
										<div className="u-separator--primary u-mar--bottom--sml"></div>
										{bookletTypes.map(bt => {
											return (
												<div key={bt.id} className="row">
													{bt.abrv === 'classic' && (
														<div className="col col-sml-12 u-align--self--end">
															<div className="row">
																{denominationTypes.map((dt, index) => {
																	const order = orderContents.some(
																		s => s.bookletTypeId === bt.id && s.denominationTypeId === dt.id
																	)
																		? orderContents.find(
																				s => s.bookletTypeId === bt.id && s.denominationTypeId === dt.id
																		  )
																		: null;
																	const bookletAmount = order ? dt.value * order.bookletCount * 50 : 0;
																	return dt.abrv !== 'mixed-500' && dt.abrv !== 'mixed-2000' ? (
																		<React.Fragment key={dt.id}>
																			<div
																				className={`col col-sml-12 col-xxxlrg-6 card--med u-padd--top--none u-align--self--end ${
																					dt.value === 500 ? 'u-padd--bottom--none' : ''
																				}`}
																				style={{ display: `${index < 6 || showMoreOptions ? 'block' : 'none'}` }}
																			>
																				<div className="u-separator--primary">
																					<div className="row u-display--flex--align--center u-mar--bottom--sml">
																						<div
																							className={`col col-sml-6 col-med-4${
																								isMobile ? ' u-mar--bottom--sml' : ''
																							}`}
																						>
																							<div className="type--med type--wgt--regular">
																								{dt.value == 0 ? (
																									'Blank checks'
																								) : dt.value == 0 ? (
																									'Open checks'
																								) : (
																									<FormatterResolver
																										item={{ value: dt.value }}
																										field="value"
																										format={{ type: 'currency' }}
																									/>
																								)}
																							</div>
																							{(dt.value === 1 ||
																								dt.value === 2 ||
																								dt.value === 3 ||
																								dt.value === 5) && (
																								<div className="counter__prepaid">
																									{t('BOOKLET_ORDER.CREATE.PREPAID_ONLY')}
																								</div>
																							)}
																						</div>
																						<div className="col col-sml-6 col-med-4 counter">
																							<BookletOrderButtonCounterTemplate
																								onRemoveBookletClick={onRemoveBookletClick}
																								onAddBookletClick={onAddBookletClick}
																								label={(order && order.bookletCount.toString()) || '0'}
																								bookletType={bt}
																								denominationType={dt}
																								denominationTypeValue={dt}
																							/>
																						</div>
																						<div className="col col-sml-6 col-med-4">
																							<div className="type--med type--wgt--regular type--right--from--med">
																								<FormatterResolver
																									item={{ total: bookletAmount }}
																									field="total"
																									format={{ type: 'currency' }}
																								/>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																			{/* {index % 2 === 0 &&
                                                                    <div className="col-xxlrg-1"></div>
                                                                } */}
																		</React.Fragment>
																	) : null;
																})}
															</div>
														</div>
													)}

													{(bt.abrv === 'mixed_500' || bt.abrv === 'mixed_2000') && (
														<React.Fragment>
															{bt.abrv === 'mixed_500' && (
																<div
																	className="col card--med col-sml-12 col-xxxlrg-6 u-align--self--end"
																	style={{ display: `${showMoreOptions ? 'block' : 'none'}` }}
																>
																	<div className="u-separator--primary">
																		<div className="row u-mar--bottom--sml u-display--flex--align--center">
																			<div className="col col-sml-6 col-med-4 u-mar--bottom--sml">
																				<a
																					onClick={click500}
																					className="u-display--flex u-display--flex--align--center"
																				>
																					{bt.name}{' '}
																					<i className="u-icon u-icon--base u-icon--info--link u-mar--left--tny"></i>
																				</a>
																			</div>
																			<div className="col col-sml-6 col-med-4 counter">
																				<BookletOrderButtonCounterTemplate
																					onRemoveBookletClick={onRemoveBookletClick}
																					onAddBookletClick={onAddBookletClick}
																					label={
																						// {order && order.bookletCount.toString() || '0'}
																						orderContents.some(
																							s =>
																								s.bookletTypeId === bt.id &&
																								s.denominationTypeId ===
																									denominationTypes.find(dt => dt.abrv == 'mixed-500').id
																						)
																							? orderContents
																									.find(
																										s =>
																											s.bookletTypeId === bt.id &&
																											s.denominationTypeId ===
																												denominationTypes.find(dt => dt.abrv == 'mixed-500').id
																									)
																									.bookletCount.toString()
																							: '0'
																					}
																					bookletType={bt}
																					//denominationTypes.find(dt => dt.abrv == 'mixed-500')
																					denominationType={denominationTypes.find(dt => dt.abrv == 'mixed-500')}
																				/>
																			</div>
																			<div className="col col-sml-6 col-med-4 u-mar--bottom--sml">
																				<div className="type--med type--wgt--regular type--right--from--med">
																					<FormatterResolver
																						item={{ total: mixed500BookletAmount }}
																						field="total"
																						format={{ type: 'currency' }}
																					/>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															)}
															{bt.abrv === 'mixed_2000' && (
																<div
																	className="col card--med col-sml-12 col-xxxlrg-6 u-align--self--end"
																	style={{ display: `${showMoreOptions ? 'block' : 'none'}` }}
																>
																	<div className="u-separator--primary">
																		<div className="row u-mar--bottom--sml u-display--flex--align--center">
																			<div className="col col-sml-6 col-med-4 u-mar--bottom--sml">
																				<a
																					onClick={click2000}
																					className="u-display--flex u-display--flex--align--center"
																				>
																					{bt.name}{' '}
																					<i className="u-icon u-icon--base u-icon--info--link u-mar--left--tny"></i>
																				</a>
																			</div>
																			<div className="col col-sml-6 col-med-4 counter">
																				<BookletOrderButtonCounterTemplate
																					onRemoveBookletClick={onRemoveBookletClick}
																					onAddBookletClick={onAddBookletClick}
																					label={
																						orderContents.some(
																							s =>
																								s.bookletTypeId === bt.id &&
																								s.denominationTypeId ===
																									denominationTypes.find(dt => dt.abrv == 'mixed-2000').id
																						)
																							? orderContents
																									.find(
																										s =>
																											s.bookletTypeId === bt.id &&
																											s.denominationTypeId ===
																												denominationTypes.find(dt => dt.abrv == 'mixed-2000').id
																									)
																									.bookletCount.toString()
																							: '0'
																					}
																					bookletType={bt}
																					denominationType={denominationTypes.find(dt => dt.abrv == 'mixed-2000')}
																				/>
																			</div>
																			<div className="col col-sml-6 col-med-4 u-mar--bottom--sml">
																				<div className="type--med type--wgt--regular type--right--from--med">
																					<FormatterResolver
																						item={{ total: mixed2000BookletAmount }}
																						field="total"
																						format={{ type: 'currency' }}
																					/>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															)}
														</React.Fragment>
													)}
												</div>
											);
										})}

										<div>
											<button
												type="button"
												className="btn btn--show type--wgt--medium type--inherit"
												onClick={onShowMoreOptionsClick}
											>
												<i
													className={
														!showMoreOptions
															? 'u-icon u-icon--base u-icon--arrow-down--primary'
															: 'u-icon u-icon--base u-icon--arrow-down--primary u-rotate--180'
													}
												></i>
												{showMoreOptions
													? t('BOOKLET_ORDER.CREATE.HIDE_MORE_OPTIONS')
													: t('BOOKLET_ORDER.CREATE.SHOW_MORE_OPTIONS')}
												<i
													className={
														!showMoreOptions
															? 'u-icon u-icon--base u-icon--arrow-down--primary'
															: 'u-icon u-icon--base u-icon--arrow-down--primary u-rotate--180'
													}
												></i>
											</button>
										</div>
									</React.Fragment>
								)}
							</div>
						</div>

						{!donor ? (
							<div className="card--primary card--med">
								<BookletSummaryCardLoader />
							</div>
						) : (
							<div>
								<BookletSummaryCard store={store} t={t} />
							</div>
						)}

						<div>
							<div className="card--primary card--med">
								<button
									type="button"
									className="btn btn--show type--wgt--medium"
									onClick={() => form.$('isCustomizedBook').set(!form.$('isCustomizedBook').value)}
								>
									<i
										className={
											!form.$('isCustomizedBook').value
												? 'u-icon u-icon--base u-icon--arrow-down--primary'
												: 'u-icon u-icon--base u-icon--arrow-down--primary u-rotate--180'
										}
									></i>
									{!form.$('isCustomizedBook').value
										? t('BOOKLET_ORDER.CREATE.SHOW_CUSTOMIZE_BOOKS')
										: t('BOOKLET_ORDER.CREATE.HIDE_CUSTOMIZE_BOOKS')}
									<i
										className={
											!form.$('isCustomizedBook').value
												? 'u-icon u-icon--base u-icon--arrow-down--primary'
												: 'u-icon u-icon--base u-icon--arrow-down--primary u-rotate--180'
										}
									></i>
								</button>

								{form.$('isCustomizedBook').value && (
									<div>
										{donor && (
											<div className="message message--note u-mar--top--med u-mar--bottom--med">
												<p className="u-mar--bottom--tny type--color--note">
													<strong>Additional charge of $5 per book</strong>
												</p>
												<p className="type--sml">
													<em>
														*one of the following information is mandatory for custom booklets: Name / Address /
														Expiration Date
													</em>
													<br />
													{totalPrepaidAmount > 0 && <em>**expiration date for non-prepaid books only</em>}
												</p>
											</div>
										)}
										<div className="row row--form">
											<div className="col col-sml-12 u-mar--bottom--sml">
												<BasicInput field={form.$('customizedName')} />
											</div>
											<div className="col col-sml-12 col-xlrg-4 u-mar--bottom--sml">
												<BasicInput field={form.$('customizedAddressLine1')} />
											</div>
											<div className="col col-sml-12 col-xlrg-4 u-mar--bottom--sml">
												<BasicInput field={form.$('customizedAddressLine2')} />
											</div>
											<div className="col col-sml-12 col-xlrg-4 u-mar--bottom--sml">
												<BasicInput field={form.$('customizedCity')} />
											</div>
											<div className="col col-sml-12 col-xlrg-4 u-mar--bottom--sml">
												<BasicInput field={form.$('customizedState')} />
											</div>
											<div className="col col-sml-12 col-xlrg-4 u-mar--bottom--sml">
												<BasicInput field={form.$('customizedZipCode')} />
											</div>
											<div className="col col-sml-12 col-xlrg-4 u-mar--bottom--sml">
												<BaasicFieldDropdown
													field={form.$('customizedExpirationDate')}
													store={customizedExpirationDateDropdownStore}
												/>
											</div>
											<div className="col col-sml-12">
												<p className="u-mar--top--sml">{form.$('customizedExpirationDate').value && expiryDate}</p>
											</div>
										</div>
										<BaasicButton
											className="btn btn--med btn--med--100 btn--primary"
											label={isPrefilledCustomize ? 'Unset defaults' : 'Set default info'}
											onClick={() => (isPrefilledCustomize ? resetCustomizeDefaults() : setCustomizeDefaults())}
										></BaasicButton>
									</div>
								)}
							</div>
						</div>
						<div>
							<div className="card--primary card--med ">
								<button type="button" className="btn btn--show type--wgt--medium" onClick={onShowAddOnItemsClick}>
									<i
										className={
											!showAddOnitems
												? 'u-icon u-icon--base u-icon--arrow-down--primary'
												: 'u-icon u-icon--base u-icon--arrow-down--primary u-rotate--180'
										}
									></i>
									{showAddOnitems
										? t('BOOKLET_ORDER.CREATE.HIDE_ADD_ON_ITEMS')
										: t('BOOKLET_ORDER.CREATE.SHOW_ADD_ON_ITEMS')}
									<i
										className={
											!showAddOnitems
												? 'u-icon u-icon--base u-icon--arrow-down--primary'
												: 'u-icon u-icon--base u-icon--arrow-down--primary u-rotate--180'
										}
									></i>
								</button>
								{showAddOnitems && (
									<div className="row">
										<div className="col col-sml-12">
											<video
												autoPlay="true"
												height="240"
												width="380"
												src="https://res.cloudinary.com/the-donors-fund/video/upload/v1653479671/TDF/BookletFolder-AddOnItem.mp4"
											></video>

											<div className="u-display--flex u-display--flex--justify--space-between">
												<p>
													Order a check folder? (Additional $35 fee)
													{/* <span data-tip='Additional $35 Fee' data-type="info" style={{ cursor: 'pointer' }}>
                                                        <i className="u-icon u-icon--base u-icon--info--link u-mar--left--tny"></i>
                                                    <ReactTooltip />
                                                    </span> */}
												</p>
												<BasicFieldCheckbox toggleClass="--toggle" field={form.$('orderFolder')} />
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="card--primary card--med u-mar--bottom--med">
					<div className="row row--form u-display--flex u-display--flex--align--center">
						<div className={`col col-sml-12 col-med-12 col-xxlrg-2 ${isMobile ? 'u-mar--bottom--sml' : ''}`}>
							<span className="type--med type--wgt--medium type--color--note">
								{t('BOOKLET_ORDER.CREATE.DELIVERY_OPTIONS')}
							</span>
						</div>
						{deliveryMethodTypes.map(c => {
							let className = '';
							if (c.sortOrder === 0) {
								className = 'col-sml-12 col-med-3 col-xxlrg-2';
							} else if (c.sortOrder === 1) {
								className = 'col-sml-12 col-med-6 col-lrg-5 col-xxlrg-3';
							} else {
								className = 'col-sml-12 col-med-3 col-xxlrg-2';
							}
							return (
								<div
									key={c.id}
									className={`col ${className} ${isMobile && c.sortOrder !== 2 ? 'u-mar--bottom--sml' : ''}`}
								>
									<BasicRadio
										label={c.abrv === 'express-mail' ? `${c.name} (Additional $25)` : c.name}
										value={c.id}
										field={form.$('deliveryMethodTypeId')}
									/>
								</div>
							);
						})}
					</div>
				</div>

				{deliveryMethodTypes &&
					deliveryMethodTypes.length > 0 &&
					!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('deliveryMethodTypeId').value) && (
						<div className="card--primary card--med u-mar--bottom--med">
							{form.$('deliveryMethodTypeId').value === deliveryMethodTypes.find(c => c.abrv === 'mail-usps').id ||
							form.$('deliveryMethodTypeId').value === deliveryMethodTypes.find(c => c.abrv === 'express-mail').id ? (
								<React.Fragment>
									<div className="row row--form">
										<div className="col col-sml-12 col-med-12 col-lrg-2 u-mar--bottom--sml">
											<span className="type--med type--wgt--medium type--color--note">
												{t('BOOKLET_ORDER.CREATE.SHIPPING_ADDRESS')}
											</span>
										</div>
										{isDefaultShippingAddress ? (
											<React.Fragment>
												{donor && <Address value={donor.donorAddress} format="booklet-order" />}
											</React.Fragment>
										) : (
											<React.Fragment>
												<div className="col col-sml-12 col-xlrg-6 col-xxlrg-2 u-mar--bottom--sml">
													<BasicInput field={form.$('shippingAddressLine1')} />
												</div>
												<div className="col col-sml-12 col-xlrg-6 col-xxlrg-2 u-mar--bottom--sml">
													<BasicInput field={form.$('shippingAddressLine2')} />
												</div>
												<div className="col col-sml-12 col-xlrg-4 col-xxlrg-2 u-mar--bottom--sml">
													<BasicInput field={form.$('shippingCity')} />
												</div>
												<div className="col col-sml-12 col-xlrg-4 col-xxlrg-2 u-mar--bottom--sml">
													<BasicInput field={form.$('shippingState')} />
												</div>
												<div className="col col-sml-12 col-xlrg-4 col-xxlrg-2 u-mar--bottom--sml">
													<BasicInput field={form.$('shippingZipCode')} />
												</div>
											</React.Fragment>
										)}
										{/* <div className="col col-sml-12 type--center u-mar--top--sml">
                                            <BaasicButton
                                                className="btn row--form btn--med btn--med--100 btn--primary"
                                                label={form.$('addressLine1').disabled ? 'BOOKLET_ORDER.CREATE.CHANGE_SHIPPING_ADDRESS' : 'BOOKLET_ORDER.CREATE.SET_DEFAULT_SHIPPING_ADDRESS'}
                                                onClick={() => onChangeShippingAddressClick()}>
                                            </BaasicButton>
                                        </div> */}
									</div>

									<BaasicButton
										className="btn row--form btn--med btn--med--100 btn--primary"
										label={
											form.$('shippingAddressLine1').disabled
												? 'BOOKLET_ORDER.CREATE.CHANGE_SHIPPING_ADDRESS'
												: 'BOOKLET_ORDER.CREATE.SET_DEFAULT_SHIPPING_ADDRESS'
										}
										onClick={() => onChangeShippingAddressClick()}
									></BaasicButton>
								</React.Fragment>
							) : (
								<div className="row row--form u-mar--top--sml u-mar--bottom--sml">
									<div className="col col-sml-12 col-med-12 col-lrg-2 u-mar--bottom--sml">
										<span className="type--med type--wgt--medium type--color--note">
											{t('BOOKLET_ORDER.CREATE.PICK_UP_ADDRESS')}
										</span>
									</div>
									<Address
										value={{
											addressLine1: '1777 Ave of the States, Suite 103',
											addressLine2: '',
											city: 'Lakewood',
											state: 'NJ',
											zipCode: '08701',
										}}
										format="booklet-order"
									/>
								</div>
							)}
						</div>
					)}
				<PageFooter>
					<div className="u-padd--bottom--huge">
						<BaasicFormControls
							form={form}
							onSubmit={form.onSubmit}
							disableSave={!isAdmin && (needsProtectionPlan || needsMoreFunds)}
							label={'BOOKLET_ORDER.CREATE.PLACE_ORDER'}
						/>
					</div>
				</PageFooter>
			</ApplicationEditLayout>
			<BaasicModal modalParams={protectionPlanModalParams}>
				<DonorAutomaticContributionEditTemplate />
			</BaasicModal>
			<BaasicModal modalParams={confirmModal}>
				<BookletOrderMixedPopup />
			</BaasicModal>
		</React.Fragment>
	);
};

BookletOrderCreateTemplate.propTypes = {
	store: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
	confirmModal: PropTypes.any,
};

export default defaultTemplate(BookletOrderCreateTemplate);
