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
  } = bookletOrderCreateViewStore;

  return (
    <React.Fragment>
      {form &&
        <EditFormLayout form={form} isEdit={false} loading={loading}>
          <BookletOrderCreateFormTemplate
            form={form}
            deliveryMethodTypeDropdownStore={deliveryMethodTypeDropdownStore}
            denominationTypeDropdownStore={denominationTypeDropdownStore}
            onDel={onDel}
            refresh={refresh}
            expresMailDeliveryMethodTypeId={expresMailDeliveryMethodTypeId}
            totalAndFee={totalAndFee}
          />
        </EditFormLayout>}
    </React.Fragment >
  );
};

export default defaultTemplate(BookletOrderCreateTemplate);
