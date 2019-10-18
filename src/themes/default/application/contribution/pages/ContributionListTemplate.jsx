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
import { ContributionReview } from 'application/contribution/components'

const ContributionListTemplate = function ({ contributionViewStore, t }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        selectDonorModal,
        selectDonorDropdownStore,
        reviewModal,
        reviewDropdownStore
    } = contributionViewStore;

    return (
        <React.Fragment>
            <ApplicationListLayout store={contributionViewStore} authorization={authorization}>
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
                    <h3 className="u-mar--bottom--med">{t('CONTRIBUTION.LIST.SELECT_DONOR')}</h3>
                    <div className="row">
                        <div className="form__group col col-lrg-12">
                            <BaasicDropdown className='input--dropdown' store={selectDonorDropdownStore} />
                        </div>
                    </div>
                </section>
            </BaasicModal>
            <BaasicModal modalParams={reviewModal}>
                <ContributionReview />
            </BaasicModal>
        </React.Fragment>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='CONTRIBUTION.LIST.EMPTY_STATE.TITLE' actionLabel='CONTRIBUTION.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

ContributionListTemplate.propTypes = {
    contributionViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderActions({ item, actions, authorization }) {
    if (!isSome(actions)) return null;

    const { onEdit, onReview } = actions;
    if (!isSome(onEdit) && !isSome(onReview)) return null;

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onEdit) ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='CONTRIBUTION.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onReview) ? (
                    <BaasicButton
                        authorization={'theDonorsFundAdministrationSection.update'}
                        className="btn btn--icon"
                        icon='u-icon u-icon--approved u-icon--sml'
                        label='CONTRIBUTION.LIST.BUTTON.REVIEW'
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
    authorization: PropTypes.any
};

export default defaultTemplate(ContributionListTemplate);

