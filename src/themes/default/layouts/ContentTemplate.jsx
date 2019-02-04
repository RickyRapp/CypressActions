import React from 'react';
import { defaultTemplate } from 'core/utils';
import { Loader } from 'core/components';

function ContentTemplate({
  error = false,
  loading = false,
  empty = true,
  loaderRenderer = () => <Loader />,
  errorRenderer = null,
  emptyRenderer = null,
  children
}) {
  //if (error) return <ErrorComponent />;

  if (loading) return render(loaderRenderer);
  if (emptyRenderer == null || !empty) return children;
  return render(emptyRenderer);
}

function render(content) {
  return content ? (typeof content === 'function' ? content() : content) : null;
}

export default defaultTemplate(ContentTemplate);
