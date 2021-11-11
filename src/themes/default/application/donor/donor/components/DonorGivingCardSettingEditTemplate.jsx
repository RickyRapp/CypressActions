import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BaasicFieldDropdown,
    NumericInputField,
    BasicInput,
    BasicFieldCheckbox,
    BaasicToggle
} from 'core/components'
import moment from 'moment';

const DonorGivingCardSettingEditTemplate = function ({ t, donorGivingCardSettingEditViewStore }) {
    const {
        loaderStore,
        form,
        item,
        isEdit,
        grantAcknowledgmentTypeDropdownStore,
        grantPurposeTypeDropdownStore,
        toggleEdit,
        onChangeIsEnabled,
        reportCard,
        setCardAction
    } = donorGivingCardSettingEditViewStore;
    return (
        <div className="u-mar--bottom--med">
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                {isEdit && item ?
                    <div>
                        {!form.$('isEnabled').value &&
                            <div className="list--prefences u-display--flex u-mar--bottom--med">
                                <div className="list--preferences__field">
                                    {!reportCard ? null : <h3 className="u-mar--bottom--sml">{t('DONOR_GIVING_CARD_SETTING.CREATE.REPORT_STOLEN_TITLE')}</h3>}
                                    {!form.$('isEnabled').value && <a className={`btn btn--${form.$('isEnabled').value ? "ghost" : "primary"} btn--med  u-mar--right--sml`} onClick={() => toggleEdit()}>{form.$('isEnabled').value ? "Cancel Edit" : "Edit Settings"}</a>}
                                </div>
                            </div>}
                    </div>
                    :
                    <h3 className="list--preferences__title">{t('DONOR_GIVING_CARD_SETTING.CREATE.TITLE')}</h3>
                }

                {item && item.givingCard &&
                    <div className="u-display--flex u-display--flex--justify--space-between u-display--flex--align--center w--100">
                        <div className="form__group">
                            <div className="card--secondary card--med u-display--ib">
                                <div className="form__group__label u-mar--bottom--tny">
                                    Assigned Card
                                </div>
                                <p className="type--med type--wgt--bold">
                                    {item.givingCard.isActivated && `${item.givingCard.cardNumber} - ${item.givingCard.cvv} - ${moment(new Date(item.givingCard.expirationDate)).format('MM/YY')}`}
                                </p>
                                {!item.givingCard.isActivated && <div className="type--base">Card is not activated </div>}
                                {item.givingCard.isLost && <div className="type--base type--wgt--bold type--color--warning">Card is reported lost! </div>}
                                {item.givingCard.isStolen && <div className="type--base type--wgt--bold type--color--warning">Card is reported stolen! </div>}
                            </div>
                        </div>
                        <div>
                            {item && item.givingCard && !(item.givingCard.isStolen || item.givingCard.isLost) &&  <BaasicToggle showLabel={true} label={t('DONOR_GIVING_CARD_SETTING.CREATE.REPORT_STOLEN_TITLE')} value={reportCard} onChange={() => setCardAction()}/>} 
                            {/* (!reportCard ? <a className="btn btn--secondary btn--med" onClick={() => setCardAction()}>{t('DONOR_GIVING_CARD_SETTING.CREATE.REPORT_STOLEN_TITLE')}</a> : <a className="btn btn--secondary btn--med" onClick={() => setCardAction()}>{t('DONOR_GIVING_CARD_SETTING.CREATE.GO_BACK')}</a>)} */}
                        </div>
                    </div>
                }

                {!reportCard ? <div><div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">
                        Share information <span className="type--color--note u-mar--left--tny">*</span>
                    </div>
                    <div className="list--preferences__dd">
                        <BaasicFieldDropdown showLabel={false} field={form.$('grantAcknowledgmentTypeId')} store={grantAcknowledgmentTypeDropdownStore} />
                    </div>
                </div>

                    <div className="list--preferences">
                        <div className="list--preferences__label is-dropdown">
                            Purpose <span className="type--color--note u-mar--left--tny">*</span>
                        </div>
                        <div className="list--preferences__dd">
                            <BaasicFieldDropdown showLabel={false} field={form.$('grantPurposeTypeId')} store={grantPurposeTypeDropdownStore} disabled={true}/>
                        </div>
                    </div>

                    <div className="list--preferences">
                        <div className="list--preferences__label">
                            Maximum dollar amount per transaction
                        </div>
                        <div className="list--preferences__field">
                            <NumericInputField showLabel={false} field={form.$('maxAmount')} />
                        </div>
                    </div>

                    <div className="list--preferences">
                        <div className="list--preferences__label">
                            Maximum transactions per day
                        </div>
                        <div className="list--preferences__field">
                            <NumericInputField showLabel={false} field={form.$('maxTimesPerDay')} />
                        </div>
                    </div>
                </div> :
                    <div>
                        <BasicFieldCheckbox showLabel={true} field={form.$('isStolen')} onChange={onChangeIsEnabled} />&nbsp;&nbsp;
                        <BasicFieldCheckbox showLabel={true} field={form.$('isLost')} onChange={onChangeIsEnabled} /> <br /><br />
                        <BasicInput field={form.$('reportDescription')} /> <br /><br />
                        <span className="">Important! Please be aware that once you complete this report, your card will immediately be disabled.</span>
                    </div>}

                <div className="type--right">
                    {/* &nbsp;&nbsp; */}
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </EditFormContent>
        </div>
    )
}

DonorGivingCardSettingEditTemplate.propTypes = {
    donorGivingCardSettingEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorGivingCardSettingEditTemplate);
