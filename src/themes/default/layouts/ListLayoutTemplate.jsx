import React from "react";
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ListContent } from "core/components";
import { Page } from "core/layouts";
import { defaultTemplate } from 'core/hoc';
import { getPageObject } from 'core/utils';

const ListLayoutTemplate = function ({
    title,
    onCreate,
    children,
    loading,
    authorization,
    store
}) {
    const { header, footer, content } = getPageObject(children);
    const {
        isLoading
    } = resolveProps({ onCreate, loading, authorization, store });

    return (
        <Page title={title} loading={isLoading}>
            {header}
            {content.header}
            {content.sidebar}
            <ListContent>
                {content.children}
            </ListContent>
            {content.footer}
            {footer}
        </Page>
    );
};

ListLayoutTemplate.propTypes = {
    onCreate: PropTypes.func,
    title: PropTypes.string,
    loading: PropTypes.bool,
    children: PropTypes.any,
    t: PropTypes.func,
    authorization: PropTypes.any,
    store: PropTypes.object
};

// vice-versa compatibility with settings props as well as using store
function resolveProps({ onCreate, loading, authorization, store }) {
    return {
        createFunc: onCreate != null ? onCreate : (store && store.routes && store.routes.create ? store.routes.create : null),
        auth: authorization != null ? authorization : (store ? store.authorization : null),
        isLoading: _.isBoolean(loading)
            ? loading
            : (store ? store.loaderStore.initial && store.loaderStore.loading : false)
    }
}

export default defaultTemplate(ListLayoutTemplate);