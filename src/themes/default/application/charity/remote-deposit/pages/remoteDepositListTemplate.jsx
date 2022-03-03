import React from "react";
import PropTypes from "prop-types";
import { defaultTemplate } from "core/hoc";
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    EmptyState
} from "core/components";
import { isSome } from "core/utils";
import { ApplicationListLayout, Content } from "core/layouts";

const remoteDepositListTemplate = function({ remotedepositListViewStore }) {
    const { tableStore, routes, queryUtility, authorization } = remotedepositListViewStore;

    return (
        <ApplicationListLayout
            store={remotedepositListViewStore}
            authorization={authorization}
        >
            <Content emptyRenderer={renderEmpty(routes)}>
                {/* <div className="u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility}></TableFilter>
                </div>
                <div className="card--form card--primary card--med">
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                        actionsComponent={renderActions}
                    />
                </div> */}
            </Content>
        </ApplicationListLayout>
    );
};

function renderEmpty(routes) {
    return (
        <EmptyState
            title="REMOTEDEPOSIT.LIST.EMPTY_STATE.TITLE"
            actionLabel="REMOTEDEPOSIT.LIST.EMPTY_STATE.ACTION"
            callToAction={routes.create}
        />
    );
}

remoteDepositListTemplate.propTypes = {
    remotedepositListViewStore: PropTypes.object.isRequired
};

function renderActions({ item, actions, authorization }) {
    if (!isSome(actions)) return null;

    const {
        onEdit,
        onPreview
    } = actions;
    if (
        !isSome(onEdit) &&
        !isSome(onPreview) 
    )
        return null;

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onPreview) ? (
                    <BaasicButton
                        authorization={
                            authorization ? authorization.read : null
                        }
                        className="btn btn--icon"
                        icon="u-icon u-icon--preview u-icon--sml"
                        label="REMOTEDEPOSIT.LIST.BUTTON.PREVIEW"
                        onlyIcon={true}
                        onClick={() => onPreview(item)}
                    ></BaasicButton>
                ) : null}
                {isSome(onEdit) ? (
                    <BaasicButton
                        authorization={
                            authorization ? authorization.update : null
                        }
                        className="btn btn--icon"
                        icon="u-icon u-icon--edit u-icon--sml"
                        label="REMOTEDEPOSIT.LIST.BUTTON.EDIT"
                        onlyIcon={true}
                        onClick={() => onEdit(item)}
                    ></BaasicButton>
                ) : null}
            </div>
        </td>
    );
}

renderActions.propTypes = {
    item: PropTypes.object,
    actions: PropTypes.object,
    authorization: PropTypes.any
};

export default defaultTemplate(remoteDepositListTemplate);