import React from "react";
import PropTypes from "prop-types";
import { defaultTemplate } from "core/hoc";
import { BasicInput } from "core/components";
import { ApplicationEditLayout, Content } from "core/layouts";

const DepositInfoEditTemplate = function({ depositinfoEditViewStore }) {
	const {
		contentLoading,
		form,
	} = depositinfoEditViewStore;
	return (
		<ApplicationEditLayout store={depositinfoEditViewStore}>
			<Content loading={contentLoading}>
				<React.Fragment>
					<div className="row">
						<div className="col col-sml-12 col-lrg-12">
							<div className="card card--form card--primary">
								<div className="card__body card__body--med">
									<div className="row">
										<div className="form__group col col-sml-12">
											$0{$BLOCK_COMMENT_START <BasicInput field={form.$('name')} /> $BLOCK_COMMENT_END}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</React.Fragment>
			</Content>
		</ApplicationEditLayout>
	);
};

DepositInfoEditTemplate.propTypes = {
	depositinfoEditViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(DepositInfoEditTemplate);