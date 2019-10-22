import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    EmptyState,
    BaasicModal,
    BaasicDropdown
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';

const GrantistTemplate = function ({ grantViewStore, t }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        selectDonorModal,
        selectDonorDropdownStore
    } = grantViewStore;

    return (
        <React.Fragment>
            <ApplicationListLayout store={grantViewStore} authorization={authorization}>
                <Content emptyRenderer={renderEmpty(routes)} >
                    <div className="u-mar--bottom--sml">
                        <TableFilter queryUtility={queryUtility} >
                        </TableFilter>
                    </div>
                    <div className="card--form card--primary card--med">
                        <BaasicTable
                            authorization={authorization}
                            tableStore={tableStore}
                            actionsComponent={renderActions}
                        />
                    </div>
                </Content>
            </ApplicationListLayout>
            <BaasicModal modalParams={selectDonorModal}>
                <section className='w--400--px'>
                    <h3 className="u-mar--bottom--med">{t('GRANT.LIST.SELECT_DONOR')}</h3>
                    <div className="row">
                        <div className="form__group col col-lrg-12">
                            <BaasicDropdown className='input--dropdown' store={selectDonorDropdownStore} />
                        </div>
                    </div>
                </section>
            </BaasicModal>
            {/* <BaasicModal modalParams={reviewModal}>
                <GrantReview />
            </BaasicModal> */}
        </React.Fragment>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='GRANT.LIST.EMPTY_STATE.TITLE' actionLabel='GRANT.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

GrantistTemplate.propTypes = {
    grantViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onEdit, onReview } = actions;
    if (!isSome(onEdit) && !isSome(onReview)) return null;

    let editRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onEditRender) {
            editRender = actionsRender.onEditRender(item);
        }
    }

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='GRANT.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onReview) ? (
                    <BaasicButton
                        authorization={'theDonorsFundAdministrationSection.update'}
                        className="btn btn--icon"
                        icon='u-icon u-icon--approved u-icon--sml'
                        label='GRANT.LIST.BUTTON.REVIEW'
                        onlyIcon={true}
                        onClick={() => onReview(item.id)}>
                    </BaasicButton>
                ) : null}
            </div>
        </td>
    )
}

renderActions.propTypes = {
    item: PropTypes.object,
    actions: PropTypes.object,
    actionsRender: PropTypes.object,
    authorization: PropTypes.any
};

export default defaultTemplate(GrantistTemplate);

