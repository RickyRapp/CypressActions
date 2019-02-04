import React from 'react';
import PropTypes from 'prop-types';
import {
  BaasicFormControls,
  BaasicTable,
  LocalizationEditTable,
  Loadable,
  BaasicButton
} from 'core/components';
import { ListLayout, PageFooter } from 'core/layouts';
import { defaultTemplate } from 'core/utils';

function LanguageEditLayoutTemplate({ form, loaderStore, item, t, routeBack }) {
  return (
    <ListLayout loading={loaderStore.loading}>
      <PageFooter>
        <div>
          <BaasicFormControls form={form} disableSave={false} />
          {routeBack && (
            <BaasicButton
              className="btn btn--med btn--primary display-ib"
              label={t('EDIT_FORM_LAYOUT.CANCEL')}
              onClick={routeBack}
            />
          )}
        </div>
      </PageFooter>

      <form onSubmit={form.onSubmit} className="clearfix">
        <LocalizationEditTable
          form={form}
          loaderStore={loaderStore}
          item={item}
        />
      </form>
    </ListLayout>
  );
}

LanguageEditLayoutTemplate.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  loaderStore: PropTypes.object,
  routeBack: PropTypes.func,
  t: PropTypes.any
};

export default defaultTemplate(LanguageEditLayoutTemplate);
