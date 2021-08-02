import React from 'react';
import { BaasicButton, BaasicFormControls, FormatterResolver } from 'core/components';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function GrantConfirmTemplate({ modalParams, t }) {
    const {
        form,
        bookletAmount,
        onCancel
    } = modalParams.data;

    return (
        <div className="modal__list__wrap">
            {bookletAmount == '500' &&
            <React.Fragment>
                <h3 className="u-mar--bottom--med">Mixed booklets ${bookletAmount}</h3>
                <table className="table--secondary u-mar--bottom--med">
                    <thead className="table--secondary__thead">
                        <tr>
                            <th className="table--secondary__th">Denomination</th>
                            <th className="table--secondary__th">Amount of Checks</th>
                        </tr>
                    </thead>
                    <tbody className="table--secondary__tbody">
                        <tr className="table--secondary__row">
                            <th className="table--secondary__th">$1</th>
                            <td className="table--secondary__td">15</td>
                        </tr>
                        <tr className="table--secondary__row">
                            <th className="table--secondary__th">$5</th>
                            <td className="table--secondary__td">14</td>
                        </tr>
                        <tr className="table--secondary__row">
                            <th className="table--secondary__th">$10</th>
                            <td className="table--secondary__td">10</td>
                        </tr>
                        <tr className="table--secondary__row">
                            <th className="table--secondary__th">$18</th>
                            <td className="table--secondary__td">5</td>
                        </tr>
                        <tr className="table--secondary__row">
                            <th className="table--secondary__th">$25</th>
                            <td className="table--secondary__td">3</td>
                        </tr>
                        <tr className="table--secondary__row">
                            <th className="table--secondary__th">$50</th>
                            <td className="table--secondary__td">3</td>
                        </tr>
                    </tbody>
                    <tfoot className="table--secondary__tfoot">
                        <tr className="table--secondary__row">
                            <th className="table--secondary__th">
                                Total Checks
                            </th>
                            <th className="table--secondary__th">
                                50
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </React.Fragment>
            }
            {bookletAmount == '2000' &&
            <React.Fragment>
                <h3 className="u-mar--bottom--med">Mixed booklets ${bookletAmount}</h3>
                <table className="table--secondary u-mar--bottom--med">
                    <thead className="table--secondary__thead">
                        <tr>
                            <th className="table--secondary__th">Denomination</th>
                            <th className="table--secondary__th">Amount of Checks</th>
                        </tr>
                    </thead>
                    <tbody className="table--secondary__tbody">
                        <tr className="table--secondary__row">
                            <th className="table--secondary__th">$5</th>
                            <td className="table--secondary__td">8</td>
                        </tr>
                        <tr className="table--secondary__row">
                            <th className="table--secondary__th">$18</th>
                            <td className="table--secondary__td">10</td>
                        </tr>
                        <tr className="table--secondary__row">
                            <th className="table--secondary__th">$36</th>
                            <td className="table--secondary__td">5</td>
                        </tr>
                        <tr className="table--secondary__row">
                            <th className="table--secondary__th">$50</th>
                            <td className="table--secondary__td">4</td>
                        </tr>
                        <tr className="table--secondary__row">
                            <th className="table--secondary__th">$100</th>
                            <td className="table--secondary__td">5</td>
                        </tr>
                        <tr className="table--secondary__row">
                            <th className="table--secondary__th">$180</th>
                            <td className="table--secondary__td">5</td>
                        </tr>
                        <tr className="table--secondary__row">
                            <th className="table--secondary__th">Open</th>
                            <td className="table--secondary__td">13</td>
                        </tr>
                    </tbody>
                    <tfoot className="table--secondary__tfoot">
                        <tr className="table--secondary__row">
                            <th className="table--secondary__th">
                                Total Checks
                            </th>
                            <th className="table--secondary__th">
                                50
                            </th>
                        </tr>
                    </tfoot>
                </table>
                </React.Fragment>
            }
          

            <div className="u-display--flex">
                <BaasicButton
                    className="btn btn--med btn--med--wide btn--ghost"
                    label='CLOSE'
                    onClick={onCancel}
                />

                {/* <div className="u-mar--left--auto">
                    <BaasicFormControls label='CONFIRM' />
                </div> */}
            </div>
        </div>
    );
}

GrantConfirmTemplate.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(GrantConfirmTemplate);
