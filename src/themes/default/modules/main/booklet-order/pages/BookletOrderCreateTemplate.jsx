import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BookletOrderCreateFormTemplate } from 'themes/modules/common/booklet-order/components';
import { EditFormLayout } from 'core/layouts';
import _ from 'lodash';

function BookletOrderCreateTemplate({ bookletOrderCreateViewStore, t }) {
  const {
    form,
    loading,
    deliveryMethodTypeDropdownStore,
    denominationTypeDropdownStore,
    onDel,
    refresh,
    expresMailDeliveryMethodTypeId,
    totalAndFee,
    donorAccount,
    mostCommonDenominations,
    premiumAccountTypeId,
    isEdit
  } = bookletOrderCreateViewStore;

  return (
    <React.Fragment>
      {form &&
        <EditFormLayout form={form} isEdit={isEdit} loading={loading}>
          <BookletOrderCreateFormTemplate
            form={form}
            deliveryMethodTypeDropdownStore={deliveryMethodTypeDropdownStore}
            denominationTypeDropdownStore={denominationTypeDropdownStore}
            onDel={onDel}
            refresh={refresh}
            expresMailDeliveryMethodTypeId={expresMailDeliveryMethodTypeId}
            totalAndFee={totalAndFee}
            donorAccount={donorAccount}
            mostCommonDenominations={mostCommonDenominations}
            premiumAccountTypeId={premiumAccountTypeId}
          />
        </EditFormLayout>}
    </React.Fragment >
  );
};

export default defaultTemplate(BookletOrderCreateTemplate);
