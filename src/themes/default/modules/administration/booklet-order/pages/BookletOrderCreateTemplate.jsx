import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicFieldDropdown, BasicCheckBox } from 'core/components';
import { EditFormLayout, PageContentHeader } from 'core/layouts';
import { DonorAccountHeaderDetails } from 'modules/administration/donor-account/components'
import _ from 'lodash';

function BookletOrderCreateTemplate({ bookletOrderCreateViewStore, t }) {
  const {
    form,
    loading,
    userId,
    deliveryMethodTypeDropdownStore,
    denominationTypeDropdownStore,
    onDel,
    refresh
  } = bookletOrderCreateViewStore;

  return (
    <React.Fragment>
      {form &&
        <EditFormLayout form={form} isEdit={false} loading={loading}>
          <PageContentHeader>
            <DonorAccountHeaderDetails userId={userId} type='booklet-order' />
          </PageContentHeader>
          <div className="f-row">
            <div className="form__group f-col f-col-lrg-6">
              {deliveryMethodTypeDropdownStore &&
                <BaasicFieldDropdown field={form.$('deliveryMethodTypeId')} store={deliveryMethodTypeDropdownStore} />}
            </div>
            <div className="form__group f-col f-col-lrg-6">
              <BasicCheckBox field={form.$('sendNotificationEmail')} />
            </div>
          </div>

          <React.Fragment key={refresh}>
            {form.$('bookletOrderItems').map(item =>
              <div className="f-row" key={item.key}>
                <div className="form__group f-col f-col-lrg-2">
                  <BasicInput field={item.$('count')} />
                </div>
                <div className="form__group f-col f-col-lrg-8">
                  {denominationTypeDropdownStore &&
                    <BaasicFieldDropdown field={item.$('denominationTypeId')} store={denominationTypeDropdownStore} />}
                </div>

                <div className="form__group f-col f-col-lrg-2">
                  {form.$('bookletOrderItems').size > 1 &&
                    <button
                      className="btn btn--sml btn--primary spc--top--med"
                      onClick={() => onDel(item)}>
                      <span className="icomoon icon-remove tiny align--v--baseline spc--right--tny" />
                      <span className="align--v--bottom">{t('DELETE')}</span>
                    </button>}
                </div>
              </div>
            )}
          </React.Fragment>

          <div className="f-row">
            <div className="form__group f-col f-col-lrg-12">
              {form.$('bookletOrderItems').value &&
                <button
                  className="btn btn--sml btn--tertiary spc--top--med"
                  onClick={form.$('bookletOrderItems').onAdd}>
                  <span className="icomoon icon-add tiny align--v--baseline spc--right--tny" />
                  <span className="align--v--bottom">{t('ADDANOTHER')}</span>
                </button>}
            </div>
          </div>
        </EditFormLayout>}
    </React.Fragment >
  );
};

export default defaultTemplate(BookletOrderCreateTemplate);
