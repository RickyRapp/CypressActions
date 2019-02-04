import React from 'react';
import PropTypes from 'prop-types';
import { ListContent } from 'core/components';
import { Page, PageNavigation } from 'core/layouts';
import { defaultTemplate } from 'core/utils';
import { getPageObject } from 'core/utils';

const ListLayoutTemplate = function({
  title,
  onCreate,
  children,
  t,
  loaderStore,
  loading
}) {
  const { header, footer, navigation, content } = getPageObject(children);

  return (
    <Page title={title} loading={loading}>
      {navigation ? (
        navigation
      ) : (
        <PageNavigation>
          <DefaultListLayoutHeaderContent t={t} onCreate={onCreate} />
        </PageNavigation>
      )}
      {header}
      {content.header}
      <ListContent>{content.children}</ListContent>
      {content.footer}
      {footer}
    </Page>
  );
};
ListLayoutTemplate.propTypes = {
  onCreate: PropTypes.func,
  title: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.any
};

function DefaultListLayoutHeaderContent({ t, onCreate = null }) {
  return onCreate ? (
    <button
      className="btn btn--med btn--tertiary push spc--top--med"
      onClick={onCreate}
    >
      <span className="icomoon icon-add tiny align--v--baseline spc--right--tny" />
      <span className="align--v--bottom">Create New</span>
    </button>
  ) : null;
}

export default defaultTemplate(ListLayoutTemplate);
