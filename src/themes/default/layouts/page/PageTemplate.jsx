import React from 'react';
import _ from 'lodash';
import {
  PageNavigation,
  PageHeader,
  PageFooter,
  TabMenuLayout,
  Content
} from 'core/layouts';
import { getPageObject, defaultTemplate } from 'core/utils';

function PageTemplate({ children, loading = false, isError = false }) {
  const { header, footer, navigation, content } = getPageObject(children);
  return (
    <div className="content">
      <PageNavigation {...(navigation ? navigation[0].props : {})} />
      <TabMenuLayout />

      <MainContent
        loading={loading}
        header={header}
        footer={footer}
        content={content}
        isError={isError}
      />
    </div>
  );
}

const MainContent = defaultTemplate(
  ({ loading, header, footer, content, isError }) => {
    return (
      <React.Fragment>
        {/* can't wrap header and footer in Content so hide them while loading (because loader needs content__main as parent) */}
        {!loading ? <PageHeader {...(header ? header[0].props : {})} /> : null}

        <div className="content__main">
          <Content isError={isError} empty={false} loading={loading}>
            {' '}
            {/*when loading main content don't show empty (for now)*/}
            {content.sidebar}
            <div
              className={
                'content__main__content' +
                (content.sidebar ? '' : ' sidebar-hidden')
              }
            >
              <div className="content">
                {content.header && (
                  <div className="content__header">{content.header}</div>
                )}

                <div className="content__main">
                  <div className="content__main__content sidebar-hidden">
                    <div className="padd--sml">{content.children}</div>
                  </div>
                </div>

                {content.footer && (
                  <div className="content__footer">{content.footer}</div>
                )}
              </div>
            </div>
          </Content>
        </div>

        {!loading ? <PageFooter {...(footer ? footer[0].props : {})} /> : null}
      </React.Fragment>
    );
  }
);

export default defaultTemplate(PageTemplate);
