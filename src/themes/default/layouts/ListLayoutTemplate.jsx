import React from "react";
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ListContent, BaasicButton } from "core/components";
import { Page, PageNavigation } from "core/layouts";
import { defaultTemplate } from 'core/hoc';
import { getPageObject } from 'core/utils';

const ListLayoutTemplate = function({
    title,
    onCreate,
    children,
    t,
    loading,
    authorization,
    store
}) {
    const { header, footer, navigation, content } = getPageObject(children);

    const {
        createFunc,
        auth,
        isLoading
    } = resolveProps({ onCreate, loading, authorization, store });

    return (
        <Page title={title} loading={isLoading}>
            {navigation
                ? navigation
                : (<PageNavigation>
                        {createFunc && 
                        <BaasicButton authorization={auth ? auth.create : null} t={t} 
                            className="btn btn--med btn--primary push spc--top--tny" label={'LIST_LAYOUT.CREATE_BUTTON'} onClick={createFunc}></BaasicButton> }
                  </PageNavigation>)
            }
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