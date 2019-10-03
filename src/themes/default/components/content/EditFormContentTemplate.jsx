import React from 'react';
import { defaultTemplate } from 'core/utils';
import { Content } from 'core/layouts';
import shouldRenderContentChildren from './shouldRenderContentChildren';

function EditFormContentTemplate({ form, children, loading }) {
  return (
    <React.Fragment>
      {shouldRenderContentChildren(children)
        ? children
        : (<form onSubmit={form.onSubmit} className="clearfix">
          {children ? (
            <div className="f-col f-col-sml-12 card card--form card--primary card--med">
              {children}
            </div>
          ) : null
          }
        </form>
        )
      }
    </React.Fragment>
  )
}

export default defaultTemplate(EditFormContentTemplate);