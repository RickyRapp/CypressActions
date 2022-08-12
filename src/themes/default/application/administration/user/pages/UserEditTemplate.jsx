import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BasicInput,
	BaasicFieldDropdown,
	BaasicModal,
	BaasicFormControls,
	BaasicButton,
	ApplicationEmptyState,
} from 'core/components';
import { PageFooter, EditFormLayout } from 'core/layouts';
import { UserPasswordChange } from 'application/administration/user/pages';
import { UserDetailsLoaderTemplate } from '../components/content-loader';

function UserEditTemplate({ userEditViewStore, t }) {
	const {
		form,
		openMailPasswordReset,
		openChangePassword,
		toggleLock,
		toggleApprove,
		item,
		roleMultiselectStore,
		changePasswordModal,
		rootStore,
		loaderStore,
	} = userEditViewStore;

	return (
		<EditFormLayout store={userEditViewStore} loading={false} contentClassName={'container--sml'} footerClassName={"container--sml"}>
			<div className="card--primary card--med">
				{loaderStore.loading ? (
					<UserDetailsLoaderTemplate />
				) : (
					<React.Fragment>
						<div className="row row--form">
							<div className="form__group col col-sml-12">
								<div className="form__group__label">{t('USER.EDIT.USERNAME_LABEL')}</div>
								<span className="input input--text input--lrg padd--top--tny input--disabled">
									{item && <React.Fragment>{item.userName}</React.Fragment>}
								</span>
							</div>
							<div className="form__group col col-sml-12">
								<BasicInput field={form.$('email')} />
							</div>
							<div className="form__group col col-sml-12">
								<BaasicFieldDropdown field={form.$('roles')} store={roleMultiselectStore} />
							</div>
						</div>

						<div className="u-mar--bottom--sml">
							<a onClick={openMailPasswordReset}>
								<span className="u-icon u-icon--base u-icon--email" /> Send password reset mail
							</a>
						</div>
						<div className="u-mar--bottom--sml">
							<a onClick={openChangePassword}>
								<span className="u-icon u-icon--base u-icon--reset" /> Change Password
							</a>
						</div>

						{item && (
							<React.Fragment>
								<div className="u-mar--bottom--sml">
									<a onClick={toggleApprove}>
										{item.isApproved ? (
											<span>
												<span className="u-icon u-icon--base u-icon--approve" />
												<span> Disapprove</span>
											</span>
										) : (
											<span>
												<span className="u-icon u-icon--base u-icon--decline"></span>
												<span> Approve</span>
											</span>
										)}
									</a>
								</div>
								<div className="u-mar--bottom--sml">
									<a onClick={toggleLock}>
										{item.isLockedOut ? (
											<span>
												<span className="u-icon u-icon--base u-icon--lock" />
												<span> Unlock</span>
											</span>
										) : (
											<span>
												<span className="u-icon u-icon--base u-icon--unlock"></span>
												<span> Lock</span>
											</span>
										)}
									</a>
								</div>
							</React.Fragment>
						)}

						<BaasicModal modalParams={changePasswordModal}>
							<UserPasswordChange />
						</BaasicModal>

						{/* {renderEditLayoutFooterContent({
								form,
								t,
								goBack: () => rootStore.routerStore.goBack(),
							})} */}
					</React.Fragment>
				)}
			</div>
		</EditFormLayout>
	);
}

UserEditTemplate.propTypes = {
	userEditViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

function renderEditLayoutFooterContent({ form, goBack, t }) {
	return (
		<PageFooter>
			<div>
				<BaasicFormControls form={form} onSubmit={form.onSubmit} />
				<BaasicButton
					className="btn btn--med btn--med--wide btn--ghost u-mar--left--sml"
					label={t('EDIT_FORM_LAYOUT.CANCEL')}
					onClick={goBack}
				/>
			</div>
		</PageFooter>
	);
}

renderEditLayoutFooterContent.propTypes = {
	form: PropTypes.any,
	goBack: PropTypes.func,
	t: PropTypes.func,
};

export default defaultTemplate(UserEditTemplate);
