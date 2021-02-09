import React from 'react';
import { BasicCheckbox, BasicFieldCheckbox } from 'core/components';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const InvestmentPoolOverviewTemplate = function ({ form, pool, t }) {
	return (
		<div className="card--primary card--lrg u-mar--bottom--med">
			<div className="row u-mar--bottom--sml">
				<div className="col col-sml-12 u-mar--bottom--sml">
					<span className="type--xlrg type--wgt--medium">{pool.name}</span>
					<div className="u-push">
						<BasicFieldCheckbox field={form.$('isChecked')} />
					</div>
				</div>
				<div className="col col-sml-12 u-mar--bottom--med">
					<p className="type--sml type--color--opaque">{'Short description of when this pool is a good idea'}</p>
				</div>
				<div className="col col-sml-12 u-mar--bottom--lrg">
					<span className="counter__prepaid counter__prepaid--lrg">LONG TERM GROWTH</span>
					<span className="u-separator--right--primary--from--xlrg u-mar--right--base u-mar--left--base"></span>
					<span className="type--med type--color--note type--wgt--medium">Expense ration 0.35%</span>
				</div>
				<div className="col col-sml-12">
					<div className="row">
						<div className="col col-sml-12 col-xxlrg-6 u-mar--bottom--sml u-separator--right--primary--from--xlrg u-padd--right--base ">
							<div className="row">
								<div className="col col-sml-12 col-xxlrg-5">
									<div>GRAPH</div>
								</div>
								<div className="col col-sml-12 col-xxlrg-7">
									<div className="row">
										<div className="col col-sml-12 col-xlrg-12">
											<p className="type--base type--wgt--medium type--color--opaque u-mar--bottom--med">
												Target allocation:
											</p>
										</div>
										<div className="col col-sml-10">
											<p className="type--sml type--underline u-mar--bottom--sml">Limited Term Bond Dund</p>
										</div>
										<div className="col col-sml-2">
											<span className="type--sml type--color--opaque u-push">87%</span>
										</div>
										<div className="col col-sml-10">
											<p className="type--sml type--underline u-mar--bottom--sml">Multi-Asset Income Fund</p>
										</div>
										<div className="col col-sml-2">
											<span className="type--sml type--color--opaque u-push">10%</span>
										</div>
										<div className="col col-sml-10">
											<p className="type--sml type--underline u-mar--bottom--sml">Money market</p>
										</div>
										<div className="col col-sml-2">
											<span className="type--sml type--color--opaque u-push">3%</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col col-sml-12 col-xxlrg-3 u-mar--bottom--sml u-separator--right--primary--from--xlrg u-padd--right--base u-padd--left--base">
							<p className="type--base type--wgt--medium type--color--opaque">Risk:</p>
						</div>
						<div className="col col-sml-12 col-xxlrg-3 u-padd--right--base u-padd--left--base">
							<p className="type--base type--wgt--medium type--color--opaque u-mar--bottom--xxlrg">Performance:</p>
							<div className="row">
								<div className="col col-sml-6 u-mar--bottom--sml">
									<span className="type--sml type--wgt--regular type--color--opaque u-mar--right--sml">QTD:</span>
									<span className="type--sml type--wgt--regular u-push">1.1%</span>
								</div>
								<div className="col col-sml-6 u-mar--bottom--sml">
									<span className="type--sml type--wgt--regular type--color--opaque u-mar--right--sml">YTD:</span>
									<span className="type--sml type--wgt--regular u-push">8.1%</span>
								</div>
								<div className="col col-sml-6 u-mar--bottom--sml">
									<span className="type--sml type--wgt--regular type--color--opaque u-mar--right--sml">5 YTD:</span>
									<span className="type--sml type--wgt--regular u-push">6.12%</span>
								</div>
								<div className="col col-sml-6 u-mar--bottom--sml">
									<span className="type--sml type--wgt--regular type--color--opaque u-mar--right--sml">10 YTD:</span>
									<span className="type--sml type--wgt--regular u-push"></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

InvestmentPoolOverviewTemplate.propTypes = {
	pool: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
};

export default defaultTemplate(InvestmentPoolOverviewTemplate);
