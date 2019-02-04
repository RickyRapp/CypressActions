import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  BaasicFormControls,
  BaasicButton,
  EditFormContent
} from 'core/components';
import { Page, PageFooter } from 'core/layouts';
import { defaultTemplate } from 'core/utils';
import { getPageObject } from 'core/utils';

function EditFormLayoutTemplate({
  rootStore,
  form,
  loading,
  children,
  t,
  layoutFooterVisible = true
}) {
  const { header, footer, content } = getPageObject(children);

  return (
    <Page loading={loading}>
      {header}
      {content.header}
      {content.sidebar}
      <EditFormContent form={form}>{content.children}</EditFormContent>
      {content.footer}
      {renderEditLayoutFooterContent({
        footer,
        form,
        visible: layoutFooterVisible,
        t,
        goBack: () => rootStore.routerStore.goBack()
      })}
    </Page>
  );
}

function renderEditLayoutFooterContent({ footer, form, visible, goBack, t }) {
  return visible ? (
    footer ? (
      footer
    ) : (
      <PageFooter>
        <div>
          <BaasicFormControls form={form} onSubmit={form.onSubmit} />
          <BaasicButton
            className="btn btn--med btn--primary display--ib"
            label={t('EDIT_FORM_LAYOUT.CANCEL')}
            onClick={goBack}
          />
        </div>
      </PageFooter>
    )
  ) : null;
}

EditFormLayoutTemplate.propTypes = {
  loading: PropTypes.bool,
  isEdit: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
  layoutFooterVisible: PropTypes.bool
};

export default defaultTemplate(EditFormLayoutTemplate);
